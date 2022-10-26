import react, { useState, useEffect } from 'react';

const AutomobileForm = () => {
	const [automobile, setAutomobile] = useState({
		year: 0,
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
		<div className='container-fluid'>
			<div className='row'>
				<div className='offset-3 col-6'>
					<div className='shadow p-4 mt-4'>
						<h1>Create a New Automobile</h1>

						<form onSubmit={handleSubmit} className='form'>
							<div className='form-floating mb-3'>
								<input
									onChange={handleInputChange}
									value={automobile.year}
									placeholder='Year'
									required
									type='number'
									name='year'
									id='year'
									className='form-control'
								/>
								<label htmlFor='year'>Year</label>
							</div>
							<div className='form-floating mb-3'>
								<input
									onChange={handleInputChange}
									value={automobile.color}
									placeholder='Color'
									required
									type='text'
									name='color'
									id='color'
									className='form-control'
								/>
								<label htmlFor='color'>Color</label>
							</div>
							<div className='form-floating mb-3'>
								<input
									onChange={handleInputChange}
									value={automobile.vin}
									placeholder='VIN'
									required
									type='text'
									name='vin'
									id='vin'
									className='form-control'
								/>
								<label htmlFor='vin'>VIN</label>
							</div>
							<div className='mb-3'>
								<select
									onChange={handleInputChange}
									value={automobile.model_id}
									placeholder='Manufacturer'
									name='model_id'
									id='model_id'
									className='form-control'
								>
									<option value=''>Choose an Vehicle Model</option>
									{automobile.models.map((model) => {
										return (
											<option key={[model.id]} value={[model.id]}>
												{model.name}
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

export default AutomobileForm
