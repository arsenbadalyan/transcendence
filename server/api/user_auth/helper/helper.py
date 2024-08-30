from typing import Dict, Any
from django.http import JsonResponse
from django.conf import settings

def set_refresh_token_cookie(response: JsonResponse, result: Dict[str, Any]) -> JsonResponse:
    refresh_token = result.get('tokens', {}).get('refresh_token')
    if refresh_token:
        max_age = int(settings.REFRESH_TOKEN_EXP.total_seconds())
        response.set_cookie(
            'refresh_token',
            refresh_token,
            max_age=max_age,
            httponly=True,
            secure=settings.SECURE_COOKIE,  # Ensure this is set to True in production
            samesite='Lax'
        )
    return response
