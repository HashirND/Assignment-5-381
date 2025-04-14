from flask import Flask, request, jsonify
from flask_cors import CORS
import json
import os
import random

app = Flask(__name__)
CORS(app)

students = []

# Load JSON from file
def load_json_file(filename):
    path = os.path.join(os.path.dirname(__file__), filename)
    with open(path, 'r') as f:
        return json.load(f)

# ========= PART 1: REGISTER =========
@app.route('/register', methods=['POST'])
def register():
    data = request.get_json()
    username = data.get('username')
    email = data.get('email')
    password = data.get('password')

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

# ========= PART 3.1: LOGIN =========
@app.route('/login', methods=['POST'])
def login():
    data = request.get_json()
    username = data.get('username')
    password = data.get('password')

    for student in students:
        if student['username'] == username and student['password'] == password:
            return jsonify({'message': 'Login successful', 'student_id': student['id']}), 200

    return jsonify({'message': 'Invalid username or password'}), 401

# ========= PART 3.2: GET ALL COURSES =========
@app.route('/courses', methods=['GET'])
def get_courses():
    return jsonify(load_json_file('courses.json'))

# ========= PART 3.3: GET RANDOM TESTIMONIALS =========
@app.route('/testimonials', methods=['GET'])
def get_testimonials():
    data = load_json_file('testimonials.json')
    return jsonify(random.sample(data, 2))

# ========= PART 3.4: ENROLL IN A COURSE =========
@app.route('/enroll/<int:student_id>', methods=['POST'])
def enroll_course(student_id):
    course = request.get_json()
    for student in students:
        if student['id'] == student_id:
            # check if already enrolled
            if any(c['id'] == course['id'] for c in student['enrolled_courses']):
                return jsonify({'message': 'Already enrolled in this course'}), 400
            student['enrolled_courses'].append(course)
            return jsonify({'message': 'Enrolled successfully'}), 200
    return jsonify({'message': 'Student not found'}), 404

# ========= PART 3.5: DROP A COURSE =========
@app.route('/drop/<int:student_id>', methods=['DELETE'])
def drop_course(student_id):
    course = request.get_json()
    for student in students:
        if student['id'] == student_id:
            student['enrolled_courses'] = [
                c for c in student['enrolled_courses'] if c['id'] != course['id']
            ]
            return jsonify({'message': 'Dropped successfully'}), 200
    return jsonify({'message': 'Student not found'}), 404

# ========= PART 3.6: GET STUDENT'S ENROLLED COURSES =========
@app.route('/student_courses/<int:student_id>', methods=['GET'])
def get_student_courses(student_id):
    for student in students:
        if student['id'] == student_id:
            return jsonify(student['enrolled_courses']), 200
    return jsonify([]), 200

if __name__ == '__main__':
    app.run(debug=True)
