import jwt
from django.conf import settings
from django.utils import timezone
from datetime import timedelta, datetime


class JWTService:
    @staticmethod
    def encode_jwt(payload: dict, secret: str, exp: timedelta) -> str:
        expiration = datetime.now() + exp
        payload.update({
            "iat": datetime.now().timestamp(),
            "exp": expiration.timestamp()
            })
        token = jwt.encode(payload, secret, algorithm=settings.JWT_ALGORITHM)
        return token

    @staticmethod
    def decode_jwt(token: str, secret: str) -> dict:
        try:
            payload = jwt.decode(token, secret, algorithms=settings.JWT_ALGORITHM)
            payload['iat'] = timezone.datetime.fromtimestamp(payload['iat'])
            payload['exp'] = timezone.datetime.fromtimestamp(payload['exp'])
            return payload
        except jwt.ExpiredSignatureError:
            raise jwt.ExpiredSignatureError("Token has expired.")
        except jwt.InvalidTokenError:
            raise jwt.InvalidTokenError("Invalid token.")

    @staticmethod
    def generate_tokens(payload: dict) -> dict:
        access_token = JWTService.encode_jwt(payload, settings.ACCESS_TOKEN_SECRET, settings.ACCESS_TOKEN_EXP)
        refresh_token = JWTService.encode_jwt(payload, settings.REFRESH_TOKEN_SECRET, settings.REFRESH_TOKEN_EXP)
        return {
            "access_token": access_token,
            "refresh_token": refresh_token,
        }
