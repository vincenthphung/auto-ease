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
        };
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

            setSubmitted(true);
            setAutomobile("");
            setSalesPerson("");
            setCustomer("");
            setPrice("");
            fetchAutomobiles();
        }
    };

    return (
        <div className="row">
            <div className="offset-3 col-6">
                <div className="shadow p-4 mt-4">
                    <h1>Report a new sale</h1>
                    <form id="create-newsales-form" onSubmit={handleSubmit}>
                        <div className="mb-3">
                            <select onChange={(e) => setAutomobile(e.target.value)} required name="Automobile" id="automobile" className="form-select" value={automobile}>
                                <option value="">Choose an automobile</option>
                                {automobiles.map((automobile) => {
                                    return (
                                        <option key={automobile.vin} value={automobile.vin}>
                                            {automobile.vin}
                                        </option>
                                    );})}
                            </select>
                        </div>
                        <div className="mb-3">
                            <select onChange={(e) => setSalesPerson(e.target.value)} required name="Sales Person" id="sales_people" className="form-select" value={salesPerson}>
                                <option value="">Choose a sales person</option>
                                {salesPeople.map((salesPerson) => {
                                    return (
                                        <option key={salesPerson.id} value={salesPerson.id}>
                                            {salesPerson.name}
                                        </option>
                                    );
                                })}
                            </select>
                        </div>
                        <div className="mb-3">
                            <select onChange={(e) => setCustomer(e.target.value)} required name="Customer" id="customer" className="form-select" value={customer}>
                                <option value="">Choose a customer</option>
                                {customers.map((customer) => {
                                    return (
                                        <option key={customer.id} value={customer.id}>
                                            {customer.name}
                                        </option>
                                    );
                                })}
                            </select>
                        </div>
                        <div className="form-floating mb-3">
                            <input onChange={(e) => setPrice(e.target.value)} placeholder="Price" required type="text" name="price" id="price" className="form-control" value={price} />
                            <label htmlFor="price">Sale price</label>
                        </div>

                        <button className="btn btn-primary">Create</button>
                    </form>
                    {submitted && (
                        <div className="alert alert-success mb-0 p-4 mt-4" id="success-message">
                            Good job! You just sold a car.
                        </div>
                    )}
                </div>
            </div>
        </div>
    )
};

export default CreateSaleRecordForm;
