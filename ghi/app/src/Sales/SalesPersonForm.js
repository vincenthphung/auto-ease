import React from "react"

class AddSalesPersonForm extends React.Component {
    constructor(props) {
        super(props)
        this.state = {
            name: '',
            employee_id: '',
        }

        this.handleNameChange = this.handleNameChange.bind(this);
        this.handleEmployeeIDChange = this.handleEmployeeIDChange.bind(this);
        this.handleOnSubmit = this.handleOnSubmit.bind(this);
    }

    handleNameChange(event) {
        const value = event.target.value;
        this.setState({ name: value })
    }

    handleEmployeeIdChange(event) {
        const value = event.target.value;
        this.setState({ employee_id: value })

    }

    async handleOnSubmit(event) {
        event.preventDefault()
        const data = { ...this.state }

        const url = 'http://localhost:8090/api/sales/person/';
        const fetchConfig = {
            method: "post",
            body: JSON.stringify(data),
            headers: {
                'Content-Type': 'application/json',
            },
        };

        const response = await fetch(url, fetchConfig);
        if (response.ok) {
            const newSalesPerson = await response.json();
            console.log(newSalesPerson)

            const cleared = {
                name: '',
                employee_id: '',
            };
            this.setState(cleared);
        };
    }


    render() {
        return (
            <div className="row">
                <div className="offset-3 col-6">
                    <div className="shadow p-4 mt-4">
                        <h1>Create a sales person</h1>
                        <form onSubmit={this.handleOnSubmit} id="create-salesperson-form">
                            <div className="form-floating mb-3">
                                <input onChange={this.handleNameChange} value={this.state.name} placeholder="Name" required type="text" name="name" id="name" className="form-control" />
                                <label htmlFor="name">Name</label>
                            </div>
                            <div className="form-floating mb-3">
                                <input onChange={this.handleEmployeeIdChange} value={this.state.employee_id} placeholder="Employee Id" required type="text" name="employee_id" id="employee_id" className="form-control" />
                                <label htmlFor="employee_id">Employee Id</label>
                            </div>

                            <button className="btn btn-primary">Create</button>
                        </form>
                    </div>
                </div>
            </div>
        );
    }
}

export default AddSalesPersonForm;
