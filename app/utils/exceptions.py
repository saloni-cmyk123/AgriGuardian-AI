from fastapi import Request, status
from fastapi.responses import JSONResponse
import logging

logger = logging.getLogger("agriguardian.exceptions")

class AgriGuardianException(Exception):
    def __init__(self, message: str, status_code: int = status.HTTP_400_BAD_REQUEST, details: dict = None):
        self.message = message
        self.status_code = status_code
        self.details = details or {}

class ResourceNotFoundException(AgriGuardianException):
    def __init__(self, resource_name: str, resource_id: str):
        super().__init__(
            message=f"{resource_name} with ID {resource_id} was not found.",
            status_code=status.HTTP_404_NOT_FOUND
        )

class AuthenticationException(AgriGuardianException):
    def __init__(self, message: str = "Invalid credentials or token expired"):
        super().__init__(
            message=message,
            status_code=status.HTTP_401_UNAUTHORIZED
        )

class PermissionDeniedException(AgriGuardianException):
    def __init__(self, message: str = "Insufficient permissions to perform action"):
        super().__init__(
            message=message,
            status_code=status.HTTP_403_FORBIDDEN
        )

async def agriguardian_exception_handler(request: Request, exc: AgriGuardianException):
    logger.error(f"Custom Exception caught [{exc.status_code}]: {exc.message}")
    return JSONResponse(
        status_code=exc.status_code,
        content={
            "success": False,
            "error": exc.message,
            "details": exc.details
        }
    )

async def generic_exception_handler(request: Request, exc: Exception):
    logger.error(f"Unhandled Exception caught: {str(exc)}", exc_info=True)
    return JSONResponse(
        status_code=status.HTTP_500_INTERNAL_SERVER_ERROR,
        content={
            "success": False,
            "error": "An internal server error occurred. Please try again later.",
            "details": {"exception": str(exc)}
        }
    )
