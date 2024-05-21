import { useState } from "react";

const TechnicianCreate = () => {
  const [name, setName] = useState("");
  const [employeeNumber, setEmployeeNumber] = useState("");
  const [submitted, setSubmitted] = useState(false);
  const [invalid, setInvalid] = useState(false);

  const handleSubmit = async (event) => {
    event.preventDefault();

    const employee_number = employeeNumber;
    const data = { name, employee_number };

    const techUrl = "http://localhost:8080/api/technicians/";
    const fetchConfig = {
      method: "POST",
      body: JSON.stringify(data),
      headers: { "Content-Type": "application/json" },
    };

    try {
      const response = await fetch(techUrl, fetchConfig);
      if (response.ok) {
        event.target.reset();
        setName("");
        setEmployeeNumber("");
        setSubmitted(true);
        setInvalid(false);
      } else {
        console.error("Invalid employee number or the number is already in use.");
        setInvalid(true);
      }
    } catch (error) {
      console.error("Failed to fetch:", error);
      setInvalid(true);
    }
  };

  return (
    <div className="max-w-lg mx-auto p-6 bg-white rounded-lg shadow-lg mt-10">
      <h1 className="text-2xl font-bold mb-6 text-center text-blue-700">Create a Technician</h1>
      <form id="create-technician-form" onSubmit={handleSubmit} className="space-y-4">
        <div>
          <label htmlFor="name" className="block text-sm font-medium text-gray-700">Technician Name</label>
          <input
            onChange={(e) => setName(e.target.value)}
            placeholder="Name"
            required
            type="text"
            name="name"
            id="name"
            className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm p-2 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500"
          />
        </div>
        <div>
          <label htmlFor="employeeNumber" className="block text-sm font-medium text-gray-700">Employee Number</label>
          <input
            onChange={(e) => setEmployeeNumber(e.target.value)}
            placeholder="Employee Number"
            required
            type="text"
            name="employeeNumber"
            id="employeeNumber"
            className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm p-2 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500"
          />
        </div>
        <div className="text-center">
          <button className="bg-indigo-600 hover:bg-indigo-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline">
            Create
          </button>
        </div>
      </form>
      {invalid && (
        <div className="bg-red-100 text-red-800 py-2 px-4 rounded-md text-center mt-4">
          You have put an invalid employee number or that number is already in use.
        </div>
      )}
      {!invalid && submitted && (
        <div className="bg-green-100 text-green-800 py-2 px-4 rounded-md text-center mt-4">
          You have added a new employee!
        </div>
      )}
    </div>
  );
};

export default TechnicianCreate;
