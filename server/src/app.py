from flask import Flask, render_template, request, jsonify
from flask_cors import CORS, cross_origi
from chat import get_answer_for_question
from chat import find_best_match
import json

app = Flask(__name__)

CORS(app, resources={r"/api/*": {"origins": "http://localhost:5173"}})

def load_knowledge_base(file_path: str) -> dict:
    with open(file_path, 'r') as file:
        data: dict = json.load(file)
    return data

def save_knowledge_base(file_path: str, data: dict):
    with open(file_path, 'w') as file:
        json.dump(data, file, indent=2)

@app.route('/predict', methods=["POST"])
def predict():
    text = request.get_json().get("message")
    # TODO: check if text is valid
    response = get_answer_for_question(text)
    message = {"answer": response}
    return jsonify(message)


if __name__ == "__main__":
    app.run(host="0.0.0.0", port=5000, debug=True)