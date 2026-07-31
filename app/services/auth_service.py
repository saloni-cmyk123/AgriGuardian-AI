from app.database.mongodb import get_database
from app.models.user import UserCreate, UserLogin, UserModel, UserResponse, Token
from app.utils.security import hash_password, verify_password, create_access_token
from app.utils.exceptions import AgriGuardianException, AuthenticationException
from bson import ObjectId
from datetime import datetime, timezone

class AuthService:
    @staticmethod
    async def register_user(user_in: UserCreate) -> Token:
        db = get_database()
        
        # Check if user already exists
        existing_user = await db.users.find_one({"email": user_in.email})
        if existing_user:
            raise AgriGuardianException("A user with this email address already exists.", status_code=400)

        hashed_pwd = hash_password(user_in.password)
        now = datetime.now(timezone.utc)

        user_doc = {
            "full_name": user_in.full_name,
            "email": user_in.email,
            "hashed_password": hashed_pwd,
            "phone_number": user_in.phone_number,
            "role": user_in.role,
            "language_preference": user_in.language_preference,
            "state": user_in.state,
            "district": user_in.district,
            "created_at": now,
            "updated_at": now
        }

        result = await db.users.insert_one(user_doc)
        user_id = str(result.inserted_id)

        user_resp = UserResponse(
            id=user_id,
            full_name=user_in.full_name,
            email=user_in.email,
            phone_number=user_in.phone_number,
            role=user_in.role,
            language_preference=user_in.language_preference,
            state=user_in.state,
            district=user_in.district,
            created_at=now
        )

        token_str = create_access_token({"sub": user_id, "role": user_in.role})
        return Token(access_token=token_str, user=user_resp)

    @staticmethod
    async def login_user(login_in: UserLogin) -> Token:
        db = get_database()
        user = await db.users.find_one({"email": login_in.email})
        
        if not user:
            raise AuthenticationException("Invalid email or password.")

        if not verify_password(login_in.password, user["hashed_password"]):
            raise AuthenticationException("Invalid email or password.")

        user_id = str(user["_id"])
        user_resp = UserResponse(
            id=user_id,
            full_name=user["full_name"],
            email=user["email"],
            phone_number=user.get("phone_number"),
            role=user["role"],
            language_preference=user.get("language_preference", "en"),
            state=user.get("state", ""),
            district=user.get("district", ""),
            created_at=user["created_at"]
        )

        token_str = create_access_token({"sub": user_id, "role": user["role"]})
        return Token(access_token=token_str, user=user_resp)
