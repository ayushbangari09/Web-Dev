from flask import Flask, render_template, request, redirect

app = Flask(__name__)

events = [
    {"id": 1, "name": "Tech Conference", "date": "2026-04-10", "venue": "Delhi"},
    {"id": 2, "name": "Music Fest", "date": "2026-04-15", "venue": "Mumbai"},
    {"id": 3, "name": "Art Expo", "date": "2026-04-20", "venue": "Jaipur"},
    
    {"id": 4, "name": "Startup Meetup", "date": "2026-04-22", "venue": "Bangalore"},
    {"id": 5, "name": "Food Carnival", "date": "2026-04-25", "venue": "Chandigarh"},
    {"id": 6, "name": "Gaming Tournament", "date": "2026-04-28", "venue": "Hyderabad"},
    
    {"id": 7, "name": "Fashion Show", "date": "2026-05-02", "venue": "Pune"},
    {"id": 8, "name": "AI Workshop", "date": "2026-05-05", "venue": "Noida"},
    {"id": 9, "name": "Dance Battle", "date": "2026-05-08", "venue": "Kolkata"},
    
    {"id": 10, "name": "Photography Walk", "date": "2026-05-12", "venue": "Goa"},
    {"id": 11, "name": "Business Summit", "date": "2026-05-15", "venue": "Gurgaon"},
    {"id": 12, "name": "Coding Hackathon", "date": "2026-05-18", "venue": "Chennai"}
]

@app.route('/')
def index():
    return render_template("index.html")

@app.route('/events')
def events_page():
    return render_template("events.html", events=events)

@app.route('/register', methods=['GET', 'POST'])
def register():
    if request.method == 'POST':
        return redirect('/events')
    return render_template("register.html", events=events)

@app.route('/admin')
def admin():
    return render_template("admin.html", events=events)

@app.route('/admin/add', methods=['POST'])
def add_event():
    new_event = {
        "id": len(events)+1,
        "name": request.form['name'],
        "date": request.form['date'],
        "venue": request.form['venue']
    }
    events.append(new_event)
    return redirect('/admin')

@app.route('/admin/delete/<int:id>')
def delete_event(id):
    global events
    events = [e for e in events if e['id'] != id]
    return redirect('/admin')

if __name__ == "__main__":
    app.run(debug=True, port=5000)
