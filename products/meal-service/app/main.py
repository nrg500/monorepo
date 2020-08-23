from typing import List, Optional
from fastapi import FastAPI, Depends, HTTPException
from pydantic import BaseModel
from mongodb import  AsyncIOMotorClient, get_database, connect_to_mongo, close_mongo_connection

class Ingredient(BaseModel):
    name: str
    amount: Optional[int]
    unit: Optional[str]

class Meal(BaseModel):
    name: str
    ingredients: List[Ingredient]

app = FastAPI()

app.add_event_handler("startup", connect_to_mongo)
app.add_event_handler("shutdown", close_mongo_connection)

@app.get("/api/meals/health")
async def health():
    return "Running"

@app.get("/api/meals")
async def meals(db: AsyncIOMotorClient = Depends(get_database)):
    meals : List[Meal] = []
    mealsCursor = db['meals']['meals'].find()
    async for row in mealsCursor:
        meals.append(Meal(**row))
    return meals

@app.post("/api/meals")
async def create_meal(meal: Meal, db: AsyncIOMotorClient = Depends(get_database)):
    insert_result = await db['meals']['meals'].insert_one(meal.dict())
    if(insert_result.acknowledged):
        return meal
    else:
       raise HTTPException(status_code=400, detail="Insert meal failed")