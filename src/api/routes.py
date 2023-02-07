"""
This module takes care of starting the API Server, Loading the DB and Adding the endpoints
"""
from flask import Flask, request, jsonify, url_for, Blueprint
from api.models import db, User, Artist
from api.utils import generate_sitemap, APIException

api = Blueprint('api', __name__)

@api.route("/artist", methods = ["GET"])
def getAllArtist():
    artists = Artist.query.all()
    response = [artist.serialize() for artist in artists]
    response_body = {"message": "ok",
                     "results": response
    }
    return jsonify(response_body), 200

@api.route("/artist/<int:id>")
def getArtistById(id):
    artist = db.get_or_404(Artist, id)
    response = artist.serialize()
    response_body = {"message": "ok",
                     "results": response
    }
    return jsonify(response_body), 200

@api.route('/admin/artist/<int:artist_id>', methods=['PUT'])
# @jwt_required()
def update_news(artist_id):
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