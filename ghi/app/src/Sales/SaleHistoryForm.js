import { useEffect, useState } from "react";

const CreateSaleRecordForm = () => {
  const [automobile, setAutomobile] = useState("");
  const [automobiles, setAutomobiles] = useState([]);
  const [salesPerson, setSalesPerson] = useState("");
  const [salesPeople, setSalesPeople] = useState([]);
  const [customer, setCustomer] = useState("");
  const [customers, setCustomers] = useState([]);
  const [price, setPrice] = useState("");
  const [submitted, setSubmitted] = useState(false);

  useEffect(() => {
    fetchAutomobiles();
  }, []);

  async function fetchAutomobiles() {
    const url = "http://localhost:8090/api/automobilevo/";
    const response = await fetch(url);

    if (response.ok) {
      const data = await response.json();
      setAutomobiles(data.automobiles);
    }
  }

  useEffect(() => {
    async function fetchSalesPeople() {
      const url = "http://localhost:8090/api/sales/person";
      const response = await fetch(url);

      if (response.ok) {
        const data = await response.json();
        setSalesPeople(data.sales_people);
      }
    }
    fetchSalesPeople();
  }, []);

  useEffect(() => {
    async function fetchCustomers() {
      const url = "http://localhost:8090/api/sales/potentialcustomer/";
      const response = await fetch(url);

      if (response.ok) {
        const data = await response.json();
        setCustomers(data.customers);
      }
    }
    fetchCustomers();
  }, []);

  const handleSubmit = async (event) => {
    event.preventDefault();
    const data = { automobile, salesPerson, customer, price };
    data.sales_person = data.salesPerson;
    data.price = parseInt(data.price);
    delete data.salesPerson;

    const salesHistoryUrl = "http://localhost:8090/api/sales/";
    const fetchConfig = {
      method: "post",
      body: JSON.stringify(data),
      headers: {
        "Content-Type": "application/json",
      },
    };

    const response = await fetch(salesHistoryUrl, fetchConfig);
    if (response.ok) {
      const newSalesRecord = await response.json();
      console.log(newSalesRecord); // Add this line

      setSubmitted(true);
      setAutomobile("");
      setSalesPerson("");
      setCustomer("");
      setPrice("");
      fetchAutomobiles();
    }
  };

  return (
    <div className="max-w-lg mx-auto p-8 bg-white rounded-lg shadow-lg mt-10">
      <h1 className="text-3xl font-bold mb-6 text-center text-indigo-600">Report a New Sale</h1>
      <form id="create-newsales-form" onSubmit={handleSubmit} className="space-y-6">
        <div className="mb-4">
          <label htmlFor="automobile" className="block text-sm font-medium text-gray-700">
            Automobile
          </label>
          <select
            onChange={(e) => setAutomobile(e.target.value)}
            required
            name="automobile"
            id="automobile"
            className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm p-2 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500"
            value={automobile}
          >
            <option value="">Choose an automobile</option>
            {automobiles.map((automobile) => (
              <option key={automobile.vin} value={automobile.vin}>
                {automobile.vin}
              </option>
            ))}
          </select>
        </div>
        <div className="mb-4">
          <label htmlFor="sales_people" className="block text-sm font-medium text-gray-700">
            Sales Person
          </label>
          <select
            onChange={(e) => setSalesPerson(e.target.value)}
            required
            name="sales_person"
            id="sales_people"
            className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm p-2 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500"
            value={salesPerson}
          >
            <option value="">Choose a sales person</option>
            {salesPeople.map((salesPerson) => (
              <option key={salesPerson.id} value={salesPerson.id}>
                {salesPerson.name}
              </option>
            ))}
          </select>
        </div>
        <div className="mb-4">
          <label htmlFor="customer" className="block text-sm font-medium text-gray-700">
            Customer
          </label>
          <select
            onChange={(e) => setCustomer(e.target.value)}
            required
            name="customer"
            id="customer"
            className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm p-2 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500"
            value={customer}
          >
            <option value="">Choose a customer</option>
            {customers.map((customer) => (
              <option key={customer.id} value={customer.id}>
                {customer.name}
              </option>
            ))}
          </select>
        </div>
        <div className="mb-4">
          <label htmlFor="price" className="block text-sm font-medium text-gray-700">
            Sale Price
          </label>
          <input
            onChange={(e) => setPrice(e.target.value)}
            placeholder="Price"
            required
            type="text"
            name="price"
            id="price"
            className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm p-2 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500"
            value={price}
          />
        </div>
        <div className="text-center">
          <button className="bg-indigo-600 hover:bg-indigo-700 text-white font-bold py-2 px-4 rounded-md shadow focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500">
            Create
          </button>
        </div>
      </form>
      {submitted && (
        <div className="bg-green-100 text-green-800 py-3 px-4 rounded-md text-center mt-6" id="success-message">
          Good job! You just sold a car.
        </div>
      )}
    </div>
  );
};

export default CreateSaleRecordForm;
