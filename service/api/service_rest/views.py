from django.shortcuts import render
from django.views.decorators.http import require_http_methods
from django.http import JsonResponse
import json
from common.json import ModelEncoder
from .models import AutomobileVO, Technician, ServiceAppointment

class AutomobileVOEncoder(ModelEncoder):
    model = AutomobileVO
    properties = ["vin"]

class TechnicianEncoder(ModelEncoder):
    model = Technician
    properties = ["name", "employee_id"]


class ServiceAppointmentEncoder(ModelEncoder):
    model = ServiceAppointment
    properties = ["vin", "customer", "vip", "appointment_time", "reason", "completed", "technician"]

    encoders = {"technician": TechnicianEncoder()}


@require_http_methods(["GET"])
def list_vos(request):
    vos = AutomobileVO.objects.all()
    return JsonResponse(
        {"automobiles": vos},
        encoder=AutomobileVOEncoder,
        safe=False,
    )


@require_http_methods(["GET", "POST"])
def list_create_technicians(request):
    if request.method == "GET":
        technicians = Technician.objects.all()
        return JsonResponse(
            {"technicians": technicians},
            encoder = TechnicianEncoder,
            safe=False
        )
    elif request.method == "POST":
        data = json.loads(request.body)
        technician = Technician.objects.create(**data)
        return JsonResponse(
            {"technicians": technician},
            encoder=TechnicianEncoder,
            safe=False
        )


@require_http_methods(["GET", "POST"])
def list_create_appointments(request):
    if request.method == "GET":
        appointments = ServiceAppointment.objects.all()
        for appointment in appointments:
            if appointment.vin in AutomobileVO.objects.values_list("vin", flat=True):
                appointment.vip = True
            else:
                appointment.vip = False
        return JsonResponse(
            {"appointments": appointment},
            encoder=ServiceAppointmentEncoder,
            safe=False
        )
    elif request.method == "POST":
        data = json.loads(request.body)
        try:
            technician = Technician.objects.get(employee_id=data["technician"])
            data["technician"] = technician
            appointment = ServiceAppointment.objects.create(**data)
            return JsonResponse(
                {"appointments": appointment},
                encoder=ServiceAppointmentEncoder,
                safe=False
            )
        except Technician.DoesNotExist:
            return JsonResponse({"Error": "Technician does not exist"}, status=404)


@require_http_methods(["PUT", "DELETE"])
def update_appointments(request, pk):
    if request.method == "PUT":
        try:
            appointment = ServiceAppointment.objects.get(id=pk)
            appointment.completed = True
            appointment.save()
            return JsonResponse(
                {"appointments": appointment},
                encoder=ServiceAppointmentEncoder,
                safe=False
            )
        except ServiceAppointment.DoesNotExist:
            return JsonResponse({"Error": "Appointment does not exist"}, status=404)
        
    if request.method == "DELETE":
        appointment = ServiceAppointment.objects.get(id=pk)
        appointment.delete()
        return JsonResponse({"Success": "Appointment deleted"})
