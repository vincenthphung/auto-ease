import json
from django.views.decorators.http import require_http_methods
from django.http import JsonResponse
from .encoders import(
    AutomobileVOEncoder,
    SalesPersonEncoder,
    PotentialCustomerEncoder,
    SalesHistoryEncoder,
)
from .models import AutomobileVO, SalesPerson, PotentialCustomer, SalesHistory

# Create your views here.
import json
from django.views.decorators.http import require_http_methods
from django.http import JsonResponse
from .encoders import(
    SalesPersonEncoder,
    PotentialCustomerEncoder,
    SalesHistoryEncoder,
)
from .models import AutomobileVO, SalesPerson, PotentialCustomer, SalesHistory

# Create your views here.
@require_http_methods(["GET"])
def api_list_automoboilesvo(request):
    if request.method == "GET":
        automobiles = AutomobileVO.objects.filter(sold=False)
        return JsonResponse(
            {"automobiles": automobiles},
            encoder=AutomobileVOEncoder)


@require_http_methods(["GET", "POST"])
def api_create_salesperson(request):
    if request.method == "GET":
        sales_person = SalesPerson.objects.all()
        return JsonResponse(
            {"sales_people": sales_person},
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
    if request.method == "GET":
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

            sales = SalesHistory.objects.create(**content)
            return JsonResponse(
                sales,
                encoder=SalesHistoryEncoder,
                safe=False,
            )
        except AutomobileVO.DoesNotExist:
            return JsonResponse(
                {"message": "Not Valid"},
                status=400,
            )


@require_http_methods(["GET"])
def api_show_saleshistory(request, pk): # show details
    if request.method == "GET":
        try:
            sale = SalesHistory.objects.get(id=pk)
            return JsonResponse(
                sale,
                encoder=SalesHistoryEncoder,
                safe=False
            )
        except SalesHistory.DoesNotExist:
            return JsonResponse(
                {"message": "Doesn't exist."},
                status=400,
            )
    elif request.method == "DELETE":
        try:
            sale = SalesHistory.objects.get(id=pk)
            sale.delete()
            return JsonResponse(
                sale,
                encoder=SalesHistoryEncoder,
                safe=False,
            )
        except SalesHistory.DoesNotExist:
            return JsonResponse(
                {"message": "Doesn't exist."}
            )
    else:
        try:
            content = json.loads(request.body)
            sale = SalesHistory.objects.get(id=pk)

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
        except SalesHistory.DoesNotExist:
            return JsonResponse(
                {"message": "Doesn't exist."}
            )



@require_http_methods(["GET"])
def api_show_salesperson(request, pk): # for a specific sales person
    if request.method == "GET":
        try:
            sales_person = SalesHistory.objects.filter(sales_person=pk)
            return JsonResponse(
                sales_person,
                encoder=SalesHistoryEncoder,
                safe=False
            )
        except SalesHistory.DoesNotExist:
            response = JsonResponse({"message": "Does not exist"})
            response.status_code = 404
            return response

