from common.json import ModelEncoder
from .models import AutomobileVO, SalesPerson, PotentialCustomer, SalesHistory


class AutomobileVOEncoder(ModelEncoder):
    model = AutomobileVO
    properties = ["import_href", "vin", "year", "id"]


class SalesPersonEncoder(ModelEncoder):
    model = SalesPerson
    properties = ["name", "employee_id", "id"]


class PotentialCustomerEncoder(ModelEncoder):
    model = PotentialCustomer
    properties = ["name", "address", "phone", "id"]


class SalesHistoryEncoder(ModelEncoder):
    model = SalesHistory
    properties = ["price", "sales_person", "customer", "automobile", "id"]
    encoders = {
        "sales_person": SalesPersonEncoder(),
        "customer": PotentialCustomerEncoder(),
        "automobile": AutomobileVOEncoder(),
    }