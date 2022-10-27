from django.contrib import admin
from .models import Service, Technician
# Register your models here.

@admin.register(Service)
class ServiceAdmin(admin.ModelAdmin):
    pass

@admin.register(Technician)
class TechnicianAdmin(admin.ModelAdmin):
    pass
