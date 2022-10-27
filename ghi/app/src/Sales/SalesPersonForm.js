import React from "react"

class AddSalesPersonForm extends React.Component {
    constructor(props) {
        super(props)
        this.state = {
            name: '',
            id: '',
            hasSignedUp: false,
        }

        this.handleNameChange = this.handleNameChange.bind(this);
        this.handleIdChange = this.handleIdChange.bind(this);
        this.handleOnSubmit = this.handleOnSubmit.bind(this);
    }

    handleNameChange(event) {
        const value = event.target.value;
        this.setState({ name: value })
    }

    handleIdChange(event) {
        const value = event.target.value;
        this.setState({ id: value })

    }

    async handleOnSubmit(event) {
        event.preventDefault()
        const data = { ...this.state }
        delete data.hasSignedUp;

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

            const cleared = {
                name: '',
                id: '',
                hasSignedUp: true,
            };
            this.setState(cleared);
        };
    }


    render() {
        let messageClasses = 'alert alert-success d-none mb-0';
        let formClasses = '';
        if (this.state.hasSignedUp) {
        messageClasses = 'alert alert-success mb-0';
        formClasses = 'd-none';
        }
        return (
            <div className="row">
                <div className="offset-3 col-6">
                    <div className="shadow p-4 mt-4">
                        <h1>Add a new sales person</h1>
                        <form onSubmit={this.handleOnSubmit} id="create-salesperson-form">
                            <div className="form-floating mb-3">
                                <input onChange={this.handleNameChange} value={this.state.name} placeholder="Name" required type="text" name="name" id="name" className="form-control" />
                                <label htmlFor="name">Name</label>
                            </div>
                            <div className="form-floating mb-3">
                                <input onChange={this.handleIdChange} value={this.state.id} placeholder="Id" required type="text" name="id" id="id" className="form-control" />
                                <label htmlFor="employee_id">Employee Id</label>
                            </div>
                            <button className="btn btn-primary">Create</button>
                        </form>
                        <div className={messageClasses} id="success-message">
                            You added a sales person.
                       </div>
                    </div>
                </div>
            </div>
        );
    }
}

export default AddSalesPersonForm;
