from django.shortcuts import render
from django.views.generic import TemplateView
from django.views import View
# Create your views here.


class login(View):
    template_name = 'auth/login.html'

    def get(self, request):
        return render(request, self.template_name)

    def post(self, request):
        email_check = request.POST['email']
        password = request.POST['password']
        return render(request, self.template_name)

    