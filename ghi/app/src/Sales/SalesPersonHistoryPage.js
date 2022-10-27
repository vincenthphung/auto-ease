import React from "react";


class ListSalesHistoryPage extends React.Component {
    constructor(props) {
        super(props)
        this.state = {
            sales: [],
            salesPersons: [],
            salesPerson: '',
        };

        this.handleSalesPersonChange = this.handleSalesPersonChange.bind(this);
    }

    async handleSalesPersonChange(event) {
        const value = event.target.value;
        const personSalesUrl = `http://localhost:8090/api/sales/person/${value}`;
        const personSalesResponse = await fetch(personSalesUrl);

        if (personSalesResponse.ok) {
            const personSalesData = await personSalesResponse.json();

            this.setState({ sales: personSalesData });
        }
    }

    async componentDidMount() {
        const salesPersonUrl = 'http://localhost:8090/api/sales/person/';
        const salesPersonResponse = await fetch(salesPersonUrl);

        if (salesPersonResponse.ok) {
            const salesPersonData = await salesPersonResponse.json();

            this.setState({ salesPersons: salesPersonData.sales_people })
        }
    }

    render() {
        return (
            <>
                   <div className="px-4 py-5 my-5 mt-0 text-center">
                    <img className="bg-white rounded shadow d-block mx-auto mb-4" alt="" width="600" />
                    <h1 className="display-5 fw-bold">Sales person history</h1>
  
                    </div>
                <div className="mb-3 my-5">
                    <select value={this.state.sales_person} onChange={this.handleSalesPersonChange} required id="sales_person" name="sales_person" className="form-select">
                        <option value="">Choose a sales person</option>
                        {this.state.salesPersons.map(salesPerson => {
                            return (
                                <option key={salesPerson.id} value={salesPerson.id}>{salesPerson.name}</option>
                            );
                        })}
                    </select>
                </div>

                <table className="table">
                    <thead>
                        <tr>
                            <th>Sales person</th>
                            <th>Customer</th>
                            <th>VIN</th>
                            <th>Sale price</th>
                        </tr>
                    </thead>
                    <tbody>
                        {this.state.sales.map(sale => {
                            return (
                                <tr key={sale.id}>
                                    <td>{sale.sales_person.name}</td>
                                    <td>{sale.customer.name}</td>
                                    <td>{sale.automobile.vin}</td>
                                    <td>${sale.price}</td>
                                </tr>
                            );
                        })}
                    </tbody>
                </table>
            </>
        );
    }
};


export default ListSalesHistoryPage;


