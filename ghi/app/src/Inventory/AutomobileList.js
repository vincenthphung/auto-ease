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
		<div className='max-w-7xl mx-auto p-6 bg-white rounded-lg shadow-lg mt-10'>
			<div className='flex justify-end mb-4'>
				<Link className='bg-green-600 hover:bg-green-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline' to='/automobiles/new'>
					Add a New Automobile
				</Link>
			</div>
			{loading && (
				<div className='text-center'>
					<h1>Loading...</h1>
				</div>
			)}
			<h1 className='text-2xl font-bold mb-4'>Available Automobiles</h1>
			<table className='min-w-full divide-y divide-gray-200'>
				<thead className='bg-gray-50'>
					<tr>
						<th className='px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider'>Year</th>
						<th className='px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider'>Color</th>
						<th className='px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider'>VIN</th>
						<th className='px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider'>Model</th>
					</tr>
				</thead>
				<tbody className='bg-white divide-y divide-gray-200'>
					{automobiles.map((automobile) => (
						<tr key={automobile.href}>
							<td className='px-6 py-4 whitespace-nowrap'>{automobile.year}</td>
							<td className='px-6 py-4 whitespace-nowrap'>{automobile.color}</td>
							<td className='px-6 py-4 whitespace-nowrap'>{automobile.vin}</td>
							<td className='px-6 py-4 whitespace-nowrap'>{automobile.model.name}</td>
						</tr>
					))}
				</tbody>
			</table>
		</div>
	);
};

export default AutomobileList;
