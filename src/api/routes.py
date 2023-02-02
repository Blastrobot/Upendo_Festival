"""
This module takes care of starting the API Server, Loading the DB and Adding the endpoints
"""
from flask import Flask, request, jsonify, url_for, Blueprint, redirect
from api.models import db, User, News
from api.utils import generate_sitemap, APIException


api = Blueprint('api', __name__)


@api.route('/hello', methods=['POST', 'GET'])
def handle_hello():

    response_body = {
        "message": "Hello! I'm a message that came from the backend, check the network tab on the google inspector and you will see the GET request"
    }

    return jsonify(response_body), 200

@api.route('/news', methods=['GET'])
# @jwt_required()
def show_news():
    news = News.query.all()
    response = [news.serialize() for news in news]
    response_body = {"message": "ok",
                     "results": response
    }
    return jsonify(response_body), 200


@api.route('/admin/news', methods=['POST'])
# @jwt_required()
def create_news():
    request_body = request.get_json()
    news = News(title = request_body['title'],
                body = request_body['body'])
                
    db.session.add(news)
    db.session.commit()
    return jsonify(request_body), 200


@api.route('/admin/news/<int:news_id>', methods=['PUT'])
# @jwt_required()
def update_news(news_id):
    request_body = request.get_json()
    news = News.query.get(news_id)
    if news is None:
       raise APIException('News not found', status_code=404)
    if "title" and "body" in request_body:
       news.title = request_body["title"] 
       news.body = request_body["body"] 
    db.session.commit()
    return jsonify(request_body), 200


@api.route('/admin/news/<int:news_id>', methods=['DELETE'])     
def delete_news(news_id):
    news = News.query.get(news_id)
    db.session.delete(news)
    db.session.commit()

   

    return 200, redirect('/news')
                

