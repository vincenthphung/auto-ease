from django.db import models
# from django.url import reverse

class AutomobileVO(models.Model):
  vin = models.CharField(max_length=17, unique=True)

  def __str__(self):
    return self.vin


class Technician(models.Model):
  name = models.CharField(max_length=100)
  employee_id = models.PositiveSmallIntegerField(unique=True)

  def __str__(self):
    return f"{self.name} - ({self.employee_id})"


class Service(models.Model):
  vin = models.CharField(max_length=17)
  customer_name = models.CharField(max_length=100)
  service_date = models.DateField()
  service_time = models.TimeField()
  reason = models.TextField()
  technician = models.ForeignKey(Technician, related_name="appointments", on_delete=models.PROTECT)

  def __str__(self):
    return f"{self.vin} - {self.customer_name} - {self.reason}"
