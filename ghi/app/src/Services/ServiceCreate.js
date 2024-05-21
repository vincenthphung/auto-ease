import { useEffect, useState } from "react";

const ServiceCreate = () => {
  const [vin, setVin] = useState("");
  const [owner, setOwner] = useState("");
  const [technicians, setTechnicians] = useState([]);
  const [dateTime, setDateTime] = useState("");
  const [selectedTechnician, setSelectedTechnician] = useState("");
  const [reason, setReason] = useState("");
  const [vip, setVip] = useState(false);
  const [submitted, setSubmitted] = useState(false);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchTechnicians = async () => {
      const url = "http://localhost:8080/api/technicians/";
      const response = await fetch(url);
      if (response.ok) {
        const data = await response.json();
        setTechnicians(data.technicians);
      }
    };
    fetchTechnicians();
  }, []);

  const clearState = () => {
    setVin("");
    setOwner("");
    setDateTime("");
    setSelectedTechnician("");
    setReason("");
    setVip(false);
    setSubmitted(true);
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    setError(null); // Clear any previous errors

    const date_time = dateTime;
    const technician_id = parseInt(selectedTechnician, 10);

    const data = { vin, owner, date_time, technician: technician_id, reason, vip };

    console.log("Sending data:", data); // Log the data being sent

    const appointmentUrl = "http://localhost:8080/api/appointments/";
    const fetchConfig = {
      method: "POST",
      body: JSON.stringify(data),
      headers: {
        "Content-Type": "application/json",
      },
    };

    try {
      const response = await fetch(appointmentUrl, fetchConfig);
      if (!response.ok) {
        const contentType = response.headers.get("content-type");
        if (contentType && contentType.indexOf("application/json") !== -1) {
          const errorData = await response.json();
          console.error('Server responded with an error:', errorData);
          setError('Server responded with an error. Please check the input fields.');
        } else {
          const errorText = await response.text();
          console.error('Server responded with an error:', errorText);
          setError('An unexpected error occurred. Please try again later.');
        }
      } else {
        event.target.reset();
        clearState();
      }
    } catch (error) {
      console.error('Error occurred while making the request:', error);
      setError('Error occurred while making the request. Please try again later.');
    }
  };

  return (
    <div className="max-w-lg mx-auto p-8 bg-white rounded-lg shadow-lg mt-10">
      <h1 className="text-3xl font-bold mb-6 text-center text-indigo-600">Create a New Appointment</h1>
      <form id="create-appointment-form" onSubmit={handleSubmit} className="space-y-6">
        <div>
          <label htmlFor="vin" className="block text-sm font-medium text-gray-700">VIN Number</label>
          <input
            onChange={(e) => setVin(e.target.value)}
            placeholder="Enter VIN"
            required
            type="text"
            name="vin"
            id="vin"
            className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm p-3 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500"
          />
        </div>
        <div>
          <label htmlFor="owner" className="block text-sm font-medium text-gray-700">Owner</label>
          <input
            onChange={(e) => setOwner(e.target.value)}
            placeholder="Enter Owner's Name"
            required
            type="text"
            name="owner"
            id="owner"
            className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm p-3 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500"
          />
        </div>
        <div>
          <label htmlFor="dateTime" className="block text-sm font-medium text-gray-700">Date & Time</label>
          <input
            onChange={(e) => setDateTime(e.target.value)}
            placeholder="Select Date & Time"
            required
            type="datetime-local"
            name="dateTime"
            id="dateTime"
            className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm p-3 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500"
          />
        </div>
        <div>
          <label htmlFor="technician" className="block text-sm font-medium text-gray-700">Technician</label>
          <select
            onChange={(e) => setSelectedTechnician(e.target.value)}
            required
            name="technician"
            id="technician"
            className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm p-3 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500"
          >
            <option value="">Select a Technician</option>
            {technicians.map((technician) => (
              <option key={technician.id} value={technician.id}>
                {technician.name}
              </option>
            ))}
          </select>
        </div>
        <div>
          <label htmlFor="reason" className="block text-sm font-medium text-gray-700">Reason</label>
          <textarea
            onChange={(e) => setReason(e.target.value)}
            id="reason"
            rows="4"
            name="reason"
            placeholder="Enter the reason for the appointment"
            className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm p-3 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500"
          ></textarea>
        </div>
        <div className="flex items-center">
          <input
            type="checkbox"
            id="vip"
            name="vip"
            checked={vip}
            onChange={(e) => setVip(e.target.checked)}
            className="h-4 w-4 text-indigo-600 border-gray-300 rounded focus:ring-indigo-500"
          />
          <label htmlFor="vip" className="ml-2 block text-sm font-medium text-gray-700">VIP</label>
        </div>
        <div className="text-center">
          <button className="bg-indigo-600 hover:bg-indigo-700 text-white font-bold py-3 px-6 rounded-md shadow focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500">
            Create Appointment
          </button>
        </div>
      </form>
      {submitted && (
        <div className="bg-green-100 text-green-800 py-3 px-4 rounded-md text-center mt-6">
          Your appointment has been created!
        </div>
      )}
      {error && (
        <div className="bg-red-100 text-red-800 py-3 px-4 rounded-md text-center mt-6">
          {error}
        </div>
      )}
    </div>
  );
};

export default ServiceCreate;
