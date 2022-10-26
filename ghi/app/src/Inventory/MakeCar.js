import React, { useState, useEffect } from 'react';

const MakeCar = () => {
	const [vehicleModel, setVehicleModel] = useState({
		name: '',
		picture_url: '',
		manufacturer_id: '',
		manufacturers: [],
	});

	const handleInputChange = (e) => {
		const name = e.target.name;
		const value = e.target.value;
		setVehicleModel({ ...vehicleModel, [name]: value });
	};

	const handleSubmit = async (e) => {
		e.preventDefault();
		const data = { ...vehicleModel };
		delete data.manufacturers;
		console.log(data);
		await fetch('http://localhost:8100/api/models/', {
			method: 'POST',
			body: JSON.stringify(data),
			headers: { 'Content-Type': 'application/json' },
		}).then((e) => {
			window.location.href = '/models';
		});
	};

	const fetchManufacturers = async () => {
		const url = 'http://localhost:8100/api/manufacturers/';
		try {
			const response = await fetch(url);

			if (response.ok) {
				const theJson = await response.json();
				setVehicleModel((mn) => ({
					...mn,
					manufacturers: theJson.manufacturers,
				}));
			}
		} catch (e) {
			console.log('error', e);
		}
	};

	useEffect(() => {
		fetchManufacturers();
	}, []);
	return (
		<div className='container-fluid'>
			<div className='row'>
				<div className='offset-3 col-6'>
					<div className='shadow p-4 mt-4'>
						<h1>Create a New Vehicle Model</h1>

						<form onSubmit={handleSubmit} className='form'>
							<div className='form-floating mb-3'>
								<input
									onChange={handleInputChange}
									value={vehicleModel.name}
									placeholder='Name'
									required
									type='text'
									name='name'
									id='name'
									className='form-control'
								/>
								<label htmlFor='name'>Name</label>
							</div>
							<div className='mb-3'>
								<textarea
									onChange={handleInputChange}
									value={vehicleModel.picture_url}
									placeholder='Picture'
									required
									type='text'
									rows='3'
									name='picture_url'
									id='picture_url'
									className='form-control'
								></textarea>
							</div>
							<div className='mb-3'>
								<select
									onChange={handleInputChange}
									value={vehicleModel.manufacturer_id}
									placeholder='Manufacturer'
									name='manufacturer_id'
									id='manufacturer_id'
									className='form-control'
								>
									<option value=''>Choose an Manufacturer</option>
									{vehicleModel.manufacturers.map((manufacturer) => {
										return (
											<option key={[manufacturer.id]} value={[manufacturer.id]}>
												{manufacturer.name}
											</option>
										);
									})}
								</select>
							</div>
							<div className='d-grid gap-2 d-md-flex justify-content-md-end'>
								<button className='btn btn-outline-success'>Create</button>
							</div>
						</form>
					</div>
				</div>
			</div>
		</div>
	);
};

export default MakeCar;
