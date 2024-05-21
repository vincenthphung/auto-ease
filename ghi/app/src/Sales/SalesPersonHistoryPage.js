import React, { useEffect, useState } from "react";

const ListSalesHistoryPage = () => {
  const [sales, setSales] = useState([]);
  const [salesPersons, setSalesPersons] = useState([]);
  const [selectedSalesPerson, setSelectedSalesPerson] = useState("");

  useEffect(() => {
    const fetchSalesPersons = async () => {
      const salesPersonUrl = "http://localhost:8090/api/sales/person/";
      const salesPersonResponse = await fetch(salesPersonUrl);

      if (salesPersonResponse.ok) {
        const salesPersonData = await salesPersonResponse.json();
        setSalesPersons(salesPersonData.sales_people);
      } else {
        console.error("Failed to fetch sales persons");
      }
    };

    fetchSalesPersons();
  }, []);

  const handleSalesPersonChange = async (event) => {
    const value = event.target.value;
    setSelectedSalesPerson(value);

    if (value) {
      const personSalesUrl = `http://localhost:8090/api/sales/person/${value}/sales/`;
      const personSalesResponse = await fetch(personSalesUrl);

      if (personSalesResponse.ok) {
        const personSalesData = await personSalesResponse.json();
        setSales(personSalesData.sales || []);
      } else {
        console.error("Failed to fetch sales data");
        setSales([]);
      }
    } else {
      setSales([]);
    }
  };

  return (
    <div className="max-w-7xl mx-auto p-8 bg-white rounded-lg shadow-lg mt-10">
      <div className="text-center mb-10">
        <h1 className="text-3xl font-bold text-indigo-600">Sales Person History</h1>
      </div>
      <div className="mb-4">
        <label htmlFor="sales_person" className="block text-sm font-medium text-gray-700">
          Choose a Sales Person
        </label>
        <select
          value={selectedSalesPerson}
          onChange={handleSalesPersonChange}
          required
          id="sales_person"
          name="sales_person"
          className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm p-2 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500"
        >
          <option value="">Choose a sales person</option>
          {salesPersons.map((salesPerson) => (
            <option key={salesPerson.id} value={salesPerson.employee_id}>
              {salesPerson.name}
            </option>
          ))}
        </select>
      </div>
      <div className="overflow-x-auto">
        <table className="min-w-full divide-y divide-gray-200">
          <thead className="bg-gray-100">
            <tr>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Sales Person</th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Customer</th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">VIN</th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Sale Price</th>
            </tr>
          </thead>
          <tbody className="bg-white divide-y divide-gray-200">
            {sales.map((sale) => (
              <tr key={sale.id} className="hover:bg-gray-50 transition duration-150">
                <td className="px-6 py-4 whitespace-nowrap text-gray-700">{sale.sales_person.name}</td>
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
};

export default ListSalesHistoryPage;
