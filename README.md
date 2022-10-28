# CarCar

About:

* Car Dealership Management

Team:
- Vincent -Services
- Christie -Sales

## Design
CarCar is an application with three microservices Inventory, Sales and Services used for managing feature of an dealership. The main aggregate root would be Inventory because the aggregates of Services and Sales rely on data that is stored in Inventory.

Below is a diagram that illustrate the relationships between these services with the frontend and backend of the application. The backend of this application was developed using a Django framework and React for the frontend of the application.

<img src="./img/CarCarDesign.png">



## Getting Started
Please following directions to start the application:
1. Fork and clone from the repository
2. Open a terminal and navigate to the directory where this application will be stored.
3. Use `code .` on to open the application in Visual Studio Code.
4. This application require using Docker, you'll need to execute the following commands in the terminal:

        docker volume create beta-data
        docker-compose build
        docker-compose up

5. To view the application, go to http://localhost:3000.

6. Feel free the browse the site to see data you will need to create the data using the forms in nav bar.

# Inventory microservice

- it is the bounded contexts
- Manufacturers, vehicle models and automobiles are the Entities
- Inventory can be tracked in these 3 models: Manufacturer, VehicleModel, Automobile

  * Allows you to:

  - view the manufacturers list
  - add a new manufacturers
  - view a list of vehicle models information(name, manufacturer)
  - view a list of automobiles information(vin, color, year)
  - add a new automobile in inventory form
  - add a new vehicle model

- RESTful APIs Endpoints for Automobile:
  * "GET" List automobiles: "http://localhost:8100/api/automobiles/"
  * "POST" Create an automobiles: "http://localhost:8100/api/automobiles/"
  * "GET" Get a specific automobile: "http://localhost:8100/api/automobiles/:vin/"
  * "PUT" Upadate a specific automobile: "http://localhost:8100/api/automobiles/:vin/"
  * "DEL" Delete a specific automobile: "	http://localhost:8100/api/automobiles/:vin/"

- RESTful APIs Endpoints for VehicleModel:
  * "GET" List vehicle models: "http://localhost:8100/api/models/",
  * "POST" Create a vehicle model: "http://localhost:8100/api/models/"
  * "GET" Get a specific vehicle model: "http://localhost:8100/api/models/:id/"
  * "PUT" Update a specific vehicle model: "http://localhost:8100/api/models/:id/"
  * "DEL" Delete a specific vehicle model: "http://localhost:8100/api/models/:id/"

- RESTful APIs Endpoints for Manufacturer:
  * "GET" List manufacturers: "http://localhost:8100/api/manufacturers/"
  * "POST" Create a manufacturer: "http://localhost:8100/api/manufacturers/"
  * "GET" Get a specific manufacturer: "http://localhost:8100/api/manufacturers/:id/"
  * "PUT" Update a manufacturer: "http://localhost:8100/api/manufacturers/:id/"
  * "DEL" Delete a specific manufacturer: "http://localhost:8100/api/manufacturers/:id/"


# Service microservice
 Technician creation form:
  * tech's name (char field)
  * employee id (small positive integer field)
 Service appointment form:
  * VIN (positive integer field)
  * customer name (char field)
  * date/time of the appointment (date/time field)
  * assigned technician (foreign key)
  * reason for the service appointment (text field)
 Show list of scheduled appointments:
  * VIN, customer name, date/time of appt, assigned technician, reason for service
  * If there's a VIN, the car was purchased from the dealership. Mark as VIP
  * Cancel (delete) button for each appointment
  * If appointment has finished, show a finished status
  * If appt is canceled or finished, it should no longer show up in the list of appointments
 Create a page that allows someone to search for a list of past service appoints by VIN. List should have:
  - Customer name, date and time of the appointment, the assigned technician, and reason for service

- Create navbar links:
  * Create technician form
  * Service appointment form
  * List of appointments
  * List of past service appointments filterable by VIN

## Sales microservice
- Localhost for login: "http://localhost:8090/admin"
- It is the bounded context within the domain
- Track the sales information from inventory
- Has 4 models: AutomobileVO, SalesPerson, PotentialCustomer, and SalesHistory.
  *AutomobileVO is a data which polled from the Automobile model within the Inventory Microservice
- AutomobileVO, SalesPerson, PotentialCustomer, and SalesHistory are the Entities


  * Allows users to:

  - add a new sales person name and id into the system
  - add a new potential customer's  name, address, and phone number
  - once a sale is completed, record(using drop down) customer's name, sales person, sale price, and the automobile
  - once many sales is completed, the system is able to list all the sales history including the vin, name of sales person, sales person's id, potential customer's name and the sale price
  - once many sales is completed, the system is able to access information of a specific sales
  - once an automobile is sold, remove its vin from inventory

- Nav bar links (Front-end)
  * a sales person form
  * a customer form
  * a new sale record form
  * a specific sales person history page
  * a list of sales page

- RESTful APIs Endpoints for Sales microservice:
  - For sales person:
    * "GET" List sales people: "http://localhost:8090/api/sales/person/"
    * "GET" Get a specific sales person: "http://localhost:8090/api/sales/person/<int:pk>/"
    * "GET" Get a sales record from a specific sales person: "http://localhost:8090/api/sales/person/<int:employee_id>/sales/"
    * "POST" Create a sales person: "http://localhost:8090/api/sales/person/"
    * "DEL" Delete a specific sales person: "http://localhost:8090/api/sales/person/<int:pk>/"

  - For customers:
    * "GET" List all customers: "http://localhost:8090/api/sales/potentialcustomer/"
    * "GET" Get a specific customer: "http://localhost:8090/api/sales/potentialcustomer/<int:pk>/"
    * "POST" Create a customer: "http://localhost:8090/api/sales/potentialcustomer/"
    * "DEL" Delete a specific customer: "http://localhost:8090/api/sales/potentialcustomer/<int:pk>/"

  - For sales history:
    * "GET" List all sales: "http://localhost:8090/api/sales/"
    * "GET" Get a specific sales history: "http://localhost:8090/api/sales/<int:pk>/"
    * "POST" Create a new sale record: "http://localhost:8090/api/sales/"
    * "DEL" Delete a specific sale record: "http://localhost:8090/api/sales/<int:pk>/"

  - For automobiles:
    * "GET" List unsold automobiles: "http://localhost:8090/api/automobilevo/"