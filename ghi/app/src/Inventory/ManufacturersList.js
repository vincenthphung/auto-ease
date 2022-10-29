import React from 'react';


class ManufacturersList extends React.Component {
    constructor(props) {
        super(props)
        this.state = {
            manufacturers: []
        };
    }


    async componentDidMount() {
        const url = "http://localhost:8100/api/manufacturers/";
        const response = await fetch(url);
        if (response.ok) {
            const data = await response.json();
            this.setState({manufacturers: data.manufacturers});
        };
    }


    render() {
        return(
        <div className="container overflow-hidden mt-5">
            <div className="row gy-5">
            <h2 className="mt-5"><b>Manufacturers</b></h2>
            <table className="table table-striped mt-3">
               <thead>
                    <tr>
                        <th>Name</th>
                    </tr>
                </thead>
               <tbody>
                    {this.state.manufacturers.map(manufacturer => {
                        return (
                            <tr key={manufacturer.id}>
                                <td>{ manufacturer.name }</td>
                            </tr>
                        );
                    })}
                </tbody>
            </table>
        </div>
        </div>
        )
    }
}


export default ManufacturersList;
