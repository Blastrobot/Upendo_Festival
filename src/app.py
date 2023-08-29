"""
This module takes care of starting the API Server, Loading the DB and Adding the endpoints
"""
import os
from flask import Flask, request, redirect, jsonify, url_for, send_from_directory
from flask_migrate import Migrate
from flask_swagger import swagger
from flask_cors import CORS
from api.utils import APIException, generate_sitemap
from api.models import db
from api.routes import api
from api.admin import setup_admin
from api.commands import setup_commands
from flask_jwt_extended import JWTManager
import cloudinary
import cloudinary.uploader
import cloudinary.api

import stripe
# secret STRIPE API key
stripe.api_key = "sk_test_51McCmaKTqfPHNZ5mHdWubfNS044BVSuthyJ74kIwo8EChD7rQCrWdxUNy2vp7Lb9ExpScsFfVrQI4e3ne9Chp6Bm00IVGNTNKl"


ENV = os.getenv("FLASK_ENV")
static_file_dir = os.path.join(os.path.dirname(os.path.realpath(__file__)), '../public/')
app = Flask(__name__)

# JWT configuration
app.config["JWT_SECRET_KEY"] = os.environ.get("JWT_SECRET")
jwt = JWTManager(app)
app.url_map.strict_slashes = False

# DOMAIN
MY_DOMAIN = "https://upendofestival.vercel.app"

# Cloudinary configuration
cloudinary.config(cloud_name = os.getenv('CLOUD_NAME'), 
                  api_key = os.getenv('API_KEY'), 
                  api_secret = os.getenv('API_SECRET'))


# database condiguration
db_url = os.getenv("DATABASE_URL")
if db_url is not None:
    app.config['SQLALCHEMY_DATABASE_URI'] = db_url.replace("postgres://", "postgresql://")
else:
    app.config['SQLALCHEMY_DATABASE_URI'] = "sqlite:////tmp/test.db"

app.config['SQLALCHEMY_TRACK_MODIFICATIONS'] = False
MIGRATE = Migrate(app, db, compare_type = True)
db.init_app(app)

# Allow CORS requests to this API
CORS(app)

# add the admin
setup_admin(app)

# add the admin
setup_commands(app)

# Add all endpoints form the API with a "api" prefix
app.register_blueprint(api, url_prefix='/api')

# Handle/serialize errors like a JSON object
@app.errorhandler(APIException)
def handle_invalid_usage(error):
    return jsonify(error.to_dict()), error.status_code

# generate sitemap with all your endpoints
@app.route('/')
def sitemap():
    if ENV == "development":
        return generate_sitemap(app)
    return send_from_directory(static_file_dir, 'index.html')

# any other endpoint will try to serve it like a static file
@app.route('/<path:path>', methods=['GET'])
def serve_any_other_file(path):
    if not os.path.isfile(os.path.join(static_file_dir, path)):
        path = 'index.html'
    response = send_from_directory(static_file_dir, path)
    response.cache_control.max_age = 0 # avoid cache memory
    return response

# Calculation of the order's amount
def calculate_order_amount(items):
    return 2000;

#Personalized Session
# @app.route('/create-payment-intent', methods=['POST'])
# def create_payment():
#     try:
#         data = json.loads(request.data)
#         # data = request.get_json()
#         intent = stripe.PaymentIntent.create(
#             amount = calculate_order_amount(data['items']),
#             currency = 'eur',
#             automatic_payment_methods = {
#                 'enabled': True,
#             }
#         )
#         return jsonify({
#             'clientSecret': intent['client_secret']
#         })
#     except Exception as e:
#         return jsonify(error = str(e)), 403

#Checkout Session
## Volta price_1McoRAKTqfPHNZ5mbSaUGU8Y
## Nile price_1McoRVKTqfPHNZ5mrh0KWhrF
## Congo price_1MgSkLKTqfPHNZ5m3zYpYDcs
@app.route('/create-checkout-session', methods=['POST'])
def checkout_session():
    items = request.json["items"]
    line_items = []
    for item in items:
        line_items.append({
            "price": item['id'],
            "quantity": item['quantity']
        })
    
    try:
        session = stripe.checkout.Session.create(
            line_items=line_items,

            mode='payment',
            success_url=MY_DOMAIN + '?success=true',
            cancel_url=MY_DOMAIN + '?canceled=true'
        )
    except Exception as e:
        console.log(e)
        return str(e)
    
    return jsonify({'url': session['url']})
    # return JSON.stringify({url: session.url})

# this only runs if `$ python src/main.py` is executed
if __name__ == '__main__':
    PORT = int(os.environ.get('PORT', 3001))
    app.run(host='0.0.0.0', port=PORT, debug=True)
