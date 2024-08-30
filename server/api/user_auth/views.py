import json
from typing import Dict, Any
from typing import Dict, Any
from django.views import View
from django.conf import settings
from django.http import HttpRequest, JsonResponse
from django.core.exceptions import ValidationError
from django.views.decorators.csrf import csrf_exempt
from django.utils.decorators import method_decorator
from api.user_auth.services.user_service import UserService

# Create your views here.
@method_decorator(csrf_exempt, name='dispatch')
class RegistrationView(View):
    def post(self, request: HttpRequest, *args: Any, **kwargs: Any) -> JsonResponse:
        try:
            data: Dict[str, Any] = json.loads(request.body)
        except json.JSONDecodeError:
            return JsonResponse({'error': 'Invalid JSON'}, status=400)

        try:
            result = UserService.register_user(data)
            response = JsonResponse(result, status=201)
            refresh_token = result.get('tokens', {}).get('refresh_token')
            max_age = int(settings.REFRESH_TOKEN_EXP.total_seconds())
            response.set_cookie(
                'refreshToken',
                refresh_token,
                max_age=max_age,
                httponly=True,
                secure=settings.SECURE_COOKIE, # Ensure this is set to True in production
                samesite='Lax'
            )
            return response
        except ValidationError as e:
            return JsonResponse({'errors': e.message_dict}, status=400)
