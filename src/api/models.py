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

class News(db.Model):
    id = db.Column(db.Integer, primary_key=True)
    title = db.Column(db.String(120), unique=False, nullable=False)
    body = db.Column(db.String(500), unique=False, nullable=False)
    image_url = db.Column(db.String(500), unique=True, nullable=False)
    poster_news = db.Column(db.Integer,  db.ForeignKey('user.id'),  nullable=True)


    def __repr__(self):
        return f'<News {self.id}>'

    def serialize(self):
        return {
            "id": self.id,
            "title": self.title,
            "body": self.body, 
            "image_url": self.image_url 
        }