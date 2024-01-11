from flask import Flask, request, jsonify
from flask_cors import CORS
import json
from difflib import get_close_matches
from reader import text_to_speech

app = Flask(__name__)
CORS(app)

def load_knowledge_base(file_path):
    with open(file_path, 'r') as file:
        data = json.load(file)
    return data

def find_best_match(user_question, questions):
    matches = get_close_matches(user_question, questions, n=1, cutoff=0.6)
    return matches[0] if matches else None

def get_answer_for_question(question, knowledge_base):
    for q in knowledge_base["questions"]:
        if q["question"] == question:
            return q["answer"]

knowledge_base = load_knowledge_base('knowledge_base.json')
learning_mode = False
pending_question = ""

@app.route('/chat', methods=['POST'])
def chat():
    global learning_mode
    global pending_question

    user_input = request.json.get('user_input')

    if learning_mode:
        # If the bot is in learning mode, store the user's answer for the pending question
        knowledge_base['questions'].append({"question": pending_question, "answer": user_input})
        save_knowledge_base('knowledge_base.json', knowledge_base)
        learning_mode = False
        pending_question = ""
        return jsonify({'bot_response': "Thank you! I learned a new response!"})

    best_match = find_best_match(user_input, [q["question"] for q in knowledge_base["questions"]])

    if best_match:
        answer = get_answer_for_question(best_match, knowledge_base)
        return jsonify({'bot_response': answer})
    else:
        learning_mode = True
        pending_question = user_input
        return jsonify({'bot_response': "I don't know the answer. Can you teach me?"})

def save_knowledge_base(file_path, data):
    with open(file_path, 'w') as file:
        json.dump(data, file, indent=2)

@app.route('/text-to-speech', methods=['POST'])
def text_to_speech_api():
    data = request.json
    text = data.get('text', '')
    language = data.get('language', 'es-es')
    mp3_base64 = text_to_speech(text, language)
    return jsonify({'mp3_base64': mp3_base64})

if __name__ == '__main__':
    app.run(port=5000)