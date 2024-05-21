import React from "react";

class AddPotentialCustomerForm extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      name: "",
      address: "",
      phone: "",
      hasSignedUp: false,
    };

    this.handleNameChange = this.handleNameChange.bind(this);
    this.handleAddressChange = this.handleAddressChange.bind(this);
    this.handlePhoneChange = this.handlePhoneChange.bind(this);
    this.handleOnSubmit = this.handleOnSubmit.bind(this);
  }

  handleNameChange(event) {
    const value = event.target.value;
    this.setState({ name: value });
  }

  handleAddressChange(event) {
    const value = event.target.value;
    this.setState({ address: value });
  }

  handlePhoneChange(event) {
    const value = event.target.value;
    this.setState({ phone: value });
  }

  async handleOnSubmit(event) {
    event.preventDefault();
    const data = { ...this.state };
    delete data.hasSignedUp;

    const url = "http://localhost:8090/api/sales/potentialcustomer/";
    const fetchConfig = {
      method: "post",
      body: JSON.stringify(data),
      headers: {
        "Content-Type": "application/json",
      },
    };

    const response = await fetch(url, fetchConfig);
    if (response.ok) {
      const newCustomer = await response.json();
      const cleared = {
        name: "",
        address: "",
        phone: "",
        hasSignedUp: true,
      };
      this.setState(cleared);
    }
  }

  render() {
    let messageClasses = "bg-green-100 text-green-800 py-3 px-4 rounded-md text-center mt-4";
    let formClasses = "";
    if (this.state.hasSignedUp) {
      messageClasses += " block";
      formClasses = "hidden";
    } else {
      messageClasses += " hidden";
    }

    return (
      <div className="max-w-lg mx-auto p-8 bg-white rounded-lg shadow-lg mt-10">
        <h1 className="text-3xl font-bold mb-6 text-center text-indigo-600">Add a New Customer</h1>
        <form onSubmit={this.handleOnSubmit} id="create-customer-form" className={formClasses}>
          <div className="mb-4">
            <label htmlFor="name" className="block text-sm font-medium text-gray-700">
              Name
            </label>
            <input
              onChange={this.handleNameChange}
              value={this.state.name}
              required
              type="text"
              name="name"
              id="name"
              className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm p-2 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500"
            />
          </div>
          <div className="mb-4">
            <label htmlFor="address" className="block text-sm font-medium text-gray-700">
              Address
            </label>
            <input
              onChange={this.handleAddressChange}
              value={this.state.address}
              required
              type="text"
              name="address"
              id="address"
              className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm p-2 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500"
            />
          </div>
          <div className="mb-4">
            <label htmlFor="phone" className="block text-sm font-medium text-gray-700">
              Phone
            </label>
            <input
              onChange={this.handlePhoneChange}
              value={this.state.phone}
              required
              type="text"
              name="phone"
              id="phone"
              className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm p-2 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500"
            />
          </div>
          <div className="text-center">
            <button className="bg-indigo-600 hover:bg-indigo-700 text-white font-bold py-2 px-4 rounded-md shadow focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500">
              Create
            </button>
          </div>
        </form>
        <div className={messageClasses} id="success-message">
          You added a new customer.
        </div>
      </div>
    );
  }
}

export default AddPotentialCustomerForm;
