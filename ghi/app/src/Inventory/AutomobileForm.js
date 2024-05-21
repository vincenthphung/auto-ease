import React, { useState, useEffect } from 'react';

const AutomobileForm = () => {
  const [automobile, setAutomobile] = useState({
    year: '',
    color: '',
    vin: '',
    model_id: '',
    models: [],
  });

  const handleInputChange = (e) => {
    const name = e.target.name;
    const value = e.target.value;
    setAutomobile({ ...automobile, [name]: value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const data = { ...automobile };
    delete data.models;
    await fetch('http://localhost:8100/api/automobiles/', {
      method: 'POST',
      body: JSON.stringify(data),
      headers: { 'Content-Type': 'application/json' },
    }).then((e) => {
      window.location.href = '/automobiles';
    });
  };

  const fetchVehicleModels = async () => {
    const url = 'http://localhost:8100/api/models/';
    try {
      const response = await fetch(url);
      if (response.ok) {
        const theJson = await response.json();
        setAutomobile((md) => ({ ...md, models: theJson.models }));
      }
    } catch (e) {
      console.log('error', e);
    }
  };

  useEffect(() => {
    fetchVehicleModels();
  }, []);

  return (
    <div className='max-w-lg mx-auto p-6 bg-white rounded-lg shadow-lg mt-10'>
      <h1 className='text-2xl font-bold mb-6 text-center'>Add an Automobile</h1>
      <form onSubmit={handleSubmit} className='space-y-4'>
        <div>
          <label htmlFor='year' className='block text-sm font-medium text-gray-700'>Year</label>
          <input
            onChange={handleInputChange}
            value={automobile.year}
            placeholder='Year'
            required
            type='number'
            name='year'
            id='year'
            className='mt-1 block w-full border border-gray-300 rounded-md shadow-sm p-2 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500'
          />
        </div>
        <div>
          <label htmlFor='color' className='block text-sm font-medium text-gray-700'>Color</label>
          <input
            onChange={handleInputChange}
            value={automobile.color}
            placeholder='Color'
            required
            type='text'
            name='color'
            id='color'
            className='mt-1 block w-full border border-gray-300 rounded-md shadow-sm p-2 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500'
          />
        </div>
        <div>
          <label htmlFor='vin' className='block text-sm font-medium text-gray-700'>VIN</label>
          <input
            onChange={handleInputChange}
            value={automobile.vin}
            placeholder='VIN'
            required
            type='text'
            name='vin'
            id='vin'
            className='mt-1 block w-full border border-gray-300 rounded-md shadow-sm p-2 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500'
          />
        </div>
        <div>
          <label htmlFor='model_id' className='block text-sm font-medium text-gray-700'>Model</label>
          <select
            onChange={handleInputChange}
            value={automobile.model_id}
            placeholder='Model'
            name='model_id'
            id='model_id'
            className='mt-1 block w-full border border-gray-300 rounded-md shadow-sm p-2 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500'
          >
            <option value=''>Choose a Vehicle Model</option>
            {automobile.models.map((model) => {
              return (
                <option key={model.id} value={model.id}>
                  {model.name}
                </option>
              );
            })}
          </select>
        </div>
        <div className='text-right'>
          <button className='bg-indigo-600 hover:bg-indigo-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline'>
            Create
          </button>
        </div>
      </form>
    </div>
  );
};

export default AutomobileForm;
