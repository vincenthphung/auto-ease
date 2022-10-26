import React from "react";


class ManufacturerCreateForm extends React.Component {
    constructor(props) {
        super(props)
        this.state = {
            name: '',
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
            }
            this.setState(cleared)
        }
    }


    render() {
        return (
            <div className="row">
                <div className="offset-3 col-6">
                    <div className="shadow p-4 mt-4">
                        <h1>Create a manufacturer</h1>
                        <form onSubmit={this.handleSubmit} id="create-manufacturers-form">
                            <div className="form-floating mb-3">
                                <input onChange={this.handleNameChange} value={this.state.name} placeholder="name" required type="text" name="name" id="name" className="form-control" />
                                <label htmlFor="manufacturer">Name</label>
                            </div>
                            <div className='d-grid gap-2 d-md-flex justify-content-md-end'>
								<button className='btn btn-outline-success'>Create</button>
							</div>
                        </form>
                    </div>
                </div>
            </div>
        );
    }
}


export default ManufacturerCreateForm;
