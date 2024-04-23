from django.urls import path
from . import views

urlpatterns=[
    path('',views.index,name='index'),
    path('legalprivacy',views.legalprivacy,name='legalprivacy'),
    path('termsofService',views.termsofService,name='termsofService')
]