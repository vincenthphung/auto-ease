import { useEffect, useState } from "react";

const ServiceList = () => {
  const [appointments, setAppointments] = useState([]);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchAppointments = async () => {
      try {
        const url = "http://localhost:8080/api/appointments/";
        const response = await fetch(url);
        if (response.ok) {
          const data = await response.json();
          setAppointments(data.appointments);
        } else {
          setError("Failed to fetch appointments");
        }
      } catch (error) {
        setError("Error fetching appointments");
      }
    };
    fetchAppointments();
  }, []);

  const deleteAppointment = async (id) => {
    try {
      const appointmentUrl = `http://localhost:8080/api/appointments/${id}/`;
      const fetchConfig = {
        method: "DELETE",
        headers: {
          "Content-Type": "application/json",
        },
      };

      const response = await fetch(appointmentUrl, fetchConfig);
      if (response.ok) {
        setAppointments((prevAppointments) =>
          prevAppointments.filter((appointment) => appointment.id !== id)
        );
      } else {
        console.error("Failed to delete appointment");
        setError("Failed to delete appointment");
      }
    } catch (error) {
      console.error("Error deleting appointment:", error);
      setError("Error deleting appointment");
    }
  };

  const finishAppointment = async (id) => {
    try {
      const appointmentUrl = `http://localhost:8080/api/appointments/${id}/`;
      const fetchConfig = {
        method: "PUT",
        body: JSON.stringify({ finished: true }),
        headers: {
          "Content-Type": "application/json",
        },
      };

      const response = await fetch(appointmentUrl, fetchConfig);
      if (response.ok) {
        setAppointments((prevAppointments) =>
          prevAppointments.map((appointment) =>
            appointment.id === id
              ? { ...appointment, finished: true }
              : appointment
          )
        );
      } else {
        console.error("Failed to finish appointment");
        setError("Failed to finish appointment");
      }
    } catch (error) {
      console.error("Error finishing appointment:", error);
      setError("Error finishing appointment");
    }
  };

  return (
    <div className="max-w-7xl mx-auto p-6 bg-white rounded-lg shadow-lg mt-10">
      <h1 className="text-3xl font-bold mb-6 text-center text-indigo-600">Appointment List</h1>
      {error && <div className="bg-red-100 text-red-800 py-3 px-4 rounded-md text-center mb-6">{error}</div>}
      <div className="overflow-x-auto">
        <table className="min-w-full divide-y divide-gray-200">
          <thead className="bg-gray-100">
            <tr>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Owner</th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">VIN</th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Date</th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Time</th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Technician</th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Reason</th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">VIP</th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Actions</th>
            </tr>
          </thead>
          <tbody className="bg-white divide-y divide-gray-200">
            {appointments.map((appointment) => (
              <tr key={appointment.id} className="hover:bg-gray-50 transition duration-150">
                <td className="px-6 py-4 whitespace-nowrap text-gray-700">{appointment.owner}</td>
                <td className="px-6 py-4 whitespace-nowrap text-gray-700">{appointment.vin}</td>
                <td className="px-6 py-4 whitespace-nowrap text-gray-700">{new Date(appointment.date_time).toLocaleDateString("en-US")}</td>
                <td className="px-6 py-4 whitespace-nowrap text-gray-700">{new Date(appointment.date_time).toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" })}</td>
                <td className="px-6 py-4 whitespace-nowrap text-gray-700">{appointment.technician.name}</td>
                <td className="px-6 py-4 whitespace-nowrap text-gray-700">{appointment.reason}</td>
                <td className="px-6 py-4 whitespace-nowrap text-gray-700">{appointment.vip ? "Yes" : "No"}</td>
                <td className="px-6 py-4 whitespace-nowrap flex space-x-2">
                  <button
                    onClick={() => deleteAppointment(appointment.id)}
                    className="bg-red-500 hover:bg-red-600 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
                  >
                    Cancel
                  </button>
                  <button
                    onClick={() => finishAppointment(appointment.id)}
                    className="bg-green-500 hover:bg-green-600 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
                    disabled={appointment.finished}
                  >
                    {appointment.finished ? "Finished" : "Finish"}
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default ServiceList;


