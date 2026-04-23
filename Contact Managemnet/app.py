"""
Project: Contact Management System
Name: Ayush Bangari
Date: 2026
Description: A simple Flask CRUD app to manage contacts
"""

from flask import Flask, render_template, request, redirect, url_for

app = Flask(__name__)

# In-memory storage (no database)
contacts = []
contact_id = 1


# HOME ROUTE (READ)
@app.route('/')
def index():
    query = request.args.get('search')
    
    if query:
        filtered_contacts = [c for c in contacts if query.lower() in c['name'].lower() or query in c['phone']]
    else:
        filtered_contacts = contacts
        
    return render_template('index.html', contacts=filtered_contacts)


# ADD CONTACT (CREATE)
@app.route('/add', methods=['GET', 'POST'])
def add_contact():
    global contact_id
    
    if request.method == 'POST':
        name = request.form['name']
        phone = request.form['phone']
        email = request.form['email']

        if not name or not phone or not email:
            return "All fields are required!"

        new_contact = {
            'id': contact_id,
            'name': name,
            'phone': phone,
            'email': email
        }

        contacts.append(new_contact)
        contact_id += 1

        return redirect(url_for('index'))

    return render_template('add_contact.html')


# EDIT CONTACT (UPDATE)
@app.route('/edit/<int:id>', methods=['GET', 'POST'])
def edit_contact(id):
    contact = next((c for c in contacts if c['id'] == id), None)

    if not contact:
        return "Contact not found!"

    if request.method == 'POST':
        contact['name'] = request.form['name']
        contact['phone'] = request.form['phone']
        contact['email'] = request.form['email']

        return redirect(url_for('index'))

    return render_template('edit_contact.html', contact=contact)


# DELETE CONTACT (DELETE)
@app.route('/delete/<int:id>')
def delete_contact(id):
    global contacts
    contacts = [c for c in contacts if c['id'] != id]
    return redirect(url_for('index'))


if __name__ == '__main__':
    app.run(debug=True)
