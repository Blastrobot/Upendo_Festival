from flask_sqlalchemy import SQLAlchemy

db = SQLAlchemy()

class User(db.Model):
    id = db.Column(db.Integer, primary_key=True)
    email = db.Column(db.String(120), unique=True, nullable=False)
    password = db.Column(db.String(80), unique=False, nullable=False)
    is_active = db.Column(db.Boolean(), unique=False, nullable=False)

    def __repr__(self):
        return f'<User {self.email}>'

    def serialize(self):
        return {
            "id": self.id,
            "email": self.email,
            # do not serialize the password, its a security breach
        }

class Tickets(db.Model):
    id = db.Column(db.Integer, primary_key=True)
    # user_id = db.Column(db.Integer(), db.ForeignKey('user.id'), nullable=False)
    ticket_type = db.Column(db.String(128), unique=True, nullable=False)
    ticket_price = db.Column(db.Integer(), unique=False, nullable=False)
    ticket_desc = db.Column(db.Text(1024), unique=False, nullable=False)
    ticket_quantity = db.Column(db.Integer(), unique=False, nullable=False)
    is_active = db.Column(db.Boolean(), unique=False, nullable=False)

    def __repr__(self):
        return f'<User {self.ticket_type}>'

    def serialize(self):
        return {
            "id": self.id,
            "ticket_type": self.ticket_type,
            "ticket_price": self.ticket_price,
            "ticket_desc": self.ticket_desc
        }