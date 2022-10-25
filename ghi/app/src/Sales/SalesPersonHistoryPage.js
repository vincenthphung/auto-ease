import React from "react";


class ListSalesHistoryPage extends React.Component {
    constructor(props) {
        super(props)
        this.state = {
            sales: [],
            sales_persons: [],
            sales_person: '',
        };
        this.handleSalesPersonChange = this.handleSalesPersonChange.bind(this)

    }

    async handleSalesPersonChange(event) {
        const value = event.target.value;
        const salesHistoryUrl = 'http://localhost:8090/api/sales/person/${value}';
        const salesHistoryResponse = await fetch(salesHistoryUrl);

        if (salesHistoryResponse.ok) {
            const salesHistory = await salesHistoryResponse.json();
            this.setState({ sales: salesHistory});
        }
    }


    async componentDidMount() {
        const url = 'http://localhost:8090/api/sales/person/';
        const response = await fetch(url);
        if (response.ok) {
            const data = await response.json();
            console.log(data)

            this.setState({ sales_persons: data["sales_persons"] })
        };
    }

    
    render() {
        return (
            <div className="row" >
                <div className="offset-3 col-6">
                    <div className="shadow p-4 mt-4">
                        <h1>Sales Person History</h1>

                        <select onChange={this.handleSalesPersonChange} value={this.state.sales_persons} required id="sales_person" name="sales_person" className="form-select">
                            <option value="">Select a sales person</option>
                            {this.state.sales_persons.map(sales_persons => {
                                return (
                            <option key={sales_persons.employee_id} value={sales_persons.employee_id}>{sales_persons.name}</option>
                                );
                            })}
                        </select>
                    </div>

                <div>
                    <table className="table table-striped mt-3">
                        <thead>
                            <tr>
                                <th>Sales Person</th> 
                                <th>Customer</th>
                                <th>VIN</th>
                                <th>Sale price</th>
                            </tr>
                        </thead>
                        <tbody id="sales_person_details">
                            {this.state.data_records.map (data => {
                                return(
                                    <tr key={sales.automobile.vin}>
                                        <td>{sales.sales_person.name}</td>
                                        <td>{sales.customer.name}</td>
                                        <td>{sales.automobile.vin}</td>
                                        <td>{'$${sales.price}.00'}</td>
                                    </tr>
                                )
                            })}
                        </tbody>
                    </table>
                </div>
            </div>
        </div>
        )
    }
};


export default ListSalesHistoryPage;

