import React from 'react';

class ManufacturersList extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      manufacturers: [],
    };
  }

  async componentDidMount() {
    const url = "http://localhost:8100/api/manufacturers/";
    const response = await fetch(url);
    if (response.ok) {
      const data = await response.json();
      this.setState({ manufacturers: data.manufacturers });
    }
  }

  render() {
    return (
      <div className="max-w-7xl mx-auto p-6 bg-white rounded-lg shadow-lg mt-10">
        <h1 className="text-3xl font-bold mb-6 text-center text-blue-700">Manufacturers</h1>
        <table className="min-w-full divide-y divide-gray-200">
          <thead className="bg-gray-100">
            <tr>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Name</th>
            </tr>
          </thead>
          <tbody className="bg-white divide-y divide-gray-200">
            {this.state.manufacturers.map((manufacturer) => (
              <tr key={manufacturer.id} className="hover:bg-gray-50 transition duration-150">
                <td className="px-6 py-4 whitespace-nowrap text-gray-700">{manufacturer.name}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    );
  }
}

export default ManufacturersList;
