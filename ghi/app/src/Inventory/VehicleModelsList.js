import React from 'react';

class VehicleModelsList extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      models: []
    }
  }

  async componentDidMount() {
    const url = 'http://localhost:8100/api/models/';
    try {
      const response = await fetch(url);
      if (response.ok) {
        const data = await response.json();
        this.setState({ models: data.models });
      }
    } catch (e) {
      console.error(e);
    }
  }

  render() {
    return (
      <div className="max-w-7xl mx-auto p-6 bg-white rounded-lg shadow-lg mt-10">
        <h1 className="text-3xl font-bold mb-6 text-center text-blue-700">Vehicle Models</h1>
        <table className="min-w-full divide-y divide-gray-200">
          <thead className="bg-gray-100">
            <tr>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Name</th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Manufacturer</th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Picture</th>
            </tr>
          </thead>
          <tbody className="bg-white divide-y divide-gray-200">
            {this.state.models.map(model => {
              return (
                <tr key={model.id} className="hover:bg-gray-50 transition duration-150">
                  <td className="px-6 py-4 whitespace-nowrap text-gray-700">{model.name}</td>
                  <td className="px-6 py-4 whitespace-nowrap text-gray-700">{model.manufacturer.name}</td>
                  <td className="px-6 py-4 whitespace-nowrap"><img src={model.picture_url} alt="car" className="w-32 h-24 object-cover rounded-md shadow-sm" /></td>
                </tr>
              )
            })}
          </tbody>
        </table>
      </div>
    )
  }
}

export default VehicleModelsList;
