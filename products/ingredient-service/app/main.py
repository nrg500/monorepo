from typing import List, Optional
from fastapi import FastAPI, Depends, HTTPException
from fastapi.middleware.cors import CORSMiddleware
from pydantic import BaseModel
from mongodb import  AsyncIOMotorClient, get_database, connect_to_mongo, close_mongo_connection

class Ingredient(BaseModel):
    name: str
    amount: Optional[int]
    unit: Optional[str]

app = FastAPI()

app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

app.add_event_handler("startup", connect_to_mongo)
app.add_event_handler("shutdown", close_mongo_connection)

@app.get("/api/ingredients")
async def ingredients(db: AsyncIOMotorClient = Depends(get_database)):
    ingredients : List[Ingredient] = []
    ingredientsCursor = db['ingredients']['ingredients'].find()
    async for row in ingredientsCursor:
        ingredients.append(Ingredient(**row))
    return ingredients