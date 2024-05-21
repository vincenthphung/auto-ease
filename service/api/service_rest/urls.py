from django.urls import path
from .views import (
    api_show_technician,
    api_show_appointment,
    api_create_technician,
    api_create_appointment,
)

urlpatterns = [
    path("technicians/<int:pk>/", api_show_technician, name="show_technician"),
    path("appointments/<int:pk>/", api_show_appointment, name="show_appointment"),
    path("technicians/", api_create_technician, name="create_technician"),
    path("appointments/", api_create_appointment, name="create_appointment"),
]
