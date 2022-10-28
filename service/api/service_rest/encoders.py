from common.json import ModelEncoder
from .models import Appointment, Technician


class TechnicianEncoder(ModelEncoder):
    model = Technician
    properties = ["name", "id", "employee_number"]


class AppointmentEncoder(ModelEncoder):
    model = Appointment
    properties = [
        "id",
        "vin",
        "owner",
        "date_time",
        "technician",
        "reason",
        "vip",
        "finished"
    ]

    encoders = {
        "technician": TechnicianEncoder(),
    }
