import React, { useState, useEffect } from "react";

const SearchHistory = () => {
  const [service, setService] = useState([]);
  const [filtered, setFiltered] = useState([]);
  const [searchVin, setSearchVin] = useState("");
  const [submitted, setSubmitted] = useState(false);

  useEffect(() => {
    const fetchService = async () => {
      const url = "http://localhost:8080/api/appointments/";
      const response = await fetch(url);
      if (response.ok) {
        const data = await response.json();
        setService(data.appointments);
      }
    };
    fetchService();
  }, []);

  const handleSearch = async () => {
    const results = service.filter((appointment) =>
      appointment.vin.includes(searchVin)
    );
    setFiltered(results);
    setSubmitted(true);
  };

  return (
    <div className="max-w-7xl mx-auto p-6 bg-white rounded-lg shadow-lg mt-10">
      <h1 className="text-3xl font-bold mb-6 text-center text-blue-700">Appointment History</h1>
      <div className="flex justify-center mb-4">
        <input
          type="text"
          value={searchVin}
          onChange={(e) => setSearchVin(e.target.value)}
          className="border border-gray-300 rounded-md shadow-sm p-2 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500"
          placeholder="Search VIN"
        />
        <button
          onClick={handleSearch}
          type="button"
          className="bg-blue-600 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline ml-2"
        >
          Search
        </button>
      </div>
      {filtered.length > 0 ? (
        <table className="min-w-full divide-y divide-gray-200">
          <thead className="bg-gray-100">
            <tr>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Owner</th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">VIN</th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Date</th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Time</th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Technician</th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Reason</th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Finished</th>
            </tr>
          </thead>
          <tbody className="bg-white divide-y divide-gray-200">
            {filtered.map((filter) => (
              <tr className="hover:bg-gray-50 transition duration-150" key={filter.id}>
                <td className="px-6 py-4 whitespace-nowrap text-gray-700">{filter.owner}</td>
                <td className="px-6 py-4 whitespace-nowrap text-gray-700">{filter.vin}</td>
                <td className="px-6 py-4 whitespace-nowrap text-gray-700">{new Date(filter.date_time).toLocaleDateString("en-US")}</td>
                <td className="px-6 py-4 whitespace-nowrap text-gray-700">{new Date(filter.date_time).toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" })}</td>
                <td className="px-6 py-4 whitespace-nowrap text-gray-700">{filter.technician.name}</td>
                <td className="px-6 py-4 whitespace-nowrap text-gray-700">{filter.reason}</td>
                <td className="px-6 py-4 whitespace-nowrap text-gray-700">{filter.finished ? "Yes" : "No"}</td>
              </tr>
            ))}
          </tbody>
        </table>
      ) : (
        submitted && (
          <div className="bg-red-100 text-red-800 py-2 px-4 rounded-md text-center mt-4">
            The VIN entered has no appointment history.
          </div>
        )
      )}
    </div>
  );
};

export default SearchHistory;
