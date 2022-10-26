import React from 'react';


class CreateSaleRecordForm extends React.Component {
    constructor(props) {
        super(props)
        this.state = {
            automobiles: [],
            salesPersons: [],
            customers: [],
            price: '',
        };

        this.handleAutomobileChange = this.handleAutomobileChange.bind(this);
        this.handleSalesPersonChange = this.handleSalesPersonChange.bind(this);
        this.handleCustomerChange = this.handleCustomerChange.bind(this);
        this.handlePriceChange = this.handlePriceChange.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
    }

    async handleSubmit(event) {
        event.preventDefault();
        const data = { ...this.state };
        data.salesPersons = data.salesPersons;
        delete data.salesPersons;
        delete data.automobiles;
        delete data.salesPersons;
        delete data.customers;

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
            const newRecord = await response.json();

            const cleared = {
                automobiles: [],
                salesPersons: [],
                customers: [],
                price: '',
            };
            this.setState(cleared);
        }
    }

    handleAutomobileChange(event) {
        const value = event.target.value;
        this.setState({ automobile: value })
    }

    handleSalesPersonChange(event) {
        const value = event.target.value;
        this.setState({ salesPerson: value })
    }

    handleCustomerChange(event) {
        const value = event.target.value;
        this.setState({ customer: value })
    }

    handlePriceChange(event) {
        const value = event.target.value;
        this.setState({ price: value })
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
            this.setState({ salesPersons: salesPersonData.sales_people })
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
                                <select onChange={this.handleSalesPersonChange} value={this.state.salesPerson} required id="sales_person" name="sales_person" className="form-select">
                                    <option value="">Choose a sales person</option>
                                    {this.state.salesPersons.map(salesPerson => {
                                        return (
                                            <option key={salesPerson.id} value={salesPerson.id}>{salesPerson.name}</option>
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
                                <label htmlFor="price">Price</label>
                            </div>

                            <div className='d-grid gap-2 d-md-flex justify-content-md-end'>
								<button className='btn btn-outline-success'>Create</button>
							</div>
                        </form>
                    </div>
                </div>
            </div>
        );
    }
};

export default CreateSaleRecordForm;


    