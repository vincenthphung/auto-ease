import json

from django.http import JsonResponse
from django.shortcuts import get_object_or_404
from django.views.decorators.http import require_http_methods

from .encoders import (
    AutomobileVOEncoder,
    SalesPersonEncoder,
    PotentialCustomerEncoder,
    SalesHistoryEncoder,
)
from .models import AutomobileVO, SalesPerson, PotentialCustomer, SalesHistory


# Create your views here.
@require_http_methods(["GET"])
def api_sales_history_by_person(request, employee_id):
    sales_person = get_object_or_404(SalesPerson, employee_id=employee_id)
    sales = SalesHistory.objects.filter(sales_person=sales_person)
    return JsonResponse(
        {"sales": list(sales)},
        encoder=SalesHistoryEncoder,
        safe=False,
    )


@require_http_methods(["GET"])
def api_list_automobilesvo(request):
    automobiles = AutomobileVO.objects.filter(sold=False)
    return JsonResponse(
        {"automobiles": automobiles},
        encoder=AutomobileVOEncoder
    )


@require_http_methods(["GET", "POST"])
def api_create_salesperson(request):
    if request.method == "GET":
        sales_people = SalesPerson.objects.all()
        return JsonResponse(
            {"sales_people": sales_people},
            encoder=SalesPersonEncoder,
        )
    else:
        content = json.loads(request.body)
        sales_person = SalesPerson.objects.create(**content)
        return JsonResponse(
            sales_person,
            encoder=SalesPersonEncoder,
            safe=False,
        )


@require_http_methods(["GET", "POST"])
def api_create_potentialcustomer(request):
    if request.method == "GET":
        customers = PotentialCustomer.objects.all()
        return JsonResponse(
            {"customers": customers},
            encoder=PotentialCustomerEncoder,
        )
    else:
        content = json.loads(request.body)
        customer = PotentialCustomer.objects.create(**content)
        return JsonResponse(
            customer,
            encoder=PotentialCustomerEncoder,
            safe=False,
        )


@require_http_methods(["GET"])
def api_show_potentialcustomer(request, pk):
    customer = PotentialCustomer.objects.get(id=pk)
    return JsonResponse(
        customer,
        encoder=PotentialCustomerEncoder,
        safe=False
    )


@require_http_methods(["GET", "POST"])
def api_list_sales(request):
    if request.method == "GET":
        sales = SalesHistory.objects.all()
        return JsonResponse(
            {"sales": sales},
            encoder=SalesHistoryEncoder,
        )
    else:
        try:
            content = json.loads(request.body)

            vin_key = content["automobile"]
            automobile = AutomobileVO.objects.get(vin=vin_key)
            content["automobile"] = automobile

            customer_id = content["customer"]
            customer = PotentialCustomer.objects.get(id=customer_id)
            content["customer"] = customer

            salesperson_id = content["sales_person"]
            sales_person = SalesPerson.objects.get(id=salesperson_id)
            content["sales_person"] = sales_person

            sale = SalesHistory.objects.create(**content)
            automobile.is_sold()
            return JsonResponse(
                sale,
                encoder=SalesHistoryEncoder,
                safe=False,
            )
        except AutomobileVO.DoesNotExist:
            return JsonResponse(
                {"message": "Invalid automobile VIN"},
                status=400,
            )


@require_http_methods(["GET", "DELETE", "PUT"])
def api_show_saleshistory(request, pk):  # show details
    try:
        sale = SalesHistory.objects.get(id=pk)
    except SalesHistory.DoesNotExist:
        return JsonResponse({"message": "Does not exist."}, status=404)

    if request.method == "GET":
        return JsonResponse(
            sale,
            encoder=SalesHistoryEncoder,
            safe=False
        )
    elif request.method == "DELETE":
        sale.delete()
        return JsonResponse(
            sale,
            encoder=SalesHistoryEncoder,
            safe=False,
        )
    else:
        content = json.loads(request.body)
        props = ["sales_person", "automobile", "customer", "price"]
        for prop in props:
            if prop in content:
                setattr(sale, prop, content[prop])
        sale.save()
        return JsonResponse(
            sale,
            encoder=SalesHistoryEncoder,
            safe=False,
        )


@require_http_methods(["GET"])
def api_show_salesperson(request, pk):  # for a specific sales person
    try:
        sales = SalesHistory.objects.filter(sales_person=pk)
        return JsonResponse(
            {"sales": sales},
            encoder=SalesHistoryEncoder,
            safe=False
        )
    except SalesHistory.DoesNotExist:
        return JsonResponse({"message": "Does not exist."}, status=404)
