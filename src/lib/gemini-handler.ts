import { GoogleGenerativeAI } from "@google/generative-ai";

interface MediaItem {
  type: "IMAGE" | "VIDEO";
  source?: string;
  video_id?: string;
  start_time?: number;
  playback_duration?: number;
  description?: string;
}

interface ConfigData {
  available_media: {
    [key: string]: MediaItem;
  };
}

const CONFIG_JSON = `
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
`;

const SYSTEM_PROMPT = `
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
`;

export class GeminiHandler {
  private configData: ConfigData;
  private model: any;
  private chat: any;

  constructor() {
    const genAI = new GoogleGenerativeAI(process.env.GOOGLE_API_KEY!);
    this.configData = JSON.parse(CONFIG_JSON);
    this.model = genAI.getGenerativeModel({
      model: "gemini-1.5-flash",
      generationConfig: {
        temperature: 0.7,
        topP: 0.8,
        topK: 40,
      },
    });
    this.chat = this.model.startChat();
  }

  async processMessage(userMessage: string): Promise<any> {
    try {
      const fullMessage = SYSTEM_PROMPT + "\n\n" + userMessage;
      const result = await this.chat.sendMessage(fullMessage);
      const response = await result.response;
      const text = response.text();
      
      // Add debug logging
      console.log("Raw Gemini response:", text);
      
      // Try to extract JSON from markdown code block
      const jsonMatch = text.match(/```json\n([\s\S]*?)\n```/);
      let cleanedText = jsonMatch ? jsonMatch[1] : text;
      
      // If we don't have valid JSON, try to wrap it in a proper structure
      if (!jsonMatch) {
        console.log("No JSON code block found, wrapping response");
        cleanedText = JSON.stringify({
          function_calls: [],
          response: text
        });
      }
      
      // Add more debug logging
      console.log("Cleaned text for JSON parsing:", cleanedText);
      
      try {
        const parsed = JSON.parse(cleanedText);
        console.log("Successfully parsed JSON:", parsed);
        return parsed;
      } catch (error) {
        console.error("JSON Decoding Error:", error);
        console.error("Problematic text:", cleanedText);
        return {
          error: "Invalid JSON response from model.",
          details: {
            error: String(error),
            response: text,
            cleanedText: cleanedText
          },
        };
      }
    } catch (error) {
      console.error("General Exception:", error);
      return { error: "Error processing message.", details: String(error) };
    }
  }

  getMediaUrl(source: string): string | null {
    const item = this.configData.available_media[source];
    if (!item) return null;

    if (item.type === "IMAGE") {
      const cdnUrls: { [key: string]: string } = {
        "tools_all.png": "https://imagedelivery.net/q-41_Eh4Vh68wzQLFCdK2g/c48c3db7-5a1e-4434-11ba-a9ff53bc5000/public",
        "replacement_parts.png": "https://imagedelivery.net/q-41_Eh4Vh68wzQLFCdK2g/8aebe96c-54c6-4830-b370-f22c7b850800/public",
        "default_image.png": "https://imagedelivery.net/q-41_Eh4Vh68wzQLFCdK2g/bdd5175a-4b6c-4453-1954-37dbba6f8e00/public",
        "assembled_drawing.png": "https://imagedelivery.net/q-41_Eh4Vh68wzQLFCdK2g/b4ac0a1d-7a21-4076-50d4-4c1e2e426300/public"
      };
      return cdnUrls[item.source!] || null;
    } else if (item.type === "VIDEO") {
      return `https://www.youtube.com/watch?v=${item.video_id}`;
    }
    return null;
  }

  getVideoInfo(videoId: string, startTime: number): MediaItem | null {
    for (const key in this.configData.available_media) {
      const item = this.configData.available_media[key];
      if (
        item.type === "VIDEO" &&
        item.video_id === videoId &&
        item.start_time === startTime
      ) {
        return item;
      }
    }
    return null;
  }
}
