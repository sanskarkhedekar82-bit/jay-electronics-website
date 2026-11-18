
from django.urls import path
from . import views

urlpatterns = [
    path('', views.home, name='home'),

    path(
        'submit-enquiry/',
        views.submit_enquiry,
        name='submit_enquiry'
    ),
]
