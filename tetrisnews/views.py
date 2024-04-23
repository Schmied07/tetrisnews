from django.shortcuts import render
from django.http import HttpResponse
from django.template import loader

def  index(request):
    context={"message":"Acceuil"}
    template=loader.get_template("tetrisnews/index.html")
    return HttpResponse(template.render(context,request))

def  legalprivacy(request):
    context={"message":"privacy-policy"}
    template=loader.get_template("legal/privacy-policy.html")
    return HttpResponse(template.render(context,request))

def  termsofService(request):
    context={"message":"Terms of Service"}
    template=loader.get_template("legal/termsofService.html")
    return HttpResponse(template.render(context,request))