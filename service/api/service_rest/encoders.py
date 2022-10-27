from common.json import ModelEncoder
from .models import AutomobileVO, Technician, Service


class VinVOEncoder(ModelEncoder):
    model = AutomobileVO
    properties = ["vin", "import_href", "id"]


class TechnicianEncoder(ModelEncoder):
    model = Technician
    properties = ["name", "employee_number", "id"]


class ServiceListEncoder(ModelEncoder):
    model = model = Service
    properties = [
        "customer_name",
        "service_date",
        "service_time",
        "reason",
        "is_vip",
        "is_finished",
        "technician",
        "vin",
        "id",
    ]

    encoders = {
        "technician": TechnicianEncoder(),
    }


class ServiceDetailEncoder(ModelEncoder):
    model = Service
    properties = [
        "customer_name",
        "service_date",
        "service_time",
        "reason",
        "is_vip",
        "is_finished",
        "technician",
        "vin",
    ]

    encoders = {
        "technician": TechnicianEncoder(),
    }
