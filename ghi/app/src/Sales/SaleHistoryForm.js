import React from 'react';

class CreateSaleRecordForm extends React.Component {
    constructor(props) {
        super(props)
        this.state = {
            automobiles: [],
            automobile:'',
            sales_persons: [],
            sales_person: '',
            customers: [],
            customer:'',
            price: '',
        };

        this.handleAutomobileChange = this.handleAutomobileChange.bind(this);
        this.handleSalesPersonChange = this.handleSalesPersonChange.bind(this)
        this.handleCustomerChange = this.handleCustomerChange.bind(this);
        this.handlePriceChange = this.handlePriceChange.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
    }

    handleAutomobileChange(event) {
        const value = event.target.value;
        this.setState({ automobile: value })
    }

    handleSalesPersonChange(event) {
        const value = event.target.value;
        this.setState({ sales_person: value })
    }


    handleCustomerChange(event) {
        const value = event.target.value;
        this.setState({ customer: value })
    }

    handlePriceChange(event) {
        const value = event.target.value;
        this.setState({ price: value })
    }

    async handleSubmit(event) {
        event.preventDefault();
        const data = { ...this.state };

        delete data.automobiles;
        delete data.sales_persons;
        delete data.customers;
        console.log(data)

        const recordUrl = 'http://localhost:8090/api/sales/';

        const fetchConfig = {
            method: "post",
            body: JSON.stringify(data),
            headers: {
                'Content-Type': 'application/json',
            },
        };

        const response = await fetch(recordUrl, fetchConfig);
        if (response.ok) {
            const newSalesHistory = await response.json();
            console.log(newSalesHistory);

            const cleared = {
                automobile: '',
                sales_person: '',
                customer: '',
                price: '',
            };
            this.setState(cleared);
        }
    }


    async componentDidMount() { 
        const automobileUrl = 'http://localhost:8100/api/automobiles/';
        const automobileResponse = await fetch(automobileUrl);

        const salesPersonUrl = 'http://localhost:8090/api/sales/person/';
        const salesPersonResponse = await fetch(salesPersonUrl);

        const customerUrl = 'http://localhost:8090/api/sales/potentialcustomer/';
        const customerResponse = await fetch(customerUrl);


        if (automobileResponse.ok && salesPersonResponse.ok && customerResponse.ok) {
            const automobileData = await automobileResponse.json();
            const salesPersonData = await salesPersonResponse.json();
            const customerData = await customerResponse.json();

            this.setState({ automobiles: automobileData.autos })
            this.setState({ sales_persons: salesPersonData.sales_persons })
            this.setState({ customers: customerData.customers })
        }
    }


    render() {
        return (
            <div className="row">
                <div className="offset-3 col-6">
                    <div className="shadow p-4 mt-4">
                        <h1>Record a new sale</h1>
                        <form onSubmit={this.handleSubmit} id="create-record-form">

                            <div className="mb-3">
                                <select onChange={this.handleAutomobileChange} value={this.state.automobile} required id="automobile" name="automobile" className="form-select">
                                    <option value="">Choose an automobile</option>
                                    {this.state.automobiles.map(automobile => {
                                        return (
                                            <option key={automobile.vin} value={automobile.vin}>{automobile.vin}</option>
                                        );
                                    })}
                                </select>
                            </div>

                            <div className="mb-3">
                                <select onChange={this.handleSalesPersonChange} value={this.state.sales_person} required id="sales_person" name="sales_person" className="form-select">
                                    <option value="">Choose a sales person</option>
                                    {this.state.sales_persons.map(sales_person => {
                                        return (
                                            <option key={sales_person.employee_id} value={sales_person.employee_id}>{sales_person.name}</option>
                                        );
                                    })}
                                </select>
                            </div>
                            
                            <div className="mb-3">
                                <select onChange={this.handleCustomerChange} value={this.state.customer} required id="customer" name="customer" className="form-select">
                                    <option value="">Choose a customer</option>
                                    {this.state.customers.map(customer => {
                                        return (
                                            <option key={customer.id} value={customer.id}>{customer.name}</option>
                                        );
                                    })}
                                </select>
                            </div>
                            
                            <div className="form-floating mb-3">
                                <input onChange={this.handlePriceChange} value={this.state.price} placeholder="price" type="number" id="price" className="form-control" />
                                <label htmlFor="price">Sale Price</label>
                            </div>

                            <button className="btn btn-primary">Create</button>
                        </form>
                        <div className={this.state.success ? "alert alert-success mt-4" : "d-none"} id="success-message">
                            Good job! You sold a car successfully.
                        </div>
                    </div>
                </div>
            </div>
        );
    }
}

export default CreateSaleRecordForm;

