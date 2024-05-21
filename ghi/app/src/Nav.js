import { NavLink } from "react-router-dom";
import { useState } from 'react';

function Nav() {
    return (
        <nav className="bg-blue-700 p-4 shadow-md">
            <div className="container mx-auto flex justify-between items-center">
                <NavLink className="text-white font-bold text-xl" to="/">Auto Ease</NavLink>
                <div className="flex space-x-6">
                    <DropdownMenu title="Inventory" links={[
                        { to: "manufacturers/new", label: "Create a Manufacturer" },
                        { to: "manufacturers/", label: "List of Manufacturers" },
                        { to: "models/new", label: "Create a Vehicle Model" },
                        { to: "models/", label: "List of Vehicle Models" },
                        { to: "automobiles/new", label: "Create an Automobile" },
                        { to: "automobiles/", label: "List of Automobiles" }
                    ]} />
                    <DropdownMenu title="Sales" links={[
                        { to: "salesperson/new", label: "Add a Sales Employee" },
                        { to: "customers/new", label: "Add a Customer" },
                        { to: "sales/new", label: "Create a Sales Record" },
                        { to: "sales/list", label: "List of Sales" },
                        { to: "sales/history", label: "Employee Sales History" }
                    ]} />
                    <DropdownMenu title="Services" links={[
                        { to: "technicians/new", label: "Create a Technician" },
                        { to: "appointments/new", label: "Create an Appointment" },
                        { to: "appointments/", label: "List of Appointments" },
                        { to: "appointments/history", label: "Appointment History" }
                    ]} />
                </div>
            </div>
        </nav>
    );
}

function DropdownMenu({ title, links }) {
    const [isOpen, setIsOpen] = useState(false);

    const toggleDropdown = () => setIsOpen(!isOpen);

    // Close dropdown if clicked outside
    function handleOutsideClick(event) {
        if (!event.currentTarget.contains(event.relatedTarget)) {
            setIsOpen(false);
        }
    }

    return (
        <div className="relative" onBlur={handleOutsideClick}>
            <button
                onClick={toggleDropdown}
                className="text-white bg-blue-800 hover:bg-blue-900 font-medium rounded-md px-4 py-2 focus:outline-none transition duration-300"
            >
                {title}
            </button>
            {isOpen && (
                <ul className="absolute bg-white shadow-lg rounded-md mt-2 w-56 z-10 transition duration-300">
                    {links.map(link => (
                        <li key={link.to} className="border-b last:border-b-0">
                            <NavLink
                                onClick={() => setIsOpen(false)}
                                className="block px-4 py-2 text-sm text-gray-700 hover:bg-blue-100 transition duration-300"
                                to={link.to}
                            >
                                {link.label}
                            </NavLink>
                        </li>
                    ))}
                </ul>
            )}
        </div>
    );
}

export default Nav;
