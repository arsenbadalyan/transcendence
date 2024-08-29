import json
from typing import Dict, Any
from typing import Dict, Any
from django.views import View
from .forms import RegistrationForm
from django.http import HttpRequest, HttpResponse, JsonResponse
from django.views.decorators.csrf import csrf_exempt
from django.utils.decorators import method_decorator

# Create your views here.
@method_decorator(csrf_exempt, name='dispatch')
class RegistrationView(View):
    def post(self, request: HttpRequest, *args: Any, **kwargs: Any) -> JsonResponse:
        try:
            data: Dict[str, Any] = json.loads(request.body)
        except json.JSONDecodeError:
            return JsonResponse({'error': 'Invalid JSON'}, status=400)
        print (data)
        form = RegistrationForm(data)
        if form.is_valid():
            form.save()
            return JsonResponse({'message': 'User registered successfully'}, status=201)
        else:
            return JsonResponse(form.errors, status=400)
