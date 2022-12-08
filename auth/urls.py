from django.urls import path
from .views import loginClass, signupClass


app_name = 'auth'
urlpatterns = [
    path('login/',loginClass.as_view(),name='login'),
    path('signup/',signupClass.as_view(),name='signup'),
]