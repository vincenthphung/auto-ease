import React, { useState, useEffect } from "react";

export default function ListSalesPage() {
  const [sales, setSales] = useState([]);

  useEffect(() => {
    fetch("http://localhost:8090/api/sales/")
      .then((res) => res.json())
      .then((data) => {
        setSales(data.sales);
      });
  }, []);

  return (
    <div className="max-w-7xl mx-auto p-8 bg-white rounded-lg shadow-lg mt-10">
      <div className="text-center mb-10">
        <h1 className="text-3xl font-bold text-indigo-600">List of Sales</h1>
      </div>
      <div className="overflow-x-auto">
        <table className="min-w-full divide-y divide-gray-200">
          <thead className="bg-gray-100">
            <tr>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Sales Person</th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Employee Number</th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Purchaser's Name</th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">VIN</th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Sale Price</th>
            </tr>
          </thead>
          <tbody className="bg-white divide-y divide-gray-200">
            {sales.map((sale) => (
              <tr key={sale.id} className="hover:bg-gray-50 transition duration-150">
                <td className="px-6 py-4 whitespace-nowrap text-gray-700">{sale.sales_person.name}</td>
                <td className="px-6 py-4 whitespace-nowrap text-gray-700">{sale.sales_person.employee_id}</td>
                <td className="px-6 py-4 whitespace-nowrap text-gray-700">{sale.customer.name}</td>
                <td className="px-6 py-4 whitespace-nowrap text-gray-700">{sale.automobile.vin}</td>
                <td className="px-6 py-4 whitespace-nowrap text-gray-700">${sale.price}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
