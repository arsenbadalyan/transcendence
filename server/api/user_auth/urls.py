from django.urls import path
from api.user_auth.views import RegistrationView

urlpatterns = [
    path('registration/', RegistrationView.as_view(), name='registration'),
]
