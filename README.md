# CarCar

Team:

* Vincent Phung  - Services microservice
* Christie Sun - Sales microservice

## Diagram

"excalidraw_linK"


## Inventory microservice
- it is the bounded contexts
- Manufacturers, vehicle models and automobiles are the Entities
- Has 3 models: Manufacturer, VehicleModel, Automobile

  Allows you to:
  -view the manufacturers list
  -add a new manufacturers
  -view a list of vehicle models information(name, manufacturer)
  -view a list of automobiles information(vin, color, year)
  -add a new automobile in inventory form
  -add a new vehicle model


## Service Microservice To do's
- Technician creation form
- Service appointment form
- Show list of scheduled appointments
- Create a search page that allows customers to search for services

- Create navbar links:
  - Create technician form
  - Service
  - List of services
  - List of past services filter by VIN

----------------------------------------------------------------
## Sales microservice
- Track the sales information from inventory
- Manufacturers, models and cars are the Value Objects
- Has 4 models: AutomobileVO, SalesPerson, PotentialCustomer, and SaleHistory.
  *AutomobileVO is a data which polled from the Automobile model within the Inventory Microservice

  Allows you to:
  -add a new sales person name and id into the system
  -add a new potential customer's  name, address, and phone number
  -once a sale is completed, record(using drop down) customer's name, sales person, sale price, and the automobile
  -once many sales is completed, the system is able to list all the sales history including
   the vin, name of sales person, sales person's id, potential customer's name, and the sale price
  -once many sales is completed, the system is able to access information of a specific sales
  -once an automobile is sold, remove its vin from inventory

- React Nav bar links:
  a sales person form
  a customer form
  a new sale record form
  a specific sales person history page
  a list of sales page
