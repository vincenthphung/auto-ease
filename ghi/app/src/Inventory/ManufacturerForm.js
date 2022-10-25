import React from "react";


class ManufacturerCreateForm extends React.Component {
    constructor(props) {
        super(props)
        this.state = {
            name: '',
            manufacturers: []
        }
        this.handleChangeName = this.handleChangeName.bind(this)
        this.handleSubmit = this.handleSubmit.bind(this)
    }
    handleChangeName(event) {
        const value = event.target.value;
        this.setState({ name: value })
    }

    async handleSubmit(event) {
        event.preventDefault();
        const data = { ...this.state };

        const manufacturerUrl = "http://localhost:8100/api/manufacturers/";
        const fetchConfig = {
            method: "post",
            body: JSON.stringify(data),
            headers: {
                "Content-Type": "application/json",
            },
        };
        const response = await fetch(manufacturerUrl, fetchConfig);
        if (response.ok) {
            const newManfacturer = await response.json();
            console.log(newManfacturer)


            const cleared = {
                name: '',
            };
            this.setState(cleared)
        }
    }


    render() {
        return (
            <div className="row">
                <div className="offset-3 col-6">
                    <div className="shadow p-4 mt-4">
                        <h1>Create a manufacturer</h1>
                        <form onSubmit={this.handleSubmit} id="create-manufacturer-form">
                            <div className="form-floating mb-3">
                                <input onChange={this.handleNameChange} value={this.state.name} placeholder="Name" required type="text" id="name" className="form-control" />
                                <label htmlFor="name">Manufacturer Name</label>
                            </div>
                            <button className="btn btn-primary">Create</button>
                        </form>
                        <div className={messageClasses} id="success-message">
                            Congratulations! You're all signed up!
                        </div>
                    </div>
                </div>
            </div>
        );
    }
}

export default ManufacturerCreateForm;
