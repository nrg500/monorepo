from flask import Flask
from config import Config
from flask_pymongo import PyMongo
from flask_cors import CORS

app = Flask(__name__)
cors = CORS(app, resources={r"*": {"origins": "*"}})
app.config.from_object(Config)
mongo = PyMongo(app)

from app import routes