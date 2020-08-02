from motor.motor_asyncio import AsyncIOMotorClient
from config import MONGO_URI

class DataBase:
    client: AsyncIOMotorClient = None

db = DataBase()

async def get_database() -> AsyncIOMotorClient:
    return db.client

async def connect_to_mongo():
    db.client = AsyncIOMotorClient(str(MONGO_URI))

async def close_mongo_connection():
    db.client.close()