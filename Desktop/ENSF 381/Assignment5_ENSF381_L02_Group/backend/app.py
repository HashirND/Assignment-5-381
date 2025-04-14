from flask import Flask, request, jsonify
from flask_cors import CORS
import json
import os

app = Flask(__name__)
CORS(app)


students = []

# Load JSON data 
def load_json_file(filename):
    path = os.path.join(os.path.dirname(__file__), filename)
    with open(path, 'r') as f:
        return json.load(f)

@app.route('/register', methods=['POST'])
def register():
    data = request.get_json()
    username = data.get('username')
    email = data.get('email')
    password = data.get('password')

    # check if username already exists
    for student in students:
        if student['username'] == username:
            return jsonify({'message': 'Username already taken'}), 400

    new_student = {
        "id": len(students) + 1,
        "username": username,
        "email": email,
        "password": password,
        "enrolled_courses": []
    }
    students.append(new_student)

    return jsonify({'message': 'Registration successful'}), 200

@app.route('/courses', methods=['GET'])
def get_courses():
    courses = load_json_file('courses.json')
    return jsonify(courses)

@app.route('/testimonials', methods=['GET'])
def get_testimonials():
    testimonials = load_json_file('testimonials.json')
    return jsonify(testimonials)

if __name__ == '__main__':
    app.run(debug=True)
