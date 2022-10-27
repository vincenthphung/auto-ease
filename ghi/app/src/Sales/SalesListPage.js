import React from 'react';
import { useState, useEffect } from 'react';


export default function ListSalesPage() {
    const [sales, setModels] = useState([]);
    useEffect(() => {
        fetch("http://localhost:8090/api/sales/")
        .then(res => res.json())
        .then(data => {setModels(data.sales);
        // console.log(data)
    });
    }, [])

    return(
        <div>
            <div className="px-4 py-5 my-5 mt-0 text-center">
            <img className="bg-white rounded shadow d-block mx-auto mb-4" alt="" width="600" />
            <h1 className="display-9 fw-bold">List of Sales</h1>
        </div>
              <table className='table'>
                <thead>
                    <tr>
                        <th scope='col'>Sales person</th>
                        <th scope='col'>Employee number</th>
                        <th scope='col'>Purchaser's name</th>
                        <th scope='col'>VIN</th>
                        <th scope='col'>Sale price</th>
                    </tr>
                </thead>
                <tbody>
                {sales.map(sale=> {return (
                <tr key={sale.id}>
                    <th>{sale.sales_person.name}</th>
                    <th>{sale.sales_person.employee_id}</th>
                    <th>{sale.customer.name}</th>
                    <th>{sale.automobile.vin}</th>
                    <th>${sale.price}</th>
                </tr>
                )})}
                </tbody>
            </table>
        </div>
    )
}
    