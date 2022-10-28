from django.urls import path
from .views import (list_appointments, show_appointment, list_techs, show_technician)

urlpatterns = [
    path("appointments/", list_appointments, name="list_appointments"),
    path("appointments/<str:vin>/", list_appointments,
         name="list_appointments_vin"),
    path("appointments/detail/<int:pk>/", show_appointment, name="show_appointment"),
    path("technicians/", list_techs, name="list_techs"),
    path("technicians/<int:pk>/", show_technician, name="show_technician")
]
