from bson.json_util import dumps
from app import app, mongo
from flask import jsonify, request
from flask_api import status

@app.route('/meals', methods=(['POST']))
def create_meal():
    req_data = request.get_json()
    meal = {
            "name": req_data['name'],
            "ingredients": req_data['ingredients']
        }
    insert_result = mongo.db.meals.insert_one(meal)
    if(insert_result.acknowledged):
        return dumps(meal), status.HTTP_201_CREATED
    else:
        return 'Meal creation failed', status.HTTP_400_BAD_REQUEST
    
@app.route('/meals', methods=(['GET']))
def get_meals():
    meals = mongo.db.meals.find()
    return dumps(meals)
