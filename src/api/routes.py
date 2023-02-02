"""
This module takes care of starting the API Server, Loading the DB and Adding the endpoints
"""
from flask import Flask, request, jsonify, url_for, Blueprint
from api.models import db, User, Tickets
from api.utils import generate_sitemap, APIException

api = Blueprint('api', __name__)


@api.route('/hello', methods=['POST', 'GET'])
def handle_hello():

    response_body = {
        "message": "Hello! I'm a message that came from the backend, check the network tab on the google inspector and you will see the GET request"
    }

    return jsonify(response_body), 200


@api.route('/tickets', methods=['GET'])
def get_tickets():
    tickets = Tickets.query.all()
    results = [ticket.serialize() for ticket in tickets]
    response_body = {
        "msg": "get method von tickets",
        "total": len(results),
        "results": results
    }

    return jsonify(response_body), 200