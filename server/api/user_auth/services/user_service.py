from api.models import Tokens
from django.conf import settings
from api.models import Users
from django.utils import timezone
from django.core.exceptions import ValidationError
from api.user_auth.user_dto.user_dto import UserDTO
from api.user_auth.services.jwt_service import JWTService
from api.user_auth.forms import RegistrationForm, LoginForm

class UserService:
    @staticmethod
    def _generate_tokens_and_update(user: Users) -> dict:
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

    @staticmethod
    def register_user(data: dict) -> dict:
        form = RegistrationForm(data)
        if form.is_valid():
            user = form.save()
            return UserService._generate_tokens_and_update(user)
        else:
            raise ValidationError(form.errors)

    @staticmethod
    def login_user(data: dict) -> dict:
        form = LoginForm(data)
        if form.is_valid():
            user = Users.objects.get(username=data['username'])
            if user.check_password(data['password']):
                user.last_login = timezone.now()
                user.save()
                return UserService._generate_tokens_and_update(user)
            else:
                raise Users.DoesNotExist
        else:
            raise ValidationError(form.errors)

    @staticmethod
    def logout_user(refresh_token: str) -> None:
        try:
            token_instance = Tokens.objects.get(refresh_token=refresh_token)
            token_instance.delete()
        except Tokens.DoesNotExist:
            pass