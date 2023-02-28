"""
This module takes care of starting the API Server, Loading the DB and Adding the endpoints
"""
from flask import Flask, redirect, request, jsonify, url_for, Blueprint
from api.models import db, User, Tickets, News, Artist
from api.utils import generate_sitemap, APIException

from flask_jwt_extended import create_access_token
from flask_jwt_extended import get_jwt_identity
from flask_jwt_extended import jwt_required

import cloudinary
import cloudinary.uploader

api = Blueprint('api', __name__)


@api.route('/tickets', methods=['GET'])
def get_tickets():
    tickets = Tickets.query.all()
    results = [ticket.serialize() for ticket in tickets]
    response_body = {
        "msg": "Tickets, GET Method",
        "total": len(results),
        "results": results
    }

    return jsonify(response_body), 200


@api.route('/user/tickets/<int:user_id>', methods=['GET'])
@jwt_required()
def get_user_tickets():
    user = User.query.filter(
        User.is_active == True
    ).first()
    if user:
        tickets = Tickets.query.get(user_id)
        results = [tickets.serialize() for ticket in tickets]
        response_body = {
            "msg": "Tickets, for specific user",
            "results": results
        }
    return jsonify(response_body), 200


@api.route("/login", methods=["POST"])
def login():
    email = request.json.get("email", None)
    password = request.json.get("password", None)
    user = User.query.filter(
        User.email == email, User.password == password, User.is_active == True).first()
    if user:
        access_token = create_access_token(identity=email)
        return jsonify(access_token=access_token, admin=user.is_admin)

    return jsonify({"msg": "Bad email or password"}), 40


@api.route('/signup', methods=['POST'])
def create_user():
    request_body = request.get_json()
    user = User(email=request_body['email'],
                password=request_body['password'],
                is_active=True,
                is_admin=False
                )
    db.session.add(user)
    db.session.commit()
    return jsonify(request_body), 200


@api.route('/news', methods=['GET'])
def show_news():
    news = News.query.all()
    response = [news.serialize() for news in news]
    response_body = {"message": "ok",
                     "results": response
                     }
    return jsonify(response_body), 200


@api.route('/admin/news', methods=['GET'])
@jwt_required()
def show_admin_news():
    admin = User.query.filter(User.is_active == True,
                              User.is_admin == True).first()
    if admin:
        news = News.query.all()
        response = [news.serialize() for news in news]
        response_body = {"message": "ok",
                         "results": response}
    return jsonify(response_body), 200


@api.route('/admin/news/<int:user_id>', methods=['POST'])
@jwt_required()
def create_news(user_id):
    admin = User.query.filter(User.is_active == True,
                              User.is_admin == True).first()
    if admin:
     title = request.form.get("title")
     body = request.form.get("body")
     file = request.files['file']
     upload_result = cloudinary.uploader.upload(file)
     photo_url = upload_result ['url']
     news = News(title = title,
                 body = body,
                 image_url = photo_url,
                 poster_news = user_id)

     db.session.add(news)
     db.session.commit()
     return jsonify({"news": news.serialize()}),  200
    return jsonify("user doesn't have permission"), 411


@api.route('/admin/news/<int:news_id>', methods=['PUT'])
@jwt_required()
def update_news(news_id):
    admin = User.query.filter(User.is_active == True,
                              User.is_admin == True).first()
    if admin:
     file = request.files['file']
     if file is None:
         return {"error": "ha ocurrido un error"}, 400
     upload_result = cloudinary.uploader.upload(file)
     title = request.form.get('title')
     body = request.form.get('body')
     photo_url = upload_result ['url']
     news = News.query.get(news_id)
     if news is None:
         raise APIException('News not found', status_code=404)
     if "title" or "body" or "image_url" in request_body:
        news.title = title
        news.body = body
        news.image_url = photo_url

        db.session.commit()
        return jsonify({"msg": "news modified", "news": news.serialize()}),200
    return jsonify("user doesn't have permission"), 411


@api.route('/admin/news/<int:news_id>', methods=['DELETE'])
@jwt_required()
def delete_news(news_id):
    admin = User.query.filter(User.is_active == True,
                              User.is_admin == True).first()
    if admin:
     news = News.query.get(news_id)
     response_body = {"message": "deleted succesfully"}
     db.session.delete(news)
     db.session.commit()
    return jsonify(response_body), 200


@api.route("/artist", methods = ["GET"])
def getAllArtist():
    artists = Artist.query.all()
    response = [artist.serialize() for artist in artists]
    response_body = {"message": "ok",
                     "results": response
    }
    return jsonify(response_body), 200


@api.route("/artist/<int:id>", methods = ["GET"])
def getArtistById(id):
    artist = Artist.query.get(id)
    response = artist.serialize()
    response_body = {"message": "ok",
                     "results": response
    }
    return jsonify(response_body), 200


@api.route('/admin/artist/<int:artist_id>', methods=['PUT'])
@jwt_required()
def update__artist(artist_id):
    admin = User.query.filter(User.is_active == True, User.is_admin == True ).first()
    if admin:
        file = request.files['file']
        if file is None:
           return {"error": "ha ocurrido un error"}, 400
        upload_result = cloudinary.uploader.upload(file)
        photo_url = upload_result['url']
        name = request.form.get('name')
        description = request.form.get('description')
        music_url = request.form.get('music_url')
        artist = Artist.query.get(artist_id)
        if artist is None:
            raise APIException('Artist not found', status_code=404)
        if "description" and "name" and "image_url" and "music_url" in request.form:
            upload_result = cloudinary.uploader.upload(file)
            artist.description = description
            artist.name = name
            artist.image_url = photo_url
            artist.musicUrl = music_url
        db.session.commit()
        return jsonify({"msg": "artist modified", "artist": artist.serialize()},200), 200
    return jsonify("user doesn't have permission"), 411

