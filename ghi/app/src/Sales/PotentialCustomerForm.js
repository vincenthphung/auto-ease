import React from "react";

class AddPotentialCustomerForm extends React.Component {
    constructor(props) {
        super(props)
        this.state = {
            name: '',
            address: '',
            phone: '',
        }

        this.handleNameChange = this.handleNameChange.bind(this);
        this.handleAddressChange = this.handleAddressChange.bind(this);
        this.handlePhoneChange = this.handlePhoneChange.bind(this);
        this.handleOnSubmit = this.handleOnSubmit.bind(this);
    }

    handleNameChange(event) {
        const value = event.target.value;
        this.setState({ name: value })
    }

    handleAddressChange(event){
        const value = event.target.value;
        this.setState({ address: value })

    }


    handlePhoneChange(event){
        const value = event.target.value;
        this.setState({ phone: value })
    }

    async handleOnSubmit(event){
        event.preventDefault()
        const data = {...this.state}

        const url = 'http://localhost:8090/api/sales/potentialcustomer/';
        const fetchConfig = {
            method: "post",
            body: JSON.stringify(data),
            headers: {
                'Content-Type': 'application/json',
            },
        }

        const response = await fetch(url, fetchConfig);
        if (response.ok) {
            const newCustomer = await response.json();
            console.log(newCustomer)

            const cleared = {
                name: '',
                address: '',
                phone: '',
            };
            this.setState(cleared);
    }
}


    render() {
        return (
            <div className="row">
                <div className="offset-3 col-6">
                    <div className="shadow p-4 mt-4">
                        <h1>Create a new customer</h1>
                        <form onSubmit={this.handleOnSubmit} id="create-auto-form">
                            <div className="form-floating mb-3">
                                <input onChange={this.handleNameChange} value={this.state.name} placeholder="Name" required type="text" name="name" id="name" className="form-control" />
                                <label htmlFor="name">Name</label>
                            </div>
                            <div className="form-floating mb-3">
                                <input onChange={this.handleAddressChange} value={this.state.address} placeholder="Address" required type="text" name="name" id="address" className="form-control" />
                                <label htmlFor="name">Address</label>
                            </div>
                            <div className="form-floating mb-3">
                                <input onChange={this.handlePhoneChange} value={this.state.phone} placeholder="Phone" required type="text" name="phone" id="phone" className="form-control" />
                                <label htmlFor="name">Phone</label>
                            </div>
                            <button className="btn btn-primary">Create</button>
                        </form>
                        <div className={this.state.success ? "alert alert-success mt-4" : "d-none"} id="success-message">
                            New customer is added.
                        </div>
                    </div>
                </div >
            </div >
        );
    }
}

export default AddPotentialCustomerForm;
