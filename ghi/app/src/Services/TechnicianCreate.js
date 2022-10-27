import React, { useState } from "react";

const TechnicianCreate = () => {
  const [technician, setTechnician] = useState({
    name: "",
    employee_number: "",
  });

  const handleInputChange = (e) => {
    const name = e.target.name;
    const value = e.target.value;
    setTechnician({ ...technician, [name]: value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const data = {
      name: technician.name,
      employee_number: technician.employee_number,
    };

    await fetch(`http://localhost:8080/api/technicians/`, {
      method: "POST",
      body: JSON.stringify(data),
      headers: { "Content-Type": "application/json" },
    }).then(() => {
      setTechnician({ ...technician });
      window.location.href = "/service/list_technician";
    });
  };

  return (
    <div className="container">
      <div className="row">
        <div className="offset-3 col-6">
          <div className="shadow p-4 mt-4">
            <h1>Create technician</h1>
            <form onSubmit={handleSubmit} className="form">
              <div className="form-floating mb-3">
                <input
                  onChange={handleInputChange}
                  value={technician.name}
                  placeholder="name"
                  required
                  type="text"
                  name="name"
                  id="name"
                  className="form-control"
                />
                <label htmlFor="customer_name">Technician</label>
              </div>
              <div className="form-floating mb-3">
                <input
                  onChange={handleInputChange}
                  value={technician.employee_number}
                  placeholder="employee_number"
                  required
                  type="text"
                  name="employee_number"
                  id="employee_number"
                  className="form-control"
                />
                <label htmlFor="vin">Employee Number</label>
              </div>

              <button className="btn btn-outline-success">Create</button>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
};

export default TechnicianCreate;
