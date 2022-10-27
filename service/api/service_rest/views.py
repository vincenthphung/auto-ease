from django.shortcuts import render
from django.http import JsonResponse
from django.views.decorators.http import require_http_methods
import json

from .encoders import(
    TechnicianEncoder,
    ServiceListEncoder,
    ServiceDetailEncoder,
)

from .models import AutomobileVO, Technician, Service


@require_http_methods(["GET", "POST"])
def api_list_services(request, auto_vo_id=None):
    if request.method == "GET":
        if auto_vo_id is not None:
            service_list = Service.objects.filter(vin=auto_vo_id)
        else:
            service_list = Service.objects.all()

        return JsonResponse(
            {"services": service_list},
            encoder=ServiceListEncoder,
        )
    else:
        content = json.loads(request.body)

        technician = Technician.objects.get(id=content["technician"])
        content["technician"] = technician

        try:
            vin = AutomobileVO.objects.get(vin=content['vin'])
            content["is_vip"] = True

        except AutomobileVO.DoesNotExist:
            content["is_vip"] = False

        service = Service.objects.create(**content)
        return JsonResponse(
            service,
            encoder=ServiceListEncoder,
            safe=False,
        )


@require_http_methods(["DELETE", "GET", "PUT"])
def api_show_service(request, pk):
    if request.method == "GET":
        service = Service.objects.get(id=pk)
        return JsonResponse(
            service,
            encoder=ServiceDetailEncoder,
            safe=False,
        )
    elif request.method == "DELETE":
        count, _ = Service.objects.filter(id=pk).delete()
        return JsonResponse(
            {"deleted": count > 0}
        )

    else:
        content = json.loads(request.body)
        Service.objects.filter(id=pk).update(**content)
        customer = Service.objects.get(id=pk)
        return JsonResponse(
            customer,
            encoder=ServiceDetailEncoder,
            safe=False
        )


@require_http_methods(["GET", "POST"])
def api_list_technicians(request):
    if request.method == "GET":
        technician_list = Technician.objects.all()
        return JsonResponse(
            {"technicians": technician_list},
            encoder=TechnicianEncoder,
        )

    else:
        try:
            content = json.loads(request.body)
            print(content)
            technician = Technician.objects.create(**content)
            return JsonResponse(
                technician,
                encoder=TechnicianEncoder,
                safe=False,
            )

        except:
            response = JsonResponse(
                {"message": "Could not create the technician"},
            )
            response.status_code = 400
            return response


@require_http_methods(["DELETE", "GET", "PUT"])
def api_show_technician(request, pk):
    if request.method == "GET":
        technician = Technician.objects.get(id=pk)
        return JsonResponse(
            technician,
            encoder=TechnicianEncoder,
            safe=False,
        )
    elif request.method == "DELETE":
        count, _ = Technician.objects.filter(id=pk).delete()
        return JsonResponse(
            {"deleted": count > 0}
        )

    else:
        content = json.loads(request.body)
        Technician.objects.filter(id=pk).update(**content)
        customer = Technician.objects.get(id=pk)
        return JsonResponse(
            technician,
            encoder=TechnicianEncoder,
            safe=False
        )

