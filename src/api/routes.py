"""
This module takes care of starting the API Server, Loading the DB and Adding the endpoints
"""
from flask import Flask, request, jsonify, url_for, Blueprint
from api.models import db, User, Tickets, News, Artist
from api.utils import generate_sitemap, APIException

from flask_jwt_extended import create_access_token
from flask_jwt_extended import get_jwt_identity
from flask_jwt_extended import jwt_required


api = Blueprint('api', __name__)


# @api.route('/hello', methods=['POST', 'GET'])
# def handle_hello():

#     response_body = {
#         "message": "Hello! I'm a message that came from the backend, check the network tab on the google inspector and you will see the GET request"
#     }

#     return jsonify(response_body), 200


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
        User.is_active == True,
        User.is_admin == True
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
        return jsonify(access_token=access_token)

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
        request_body = request.get_json()
        news = News(title=request_body['title'],
                    body=request_body['body'],
                    image_url=request_body['image_url'],
                    poster_news=user_id)

        db.session.add(news)
        db.session.commit()
        return jsonify(request_body), 200
    return jsonify("user doesn't have permission"), 411


@api.route('/admin/news/<int:news_id>', methods=['PUT'])
@jwt_required()
def update_news(news_id):
    admin = User.query.filter(User.is_active == True,
                              User.is_admin == True).first()
    if admin:
        request_body = request.get_json()
        news = News.query.get(news_id)
        if news is None:
            raise APIException('News not found', status_code=404)
        if "title" or "body" or "image_url" in request_body:
            news.title = request_body["title"]
            news.body = request_body["body"]
            news.image_url = request_body["image_url"]
        db.session.commit()
        return jsonify(request_body), 200
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
    artist = db.get_or_404(Artist, id)
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
        request_body = request.get_json()
        artist = Artist.query.get(artist_id)
        if artist is None:
            raise APIException('Artist not found', status_code=404)
        if "description" and "name" and "imageurl" and "musicUrl" in request_body:
            artist.description = request_body["description"]
            artist.name = request_body["name"]
            artist.imageUrl = request_body["imageUrl"]
            artist.musicUrl = request_body["musicUrl"]
        db.session.commit()
        return jsonify(request_body), 200
    return jsonify("user doesn't have permission"), 411