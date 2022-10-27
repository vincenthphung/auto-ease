import React from "react";


class ManufacturerCreateForm extends React.Component {
    constructor(props) {
        super(props)
        this.state = {
            name: '',
            hasSignedUp: false,
        }
        this.handleNameChange = this.handleNameChange.bind(this)
        this.handleSubmit = this.handleSubmit.bind(this)
    }
    handleNameChange(event) {
        const value = event.target.value
        this.setState({ name: value })
    }

    async handleSubmit(event) {
        event.preventDefault()
        const data = { ...this.state }
        delete data.hasSignedUp;
        const ManufacturersUrl = 'http://localhost:8100/api/manufacturers/'
        const fetchConfig = {
            method: "post",
            body: JSON.stringify(data),
            headers: {
                'Content-Type': 'application/json'
            }
        }
        const response = await fetch(ManufacturersUrl, fetchConfig)
        if (response.ok) {
            const newManufacturer = await response.json()
            const cleared = {
                name: '',
                hasSignedUp: true,
            }
            this.setState(cleared)
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
                        <h1>Add a manufacturer</h1>
                        <form onSubmit={this.handleSubmit} id="create-manufacturers-form">
                            <div className="form-floating mb-3">
                                <input onChange={this.handleNameChange} value={this.state.name} placeholder="name" required type="text" name="name" id="name" className="form-control" />
                                <label htmlFor="manufacturer">Name</label>
                            </div>
                            <button className="btn btn-primary">Create</button>
                        </form>
                        <div className={messageClasses} id="success-message">
                            You added a manufacturer.
                       </div>
                    </div>
                </div>
            </div>
        );
    }
}


export default ManufacturerCreateForm;
