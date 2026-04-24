from flask import Flask, render_template, request, redirect, url_for

app = Flask(__name__)

# In-memory storage (no database)
posts = []

# Home route - display all posts
@app.route('/')
def index():
    return render_template('index.html', posts=posts)

# Create post
@app.route('/create', methods=['GET', 'POST'])
def create():
    if request.method == 'POST':
        title = request.form['title']
        content = request.form['content']
        posts.append({'title': title, 'content': content})
        return redirect(url_for('index'))
    return render_template('create.html')

# Edit post
@app.route('/edit/<int:id>', methods=['GET', 'POST'])
def edit(id):
    if request.method == 'POST':
        posts[id]['title'] = request.form['title']
        posts[id]['content'] = request.form['content']
        return redirect(url_for('index'))
    return render_template('edit.html', post=posts[id], id=id)

# Delete post
@app.route('/delete/<int:id>')
def delete(id):
    posts.pop(id)
    return redirect(url_for('index'))

# Run app
if __name__ == '__main__':
    app.run(debug=True)
