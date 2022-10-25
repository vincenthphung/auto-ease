from django.urls import path
from .views import list_vos

urlpatterns = [
    path("automobiles/", list_vos, name="list_vos"),
]
