from django.core.exceptions import ValidationError
from api.user_auth.forms import RegistrationForm
from api.user_auth.services.jwt_service import JWTService
from django.conf import settings
from api.user_auth.user_dto.user_dto import UserDTO
from api.models import Tokens

class UserService:
    @staticmethod
    def register_user(data: dict) -> dict:
        form = RegistrationForm(data)
        if form.is_valid():
            user = form.save()
            payload = {
                "iss": settings.JWT_ISSUER,
                "aud": settings.JWT_AUDIENCE,
                "sub": user.user_id,
            }
            tokens = JWTService.generate_tokens(payload)
            user_dto = UserDTO(user)
            Tokens.objects.update_or_create(
                user=user,
                defaults={'refresh_token': tokens['refresh_token']}
            )
            return {
                "user": user_dto,
                "tokens": tokens
            }
        else:
            raise ValidationError(form.errors)
