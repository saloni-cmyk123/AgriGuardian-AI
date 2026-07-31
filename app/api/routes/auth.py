from fastapi import APIRouter, Depends, status
from app.models.user import UserCreate, UserLogin, Token, UserResponse
from app.models.common import APIResponse
from app.services.auth_service import AuthService
from app.utils.security import get_current_user

router = APIRouter(prefix="/auth", tags=["Authentication"])


@router.post(
    "/register",
    response_model=APIResponse[Token],
    status_code=status.HTTP_201_CREATED,
    summary="Register a new user",
    description="Registers a new user (Farmer, Agronomist, or Admin) and returns a JWT access token.",
)
async def register(user_in: UserCreate) -> APIResponse[Token]:
    """
    Register a new user in the system and issue a JWT access token.
    """
    token_data = await AuthService.register_user(user_in)
    return APIResponse(
        success=True,
        message="User registered successfully",
        data=token_data,
    )


@router.post(
    "/login",
    response_model=APIResponse[Token],
    summary="User Login",
    description="Authenticates user credentials and issues a JWT access token.",
)
async def login(login_in: UserLogin) -> APIResponse[Token]:
    """
    Authenticate user credentials via email and password, returning JWT access token.
    """
    token_data = await AuthService.login_user(login_in)
    return APIResponse(
        success=True,
        message="Login successful",
        data=token_data,
    )


@router.get(
    "/me",
    response_model=APIResponse[UserResponse],
    summary="Get Current User Profile",
    description="Retrieves the current authenticated user profile details from the JWT token context.",
)
async def get_current_user_profile(
    current_user: dict = Depends(get_current_user),
) -> APIResponse[UserResponse]:
    """
    Retrieve current user profile using JWT token dependency injection.
    """
    user_resp = UserResponse(
        id=str(current_user["_id"]),
        full_name=current_user["full_name"],
        email=current_user["email"],
        phone_number=current_user.get("phone_number"),
        role=current_user["role"],
        language_preference=current_user.get("language_preference", "en"),
        state=current_user.get("state", ""),
        district=current_user.get("district", ""),
        created_at=current_user["created_at"],
    )
    return APIResponse(
        success=True,
        message="User profile retrieved successfully",
        data=user_resp,
    )
