# urls.py
from django.urls import path
from .views import SignUpView
from .views import LoginView

urlpatterns = [
    path('api/signup/', SignUpView.as_view(), name='signup'),
    path('api/login/', LoginView.as_view(), name='login'),
]
