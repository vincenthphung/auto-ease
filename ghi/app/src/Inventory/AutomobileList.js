import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';


  const AutomobileList = () => {
	const [loading, setLoading] = useState(false);
	const [automobiles, setAutomobiles] = useState([]);
	const url = 'http://localhost:8100/api/automobiles/';

	const fetchData = async () => {
		try {
			const response = await fetch(url);
			if (response.ok) {
				const theJson = await response.json();

				setLoading(false);
				setAutomobiles(theJson.autos);
			}
		} catch (e) {
			console.log('error', e);
		}
	};
	useEffect(() => {
		setLoading(true);
		fetchData();
	}, []);

	return (
		<div className='container-fluid p-2'>
			<div className='d-grid gap-2 d-md-flex justify-content-md-center'>
				<Link className='btn btn-outline-success g-2' to='/automobiles/new'>
					Add a New Automobile
				</Link>
			</div>
			{loading && (
				<div>
					{' '}
					<h1>Loading...</h1>
				</div>
			)}
			<h1>Available Automobiles</h1>
			<table className='table table-striped'>
				<thead>
					<tr>
						<th>Year</th>
						<th>Color</th>
						<th>VIN</th>
						<th>Model</th>
					</tr>
				</thead>
				<tbody>
					{automobiles.map((automobile) => {
						return (
							<tr key={automobile.href}>
								<td>{automobile.year}</td>
								<td>{automobile.color}</td>
								<td>{automobile.vin}</td>
								<td>{automobile.model.name}</td>
							</tr>
						);
					})}
				</tbody>
			</table>
		</div>
	);
};

export default AutomobileList
