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
            "email": self.email
        }

class Artist(db.Model):
    ArtistId = db.Column(db.Integer, primary_key=True, nullable=False)
    name = db.Column(db.String(50), unique=True, nullable=False)
    description = db.Column(db.String(250), unique=False, nullable=False)
    imageUrl = db.Column(db.String(120), unique=False, nullable=False)
    musicUrl = db.Column(db.String(120), unique=False, nullable=False)


    def __repr__(self):
        return f'<Artist {self.id}>'

    def serialize(self):
        return {
            "ArtistId": self.ArtistId,
            "name": self.name,
            "description": self.description,
            "imageUrl" : self.imageUrl,
            "musicUrl" : self.musicUrl
        }