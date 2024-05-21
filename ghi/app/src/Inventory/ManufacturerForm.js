import React from "react";

class ManufacturerCreateForm extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      name: '',
      hasSignedUp: false,
    };
    this.handleNameChange = this.handleNameChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  handleNameChange(event) {
    const value = event.target.value;
    this.setState({ name: value });
  }

  async handleSubmit(event) {
    event.preventDefault();
    const data = { ...this.state };
    delete data.hasSignedUp;
    const ManufacturersUrl = 'http://localhost:8100/api/manufacturers/';
    const fetchConfig = {
      method: "post",
      body: JSON.stringify(data),
      headers: {
        'Content-Type': 'application/json',
      },
    };
    const response = await fetch(ManufacturersUrl, fetchConfig);
    if (response.ok) {
      const newManufacturer = await response.json();
      const cleared = {
        name: '',
        hasSignedUp: true,
      };
      this.setState(cleared);
    }
  }

  render() {
    let messageClasses = 'hidden';
    let formClasses = '';
    if (this.state.hasSignedUp) {
      messageClasses = 'block bg-green-100 text-green-800 py-2 px-4 rounded-md text-center';
      formClasses = 'hidden';
    }
    return (
      <div className="max-w-lg mx-auto p-6 bg-white rounded-lg shadow-lg mt-10">
        <h1 className="text-2xl font-bold mb-6 text-center">Add a Manufacturer</h1>
        <form onSubmit={this.handleSubmit} id="create-manufacturers-form" className={formClasses}>
          <div className="space-y-4">
            <div>
              <label htmlFor="name" className="block text-sm font-medium text-gray-700">Name</label>
              <input
                onChange={this.handleNameChange}
                value={this.state.name}
                placeholder="Name"
                required
                type="text"
                name="name"
                id="name"
                className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm p-2 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500"
              />
            </div>
            <div className="text-center">
              <button className="bg-indigo-600 hover:bg-indigo-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline">
                Create
              </button>
            </div>
          </div>
        </form>
        <div className={messageClasses} id="success-message">
          You added a manufacturer.
        </div>
      </div>
    );
  }
}

export default ManufacturerCreateForm;
