from django.urls import path

from .views import (
  api_list_services,
  api_list_technicians,
  api_show_service,
  api_show_technician,
  )

urlpatterns = [
    path("services/", api_list_services, name="api_create_services"),
    path(
      "automobiles/<int:auto_vo_id>/services/",
      api_list_services,
      name="api_list_services",
    ),

    path(
      "services/<int:pk>/",
      api_show_service,
      name="api_show_service",
    ),

    path(
      "technicians/",
      api_list_technicians,
      name="api_list_technicians",
    ),

    path(
      "technicians/<int:pk>/",
      api_show_technician,
      name="api_list_technicians",
    ),

]

