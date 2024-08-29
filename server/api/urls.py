from django.urls import path, include
from . import views

urlpatterns = [
    path('auth/', include('api.user_auth.urls')),
]
