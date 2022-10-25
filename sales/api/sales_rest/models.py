from django.db import models
from django.urls import reverse

# Create your models here.
class AutomobileVO(models.Model):
    import_href = models.CharField(max_length=200, unique=True)
    vin = models.CharField(max_length=50)
    year = models.PositiveSmallIntegerField()
    sold = models.BooleanField(default=False)

    def is_sold(self):
        self.sold = True
        self.save()


class SalesPerson(models.Model):
    name = models.CharField(max_length=100)
    employee_id = models.CharField(max_length=50)

    def __str__(self):
        return self.name

    def get_api_url(self):
        return reverse('api_show_salesperson', kwargs={'pk': self.pk})


class PotentialCustomer(models.Model):
    name = models.CharField(max_length=100)
    address = models.CharField(max_length=200)
    phone = models.CharField(max_length=20)

    def __str__(self):
        return self.name
    
    def get_api_url(self):
        return reverse('api_show_potentialcustomer', kwargs={'pk': self.pk})


class SalesHistory(models.Model):
    price = models.PositiveIntegerField()
    sales_person = models.ForeignKey(
        SalesPerson,
        related_name="sales_history",
        on_delete=models.PROTECT
    )
    customer = models.ForeignKey(
        PotentialCustomer,
        related_name="sales_history",
        on_delete=models.PROTECT
    )
    automobile = models.ForeignKey(
        AutomobileVO,
        related_name="sales_history",
        on_delete=models.PROTECT
    )

    def __str__(self):
        return f"Sale history for {self.vin}"

    def get_api_url(self):
        return reverse('api_show_saleshistory', kwargs={'pk': self.pk})