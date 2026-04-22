from flask import Flask, render_template, request
import random

app = Flask(__name__)

quiz_data = [
    {
        "question": "What is the capital of India?",
        "options": ["Mumbai", "Delhi", "Chennai", "Kolkata"],
        "answer": "Delhi"
    },
    {
        "question": "Which language is used for web apps?",
        "options": ["Python", "Java", "HTML", "All"],
        "answer": "All"
    },
    {
        "question": "Who developed Python?",
        "options": ["Dennis Ritchie", "Guido van Rossum", "James Gosling", "Bjarne Stroustrup"],
        "answer": "Guido van Rossum"
    },
    {
        "question": "Which is a database?",
        "options": ["MySQL", "HTML", "CSS", "Flask"],
        "answer": "MySQL"
    },
    {
        "question": "Which is backend framework?",
        "options": ["React", "Flask", "Bootstrap", "HTML"],
        "answer": "Flask"
    },
    {
        "question": "Which HTML tag is used for links?",
        "options": ["<a>", "<link>", "<href>", "<url>"],
        "answer": "<a>"
    },
    {
        "question": "Which CSS property controls text size?",
        "options": ["font-style", "text-size", "font-size", "text-style"],
        "answer": "font-size"
    },
    {
        "question": "Which symbol is used for comments in Python?",
        "options": ["//", "#", "/* */", "<!-- -->"],
        "answer": "#"
    },
    {
        "question": "Which method is used to get form data in Flask?",
        "options": ["request.get()", "request.form", "request.data", "form.get()"],
        "answer": "request.form"
    },
    {
        "question": "Which company developed Java?",
        "options": ["Microsoft", "Google", "Sun Microsystems", "Apple"],
        "answer": "Sun Microsystems"
    }
]

@app.route('/')
def home():
    return render_template('index.html')

@app.route('/quiz', methods=['POST'])
def quiz():
    username = request.form.get("username")

    random.shuffle(quiz_data)
    return render_template('quiz.html', quiz=quiz_data, username=username)

@app.route('/result', methods=['POST'])
def result():
    score = 0
    results = []

    username = request.form.get("username")

    for i in range(len(quiz_data)):
        user_ans = request.form.get(f"q{i}")
        correct_ans = quiz_data[i]["answer"]

        if user_ans == correct_ans:
            score += 1
            status = "Correct"
        else:
            status = "Wrong"

        results.append({
            "question": quiz_data[i]["question"],
            "your_answer": user_ans,
            "correct_answer": correct_ans,
            "status": status
        })

    return render_template('result.html', score=score, results=results, username=username)

if __name__ == '__main__':
    app.run(debug=True)
