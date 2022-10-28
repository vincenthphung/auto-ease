import { NavLink } from "react-router-dom";

function Nav() {
  return (
    <nav className="navbar navbar-expand-lg navbar-dark bg-success">
      <div className="container-fluid">
        <NavLink className="navbar-brand" to="/">
          CarCar
        </NavLink>
        <button
          className="navbar-toggler"
          type="button"
          data-bs-toggle="collapse"
          data-bs-target="#navbarSupportedContent"
          aria-controls="navbarSupportedContent"
          aria-expanded="false"
          aria-label="Toggle navigation"
        >
          <span className="navbar-toggler-icon"></span>
        </button>
        <div className="collapse navbar-collapse" id="navbarSupportedContent">
          <ul className="navbar-nav me-auto mb-2 mb-lg-0">
            <div className="dropdown">
              <button
                className="btn dropdown-toggle"
                type="button"
                id="dropdownMenuButton1"
                data-bs-toggle="dropdown"
                aria-expanded="false"
              >
                Inventory
              </button>
              <ul
                className="dropdown-menu"
                aria-labelledby="dropdownMenuButton1"
              >
                <li className="nav-item">
                  <NavLink className="dropdown-item" to="manufacturers/new">
                    Create a Manufacturer
                  </NavLink>
                </li>
                <li className="nav-item">
                  <NavLink className="dropdown-item" to="manufacturers/">
                    List of Manufacturers
                  </NavLink>
                </li>
                <li className="nav-item">
                  <NavLink className="dropdown-item" to="models/create">
                    Create a Vehicle Model
                  </NavLink>
                </li>
                <li className="nav-item">
                  <NavLink className="dropdown-item" to="models/">
                    List of Vehicle Models
                  </NavLink>
                </li>
                <li className="nav-item">
                  <NavLink className="dropdown-item" to="automobiles/">
                    List of Automobiles
                  </NavLink>
                </li>
              </ul>
            </div>

            <div className="dropdown">
              <button
                className="btn dropdown-toggle"
                type="button"
                id="dropdownMenuButton1"
                data-bs-toggle="dropdown"
                aria-expanded="false"
              >
                Services
              </button>
              <ul
                className="dropdown-menu"
                aria-labelledby="dropdownMenuButton1"
              >
                <li className="nav-item">
                  <NavLink
                    className="dropdown-item"
                    to="/technicians/new"
                  >
                    Create an Technician
                  </NavLink>
                </li>

                <li className="nav-item">
                  <NavLink
                    className="dropdown-item"
                    to="technicians/"
                  >
                    List of Technicians
                  </NavLink>
                </li>

                <li className="nav-item">
                  <NavLink className="dropdown-item" to="appointments/">
                    List of Appointments
                  </NavLink>
                </li>
                <li className="nav-item">
                  <NavLink className="dropdown-item" to="appointments/new">
                    Create an Appointment
                  </NavLink>
                </li>
                <li className="nav-item">
                  <NavLink className="dropdown-item" to="appointments/history">
                    Appointment History
                  </NavLink>
                </li>
              </ul>
            </div>

            <div className="dropdown">
              <button
                className="btn dropdown-toggle"
                type="button"
                id="dropdownMenuButton1"
                data-bs-toggle="dropdown"
                aria-expanded="false"
              >
                Sales
              </button>
              <ul
                className="dropdown-menu"
                aria-labelledby="dropdownMenuButton1"
              >
                <li className="nav-item">
                  <NavLink
                    className="dropdown-item"
                    to="/potentialcustomer/new"
                  >
                    Add a customer
                  </NavLink>
                </li>
                <li className="nav-item">
                  <NavLink className="dropdown-item" to="/salesperson/new">
                    Add a sales person
                  </NavLink>
                </li>
                <li className="nav-item">
                  <NavLink className="dropdown-item" to="/sales/new">
                    Record a New Sale
                  </NavLink>
                </li>
                <li className="nav-item">
                  <NavLink className="dropdown-item" to="/sales/list">
                    List of Sales
                  </NavLink>
                </li>
                <li className="nav-item">
                  <NavLink className="dropdown-item" to="/saleshistory">
                    Sales History
                  </NavLink>
                </li>
              </ul>
            </div>
          </ul>
        </div>
      </div>
    </nav>
  );
}

export default Nav;
