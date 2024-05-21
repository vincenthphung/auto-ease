import { useEffect, useState } from "react";

const MakeCar = () => {
  const [name, setName] = useState("");
  const [pictureUrl, setPictureUrl] = useState("");
  const [manufacturers, setManufacturers] = useState([]);
  const [selectedManufacturer, setSelectedManufacturer] = useState("");
  const [submitted, setSubmitted] = useState(false);

  useEffect(() => {
    const fetchManufacturers = async () => {
      const url = "http://localhost:8100/api/manufacturers/";
      const response = await fetch(url);

      if (response.ok) {
        const data = await response.json();
        setManufacturers(data.manufacturers);
      }
    };
    fetchManufacturers();
  }, []);

  const handleSubmit = async (event) => {
    event.preventDefault();

    const picture_url = pictureUrl;
    const manufacturer_id = selectedManufacturer;
    const data = { name, picture_url, manufacturer_id };

    const modelUrl = "http://localhost:8100/api/models/";
    const fetchConfig = {
      method: "post",
      body: JSON.stringify(data),
      headers: {
        "Content-Type": "application/json",
      },
    };

    const response = await fetch(modelUrl, fetchConfig);
    if (response.ok) {
      event.target.reset();
      setName("");
      setPictureUrl("");
      setSelectedManufacturer("");
      setSubmitted(true);
    }
  };

  return (
    <div className="max-w-lg mx-auto p-6 bg-white rounded-lg shadow-lg mt-10">
      <h1 className="text-2xl font-bold mb-6 text-center">Create a New Model</h1>
      <form id="create-model-form" onSubmit={handleSubmit} className="space-y-4">
        <div>
          <label htmlFor="name" className="block text-sm font-medium text-gray-700">Model Name</label>
          <input
            onChange={(e) => setName(e.target.value)}
            placeholder="Model Name"
            required
            type="text"
            name="name"
            id="name"
            className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm p-2 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500"
          />
        </div>
        <div>
          <label htmlFor="pictureUrl" className="block text-sm font-medium text-gray-700">Picture URL</label>
          <input
            onChange={(e) => setPictureUrl(e.target.value)}
            placeholder="Picture URL"
            required
            type="text"
            name="pictureUrl"
            id="pictureUrl"
            className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm p-2 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500"
          />
        </div>
        <div>
          <label htmlFor="manufacturer" className="block text-sm font-medium text-gray-700">Manufacturer</label>
          <select
            onChange={(e) => setSelectedManufacturer(e.target.value)}
            required
            name="manufacturer"
            id="manufacturer"
            className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm p-2 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500"
          >
            <option value="">Select a Manufacturer</option>
            {manufacturers.map((manufacturer) => {
              return (
                <option key={manufacturer.id} value={manufacturer.id}>
                  {manufacturer.name}
                </option>
              );
            })}
          </select>
        </div>
        <div className="text-center">
          <button className="bg-indigo-600 hover:bg-indigo-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline">
            Create
          </button>
        </div>
      </form>
      {submitted && (
        <div className="alert alert-success mt-4 p-4 rounded-md text-center">
          Your model has been created!
        </div>
      )}
    </div>
  );
};

export default MakeCar;
