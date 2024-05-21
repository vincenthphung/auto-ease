import React, { useEffect, useState } from "react";

const TechnicianList = () => {
  const [technician, setTechnician] = useState([]);

  useEffect(() => {
    const fetchTechnician = async () => {
      const url = "http://localhost:8080/api/technicians/";
      try {
        const response = await fetch(url);
        const content = await response.json();
        if (response.ok) {
          setTechnician(Array.isArray(content.technicians) ? content.technicians : []);
        }
      } catch (e) {
        console.log("error", e);
      }
    };
    fetchTechnician();
  }, []);

  const deletedTechnician = async (id) => {
    fetch(`http://localhost:8080/api/technicians/${id}`, {
      method: "DELETE",
      headers: { "Content-Type": "application/json" },
    }).then(() => {
      setTechnician(technician.filter(t => t.id !== id));
    });
  };

  return (
    <div className="max-w-7xl mx-auto p-6 bg-white rounded-lg shadow-lg mt-10">
      <h1 className="text-3xl font-bold mb-6 text-center text-blue-700">Technicians</h1>
      <table className="min-w-full divide-y divide-gray-200">
        <thead className="bg-gray-100">
          <tr>
            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Name</th>
            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Employee Number</th>
            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Delete</th>
          </tr>
        </thead>
        <tbody className="bg-white divide-y divide-gray-200">
          {technician.map((tech) => (
            <tr key={tech.id} className="hover:bg-gray-50 transition duration-150">
              <td className="px-6 py-4 whitespace-nowrap text-gray-700">{tech.name}</td>
              <td className="px-6 py-4 whitespace-nowrap text-gray-700">{tech.employee_number}</td>
              <td className="px-6 py-4 whitespace-nowrap">
                <button
                  onClick={() => deletedTechnician(tech.id)}
                  type="button"
                  className="bg-red-500 hover:bg-red-600 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
                >
                  Delete
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default TechnicianList;
