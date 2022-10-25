import React from 'react';


class ListSalesPage extends React.Component {

    constructor(props) {
        super(props)
        this.state = {
            sales: [[], [],[]]
        };
    }


    async componentDidMount() {
        const url = 'http://localhost:8090/api/sales/';
        const response = await fetch(url);
        if (response.ok) {
            const data = await response.json();
            this.setState({sales: data.sales_records});
        };
    }


    render() {
        return (
            <div>
                <h2 className="mt-5"><b>Sales person history</b></h2>
                <table className="table table-striped mt-3">
                    <thead>
                        <tr>
                            <th>Sales Person</th>
                            <th>Employee Number</th>
                            <th>Purchaser's name</th>
                            <th>VIN</th>
                            <th>Sales Price</th>
                        </tr>
                    </thead>
                    <tbody>
                        {this.state.sales.map(sales => {
                            return (
                                <tr key={sales.automobile.vin}>
                                    <td>{ sales.sales_person.name }</td>
                                    <td>{ sales.sales_person.employee_id }</td>
                                    <td>{ sales.customer.name }</td>
                                    <td>{ sales.automobile.vin }</td>
                                    <td>{'$${sales.price}.00'}</td>
                                </tr>
                            );
                        })}
                    </tbody>
                </table>
            </div>
        )
    }
};

export default ListSalesPage;
