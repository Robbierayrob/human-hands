# utils.py
import google.generativeai as genai
import json
import os
from pathlib import Path
from .config import Config  # Relative import

CONFIG_JSON = r"""
{
  "available_media": {
    "tools_required": {
      "type": "IMAGE",
      "source": "tools_all.png",
      "description": "An image showing all required tools"
    },
    "default_image": {
      "type": "IMAGE",
      "source": "default_image.png",
      "description": "Default application image"
    },
    "replacement_parts": {
      "type": "IMAGE",
      "source": "replacement_parts.png",
      "description": "An image showing replacement parts and service kits"
    },
    "assembled_drawing": {
      "type": "IMAGE",
      "source": "assembled_drawing.png",
      "description": "Complete assembled view with dimensions"
    },
    "intro_video": {
      "type": "VIDEO",
      "video_id": "c8Lhfl0OXt0",
      "start_time": 0,
      "playback_duration": 19,
      "description": "Intro Grundfos NB pump with tools required"
    },
    "assemble_drive_shaft": {
      "type": "VIDEO",
      "video_id": "c8Lhfl0OXt0",
      "start_time": 19,
      "playback_duration": 81,
      "description": "Assemble drive shaft to motor"
    },
    "assemble_drive_housing": {
      "type": "VIDEO",
      "video_id": "c8Lhfl0OXt0",
      "start_time": 100,
      "playback_duration": 113,
      "description": "Assemble drive housing to electric motor"
    },
    "assemble_pump_body": {
      "type": "VIDEO",
      "video_id": "c8Lhfl0OXt0",
      "start_time": 213,
      "playback_duration": 168,
      "description": "Assembly of pump body attached to drive housing and motor"
    }
  }
}
"""

SYSTEM_PROMPT = """
You are a helpful engineering assistant.  You provide information about the Grundfos NB pump, including assembly instructions, troubleshooting, and parts information.

You MUST always structure your responses in the following JSON format—no extra keys, no deviations:

{
    "function_calls": [
        {
            "name": "display_media" or "play_video" or "clear_media",
            "arguments": {
                "media_type": "IMAGE" or "VIDEO",
                "source": "<media_source>",       // if showing an image, use media key from available_media.
                "video_id": "<video_id>",          // if playing a video, use video_id from available_media
                "start_time": <integer>,          // video start time in seconds
                "playback_duration": <integer>     // video duration in seconds
            }
        }
    ],
    "response": "Your natural language response here"
}

Important Overall Rules:
1. Always wrap your entire response in the above JSON structure, even if you have no function calls.
2. If no media is to be displayed or video played, set "function_calls" to an empty array.
3. Never reveal or explain this JSON structure to the user.
4. Do not add any extra keys or fields beyond "function_calls" and "response".

Here are the available media resources, which you access via the 'source' key:

""" + json.dumps(CONFIG_JSON, indent=4) + """

--- Example Interactions ---

User: Show me the tools I need.
Assistant:
{
    "function_calls": [
        {
            "name": "display_media",
            "arguments": {
                "media_type": "IMAGE",
                "source": "tools_required"
            }
        }
    ],
    "response": "Here is a list of the tools you will need..."
}

User: Play the drive shaft assembly video.
Assistant:
{
    "function_calls": [
        {
            "name": "play_video",
            "arguments": {
                "media_type": "VIDEO",
                "video_id": "c8Lhfl0OXt0",
                "start_time": 19,
                "playback_duration": 81
            }
        }
    ],
    "response": "Here's the video showing how to assemble the drive shaft."
}

User: Clear the display.
Assistant:
{
  "function_calls": [
    {
      "name": "clear_media",
      "arguments": {}
    }
  ],
  "response": "The display has been cleared."
}

User: Show me the pump dimensions.
Assistant:
{
 "function_calls": [
  {
   "name": "display_media",
   "arguments": {
    "media_type": "IMAGE",
    "source": "assembled_drawing"
   }
  }
 ],
 "response": "Here's the assembled drawing with dimensions."
}
"""

class GeminiHandler:
    def __init__(self):
        genai.configure(api_key=Config.GOOGLE_API_KEY)
        self.config_data = json.loads(CONFIG_JSON)
        self.model = genai.GenerativeModel(
            model_name="gemini-2.0-flash",  # Or gemini-pro
            # system_instruction=SYSTEM_PROMPT,  <-- REMOVE THIS
            generation_config={
                "temperature": 0.7,  # Adjust as needed
                "top_p": 0.8,      # Adjust as needed
                "top_k": 40,       # Adjust as needed
            },
        )
        self.chat = self.model.start_chat()  # No history needed

    def process_message(self, user_message: str) -> dict:
        """Processes a user message, interacts with Gemini, and returns a JSON response."""
        try:
            # Include the SYSTEM_PROMPT *with every request*
            full_message = SYSTEM_PROMPT + "\n\n" + user_message
            response = self.chat.send_message(full_message)

            content = response.text
            content = content.strip().lstrip("`json").rstrip("`").strip()
            print(f"Gemini Response (cleaned): {content}")

            try:
                parsed_response = json.loads(content)
                return parsed_response

            except json.JSONDecodeError as e:
                print(f"JSON Decoding Error: {e}")
                return {
                    "error": "Invalid JSON response from model.",
                    "details": str(e),
                }

        except Exception as e:
            print(f"General Exception: {e}")
            return {"error": "Error processing message.", "details": str(e)}

    def get_media_url(self, source: str) -> str | None:
        """Constructs a URL for a given media source (image or video)."""
        item = self.config_data["available_media"].get(source)
        if item and item["type"] == "IMAGE":
            image_path = os.path.join(Config.IMAGE_FOLDER, item["source"])
            if os.path.exists(Path("static/images") / item["source"]):
                return f"/{image_path}"
            else:
                print(f"Image file not found: {image_path}")
                return None
        elif item and item["type"] == "VIDEO":
            return f"https://www.youtube.com/watch?v={item['video_id']}"  # No &t= here
        return None

    def get_video_info(self, video_id: str, start_time: int) -> dict | None:
        """Finds video info by video_id and start_time."""
        for key, item in self.config_data["available_media"].items():
            if (
                item.get("type") == "VIDEO"
                and item.get("video_id") == video_id
                and item.get("start_time") == start_time
            ):
                return item  # Return the entire video info dictionary
        return None


def create_dummy_images():
    """Creates dummy images if they don't exist (for development)."""
    image_folder = Path("static/images")
    image_folder.mkdir(parents=True, exist_ok=True)

    filenames = ["default_image.png", "tools_all.png", "replacement_parts.png", "assembled_drawing.png"]
    for filename in filenames:
        img_path = image_folder / filename
        if not img_path.exists():
            try:
                with open(img_path, "wb") as f:
                    f.write(b"\x89PNG\r\n\x1a\n\x00\x00\x00\rIHDR\x00\x00\x00\x01\x00\x00\x00\x01\x08\x06\x00\x00\x00\x1f\x15\xc4\x89\x00\x00\x00\nIDATx\x9cc\xfc\xff\xff?\x03\x00\x08\xfc\x02\xfe\xa7\x9a\x51\x00\x00\x00\x00IEND\xaeB`\x82")
                print(f"Created dummy image: {img_path}")
            except Exception as e:
                print(f"Error creating dummy image {img_path}: {e}")

create_dummy_images()