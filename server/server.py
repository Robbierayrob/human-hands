from flask import Flask, request, jsonify
from flask_cors import CORS

app = Flask(__name__)
CORS(app)  # Enable CORS for all routes

@app.route('/api/ikea-chat', methods=['POST'])
def ikea_chat():
    data = request.json
    print("Received IKEA Chat Request:", data)
    return jsonify({
        'success': True,
        'message': 'IKEA request received',
        'data': data
    })

@app.route('/api/grundfoss-chat', methods=['POST'])
def grundfoss_chat():
    data = request.json
    print("Received Grundfoss Chat Request:", data)
    return jsonify({
        'success': True,
        'message': 'Grundfoss request received',
        'data': data
    })

if __name__ == '__main__':
    app.run(port=5000)
