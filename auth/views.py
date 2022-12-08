from django.shortcuts import render
from django.http import JsonResponse
from django.contrib.auth import login as auth_login
from django.contrib.auth import authenticate, get_user_model
from django.views import View
import logging
import json

# configure logging for File 
logger = logging.getLogger('django')

User = get_user_model()
# Create your views here.


class loginClass(View):
    template_name = 'auth/login.html'

    def get(self, request):
        return render(request, self.template_name)

    def post(self, request):
        recived_data = request.POST
        email_data = recived_data['email']
        password_data = recived_data['password']
        try:
            user_data = User.objects.get(email=email_data)
            logger.info('Get User Data')
        except User.DoesNotExist:
            logger.warning('Return Response of Error becouse User not  Find.')
            return JsonResponse({'status':'error','errorMsg':'EmailID / Password Incorrect'})
        
        user = authenticate(request, username=user_data, password=password_data)
        if user is not None:
            auth_login(request, user)
            logger.info('User Login Successfully')
            return JsonResponse({'status':'success','user':user.username})
        else:
            logger.warning('Send Response of User has no Valid Permissions')
            return JsonResponse({'status':'error','errorMsg':'User has no valid Permissions'})
            
        

class signupClass(View):
    template_name = 'auth/login.html'

    def get(self, request):
        return render(request, self.template_name)

    def post(self, request):
        recived_data = request.POST
        email_data = recived_data['email']
        name_data = recived_data['name']
        password_data = recived_data['password']

        User.objects.create_user(
            name_data,
            email_data,
            password_data
        )
        logger.info('New User Created')
        user = authenticate(request, username=name_data, password=password_data)
        print(user)
        if user is not None:
            auth_login(request, user)
            logger.info('User Login from Signup Page Successfully')
            return JsonResponse({'status':'success','user':user.username})
        
        else:
            logger.warning('send response of User has no Valid Permissions')
            return JsonResponse({'status':'error','errorMsg':'User has no valid Permissions'})


    