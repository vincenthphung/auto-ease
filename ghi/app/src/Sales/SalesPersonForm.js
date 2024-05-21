import React from "react";

class AddSalesPersonForm extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      name: "",
      id: "",
      hasSignedUp: false,
    };

    this.handleNameChange = this.handleNameChange.bind(this);
    this.handleIdChange = this.handleIdChange.bind(this);
    this.handleOnSubmit = this.handleOnSubmit.bind(this);
  }

  handleNameChange(event) {
    const value = event.target.value;
    this.setState({ name: value });
  }

  handleIdChange(event) {
    const value = event.target.value;
    this.setState({ id: value });
  }

  async handleOnSubmit(event) {
    event.preventDefault();
    const data = { ...this.state };
    data["employee_id"] = data["id"];
    delete data.id;
    delete data.hasSignedUp;

    const url = "http://localhost:8090/api/sales/person/";
    const fetchConfig = {
      method: "post",
      body: JSON.stringify(data),
      headers: {
        "Content-Type": "application/json",
      },
    };

    const response = await fetch(url, fetchConfig);
    if (response.ok) {
      const newSalesPerson = await response.json();
      const cleared = {
        name: "",
        id: "",
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
        <h1 className="text-3xl font-bold mb-6 text-center text-indigo-600">Add a New Sales Person</h1>
        <form onSubmit={this.handleOnSubmit} id="create-salesperson-form" className={formClasses}>
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
            <label htmlFor="employee_id" className="block text-sm font-medium text-gray-700">
              Employee ID
            </label>
            <input
              onChange={this.handleIdChange}
              value={this.state.id}
              required
              type="text"
              name="id"
              id="employee_id"
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
          You added a new sales person.
        </div>
      </div>
    );
  }
}

export default AddSalesPersonForm;
