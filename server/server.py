from flask import Flask, request, jsonify
from flask_cors import CORS
import os
import google.generativeai as genai

app = Flask(__name__)
CORS(app)  # Enable CORS for all routes

# Configure Google AI
GOOGLE_API_KEY = os.getenv('GOOGLE_API_KEY')
genai.configure(api_key=GOOGLE_API_KEY)
model = genai.GenerativeModel('gemini-2.0-flash')

def generate_response(prompt, context):
    try:
        # Combine context and new message
        conversation = "\n".join([f"{msg['sender']}: {msg['text']}" for msg in context])
        full_prompt = f"{conversation}\nuser: {prompt}"
        
        # Generate response
        response = model.generate_content(full_prompt)
        return response.text
    except Exception as e:
        print(f"Error generating response: {str(e)}")
        return "Sorry, I'm having trouble generating a response. Please try again."

@app.route('/api/ikea-chat', methods=['POST'])
def ikea_chat():
    data = request.json
    print("Received IKEA Chat Request:", data)
    
    # Generate AI response
    response_text = generate_response(data['message'], data['context'])
    
    return jsonify({
        'success': True,
        'message': response_text
    })

@app.route('/api/grundfoss-chat', methods=['POST'])
def grundfoss_chat():
    data = request.json
    print("Received Grundfoss Chat Request:", data)
    
    # Generate AI response
    response_text = generate_response(data['message'], data['context'])
    
    return jsonify({
        'success': True,
        'message': response_text
    })

if __name__ == '__main__':
    app.run(port=5000)
