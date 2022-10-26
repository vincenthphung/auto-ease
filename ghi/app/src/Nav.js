import { NavLink } from 'react-router-dom';

function Nav() {
	return (
		<nav className='navbar navbar-expand-lg navbar-dark bg-success'>
			<div className='container-fluid'>
				<NavLink className='navbar-brand' to='/'>
					CarCar
				</NavLink>
				<button
					className='navbar-toggler'
					type='button'
					data-bs-toggle='collapse'
					data-bs-target='#navbarSupportedContent'
					aria-controls='navbarSupportedContent'
					aria-expanded='false'
					aria-label='Toggle navigation'
				>
					<span className='navbar-toggler-icon'></span>
				</button>
				<div className='collapse navbar-collapse' id='navbarSupportedContent'>
					<ul className='navbar-nav me-auto mb-2 mb-lg-0'>

          <div className="dropdown">
              <button className="btn dropdown-toggle" type="button" id="dropdownMenuButton1" data-bs-toggle="dropdown" aria-expanded="false">
                Inventory
              </button>
              <ul className="dropdown-menu" aria-labelledby="dropdownMenuButton1">
                <li className="nav-item">
                  <NavLink className="dropdown-item" to="/manufacturers/new">Create a manufacturer</NavLink>
                </li>
                <li className="nav-item">
                  <NavLink className="dropdown-item" to="/manufacturers">List of Manufacturers</NavLink>
                </li>
                <li className="nav-item">
                  <NavLink className="dropdown-item" to="/vehiclemodels">List of Vehicle Models</NavLink>
                </li>
              </ul>
          </div>


						<li className='nav-item'>
							<NavLink className='nav-link' to='/appointments'>
								Appointments
							</NavLink>
						</li>


						<div className="dropdown">
              <button className="btn dropdown-toggle" type="button" id="dropdownMenuButton1" data-bs-toggle="dropdown" aria-expanded="false">
                Sales
              </button>
              <ul className="dropdown-menu" aria-labelledby="dropdownMenuButton1">
                <li className="nav-item">
                  <NavLink className="dropdown-item" to="/potentialcustomer/new">Add a customer</NavLink>
                </li>
                <li className="nav-item">
                  <NavLink className="dropdown-item" to="/salesperson/new">Add a sales person</NavLink>
                </li>
                <li className="nav-item">
                  <NavLink className="dropdown-item" to="/sales/new">Record a New Sale</NavLink>
                </li>
                <li className="nav-item">
                  <NavLink className="dropdown-item" to="/sales/list">List of Sales</NavLink>
                </li>
                <li className="nav-item">
                  <NavLink className="dropdown-item" to="/saleshistory">Sales History</NavLink>
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
