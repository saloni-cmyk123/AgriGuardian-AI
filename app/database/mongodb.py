import logging
from motor.motor_asyncio import AsyncIOMotorClient, AsyncIOMotorDatabase
from app.config.settings import settings

logger = logging.getLogger("agriguardian.database")

class MongoDBManager:
    client: AsyncIOMotorClient = None
    db: AsyncIOMotorDatabase = None

db_manager = MongoDBManager()

async def connect_to_mongo():
    logger.info(f"Connecting to MongoDB at {settings.MONGODB_URL}...")
    db_manager.client = AsyncIOMotorClient(
        settings.MONGODB_URL,
        serverSelectionTimeoutMS=5000
    )
    db_manager.db = db_manager.client[settings.MONGODB_DB_NAME]
    
    # Create indexes for optimal performance
    try:
        await db_manager.db.users.create_index("email", unique=True)
        await db_manager.db.farms.create_index("owner_id")
        await db_manager.db.crops.create_index("farm_id")
        await db_manager.db.disease_history.create_index("farm_id")
        await db_manager.db.chat_history.create_index([("user_id", 1), ("session_id", 1)])
        logger.info("MongoDB index verification complete.")
    except Exception as e:
        logger.warning(f"Could not verify MongoDB indexes: {e}")

    logger.info("Connected to MongoDB successfully.")

async def close_mongo_connection():
    if db_manager.client:
        logger.info("Closing MongoDB connection...")
        db_manager.client.close()
        logger.info("MongoDB connection closed.")

def get_database() -> AsyncIOMotorDatabase:
    if db_manager.db is None:
        raise RuntimeError("Database connection not initialized.")
    return db_manager.db
