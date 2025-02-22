# app.py
from flask import Flask, request, jsonify, send_from_directory, render_template
from .utils import GeminiHandler, create_dummy_images  # Relative import
from .config import Config  # Relative import
import os

app = Flask(__name__)
app.config.from_object(Config)

gemini_handler = GeminiHandler()
create_dummy_images()  # Ensure dummy images exist

@app.route('/chat', methods=['POST'])
def chat():
    data = request.get_json()
    if not data or 'message' not in data:
        return jsonify({"error": "Missing 'message' in request body."}), 400

    user_message = data['message']
    gemini_response = gemini_handler.process_message(user_message)

    if "error" in gemini_response:
        return jsonify(gemini_response), 500

    response_data = {
        "response": gemini_response.get("response", ""),
        "media": [],
    }

    function_calls = gemini_response.get("function_calls", [])
    for call in function_calls:
        if call["name"] == "display_media":
            media_url = gemini_handler.get_media_url(call["arguments"]["source"])
            if media_url:
                response_data["media"].append({
                    "type": "image",
                    "url": media_url
                })
        elif call["name"] == "play_video":
            video_id = call["arguments"]["video_id"]
            start_time = call["arguments"]["start_time"]
            duration = call["arguments"]["playback_duration"]

            # Use get_video_info to find the correct video
            video_info = gemini_handler.get_video_info(video_id, start_time)

            if video_info:
                video_url = gemini_handler.get_media_url(
                    next(key for key, value in gemini_handler.config_data['available_media'].items() if value == video_info)
                )  # Get the *key* to pass to get_media_url
                response_data["media"].append({
                    "type": "video",
                    "url": video_url,
                    "start_time": start_time,  # Include start_time
                    "duration": duration       # Include duration
                })
            else:
                print(f"Error: Could not find video with id '{video_id}' and start time '{start_time}'")


        elif call["name"] == "clear_media":
            response_data["media"] = []

    return jsonify(response_data)


@app.route('/static/images/<filename>')
def serve_image(filename):
    return send_from_directory(app.config['IMAGE_FOLDER'], filename)

@app.route('/') # Added to serve the HTML
def index():
    return render_template('index.html')

if __name__ == '__main__':
    app.run(debug=True, port=5000)