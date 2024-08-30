import json
from typing import Dict, Any
from django.views import View
from api.models import Users
from django.conf import settings
from django.http import HttpRequest, JsonResponse
from django.core.exceptions import ValidationError
from django.views.decorators.csrf import csrf_exempt
from django.utils.decorators import method_decorator
from api.user_auth.services.user_service import UserService
from api.user_auth.helper.helper import set_refresh_token_cookie

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
            return set_refresh_token_cookie(response, result)
        except ValidationError as e:
            return JsonResponse({'errors': e.message_dict}, status=400)

@method_decorator(csrf_exempt, name='dispatch')
class LoginView(View):
    def post(self, request: HttpRequest, *args: Any, **kwargs: Any) -> JsonResponse:
        try:
            data: Dict[str, Any] = json.loads(request.body)
        except json.JSONDecoderError:
            return JsonResponse({'error': 'Invalid JSON'}, status=400)

        try:
            result = UserService.login_user(data)
            response = JsonResponse(result, status=201)
            return set_refresh_token_cookie(response, result)
        except Users.DoesNotExist:
            return JsonResponse({'error': 'Invalid credentials'}, status=401)
        except ValidationError as e:
            return JsonResponse({'errors': e.message_dict}, status=400)
