from django.db import models
from django.urls import reverse


class AutomobileVO(models.Model):
    vin = models.CharField(max_length=50)
    import_href = models.CharField(max_length=200, unique=True, null=True)


class Technician(models.Model):
    name = models.CharField(max_length=100)
    employee_number =models.SmallIntegerField()


class Service(models.Model):
    customer_name = models.CharField(max_length=100)
    service_date = models.DateField(null=True)
    service_time = models.TimeField(null=True)
    reason = models.CharField(max_length=500)
    is_vip = models.BooleanField(default=False)
    is_finished = models.BooleanField(default=False)
    vin = models.CharField(max_length=50, null=True)

    technician = models.ForeignKey(
        Technician,
        related_name="service",
        on_delete=models.PROTECT,
    )

    def __str__(self):
        return self.customer_name

    def get_api_url(self):
        return reverse("api_show_service", kwargs={"pk": self.pk})



