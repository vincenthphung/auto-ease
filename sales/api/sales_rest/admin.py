from django.contrib import admin

from .models import AutomobileVO, SalesPerson, PotentialCustomer, SalesHistory


@admin.register(AutomobileVO)
class AutomobileVOAdmin(admin.ModelAdmin):
    pass


@admin.register(SalesPerson)
class SalesPersonAdmin(admin.ModelAdmin):
    pass


@admin.register(PotentialCustomer)
class PotentialCustomerAdmin(admin.ModelAdmin):
    pass


@admin.register(SalesHistory)
class SaleHistoryAdmin(admin.ModelAdmin):
    pass

