import React from 'react';


class ListSalesPage extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
          sales: [],
        };
      }
    
      async componentDidMount() {
        const url = "http://localhost:8090/api/sales/";
        const response = await fetch(url);
        if (response.ok) {
          const data = await response.json();
    
          this.setState({ sales: data["sales_record"] });
        }
      }
    
    
        render() {
            return (
                <>
                    <h2>All sales</h2>
                    <table className="table table-striped">
                        <thead>
                            <tr>
                                <th>Sales Person</th>
                                <th>Employee number</th>
                                <th>Purchaser's Name</th>
                                <th>VIN</th>
                                <th>Sale Price</th>
                            </tr>
                        </thead>
                        <tbody>
                            {this.state.sales?.map(sale => {
                                return (
                                    <tr key={sale.automobile.vin}>
                                        <td>{sale.sales_person.name}</td>
                                        <td>{sale.sales_person.employee_number}</td>
                                        <td>{sale.customer.name}</td>
                                        <td>{sale.vin.vin}</td>
                                        <td>{sale.price}</td>
                                    </tr>
                                );
                            })}
                        </tbody>
                    </table>
                </>
            );
        }
    }
    
export default ListSalesPage;
