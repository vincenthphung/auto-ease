import json

from django.http import JsonResponse
from django.views.decorators.http import require_http_methods

from .encoders import AppointmentEncoder, TechnicianEncoder
from .models import Appointment, Technician


@require_http_methods(["GET", "PUT", "DELETE"])
def api_show_appointment(request, pk):
    try:
        appointment = Appointment.objects.get(pk=pk)
    except Appointment.DoesNotExist:
        return JsonResponse({"message": "Appointment not found."}, status=404)

    if request.method == "GET":
        return JsonResponse(
            appointment,
            encoder=AppointmentEncoder,
            safe=False
        )
    elif request.method == "PUT":
        content = json.loads(request.body)
        for key, value in content.items():
            setattr(appointment, key, value)
        appointment.save()
        return JsonResponse(
            appointment,
            encoder=AppointmentEncoder,
            safe=False
        )
    elif request.method == "DELETE":
        appointment.delete()
        return JsonResponse(
            {"message": "Appointment deleted."},
            status=204
        )


@require_http_methods(["GET", "POST"])
def api_create_appointment(request):
    if request.method == "GET":
        appointments = Appointment.objects.all()
        return JsonResponse(
            {"appointments": appointments},
            encoder=AppointmentEncoder,
            safe=False,
        )
    else:
        content = json.loads(request.body)
        try:
            technician = Technician.objects.get(id=content["technician"])
            content["technician"] = technician
            appointment = Appointment.objects.create(**content)
            return JsonResponse(
                appointment,
                encoder=AppointmentEncoder,
                safe=False,
            )
        except Technician.DoesNotExist:
            return JsonResponse(
                {"message": "Technician not found."},
                status=400
            )


@require_http_methods(["GET", "POST"])
def api_create_technician(request):
    if request.method == "GET":
        technicians = Technician.objects.all()
        return JsonResponse(
            {"technicians": technicians},
            encoder=TechnicianEncoder,
            safe=False,
        )
    else:
        content = json.loads(request.body)
        technician = Technician.objects.create(**content)
        return JsonResponse(
            technician,
            encoder=TechnicianEncoder,
            safe=False,
        )


@require_http_methods(["GET"])
def api_show_technician(request, pk):
    try:
        technician = Technician.objects.get(pk=pk)
        return JsonResponse(
            technician,
            encoder=TechnicianEncoder,
            safe=False
        )
    except Technician.DoesNotExist:
        return JsonResponse(
            {"message": "Technician not found."},
            status=404
        )
