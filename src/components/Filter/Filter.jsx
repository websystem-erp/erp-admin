import React, { useState } from "react";
import { Icon } from "@iconify/react";

const Filter = ({ data }) => {
	const [filters, setFilters] = useState({});
	const [searchQuery, setSearchQuery] = useState("");

	const handleFilterChange = (e) => {
		const { name, value } = e.target;
		setFilters((prev) => ({
			...prev,
			[name]: value,
		}));
	};

	const handleSearchChange = (e) => {
		setSearchQuery(e.target.value.toLowerCase());
	};

	const handleSearchSubmit = (e) => {
		e.preventDefault();
	};

	const filteredData = data.filter((item) => {
		const matchesSearchQuery =
			item.transactionID.toLowerCase().includes(searchQuery) ||
			item.desc.toLowerCase().includes(searchQuery);

		const matchesFilters = Object.keys(filters).every((key) =>
			filters[key] === ""
				? true
				: item[key].toLowerCase() === filters[key].toLowerCase()
		);

		return matchesSearchQuery && matchesFilters;
	});

	const uniqueOptions = (key) => [...new Set(data.map((item) => item[key]))];

	return (
		<div className="container mx-auto p-4">
			<div className="flex w-fit mb-4" id="search">
				<form
					id="search-form"
					onSubmit={handleSearchSubmit}
					className="flex bg-white rounded-full p-2 border"
				>
					<Icon icon="ic:round-search" height={48} />
					<input
						className="form-control w-full px-4 py-2 border-none focus:border-none focus:outline-none"
						style={{
							outline: "none",
							boxShadow: "none",
						}}
						type="text"
						placeholder="Search"
						value={searchQuery}
						onChange={handleSearchChange}
					/>
					<button
						type="submit"
						className="w-fit bg-linear-blue bg-blue-500 text-white py-2 px-8 rounded-full"
					>
						Search
					</button>
				</form>
			</div>
			<div className="flex flex-wrap mb-4" id="filter">
				<form className="w-full flex flex-wrap">
					<div className="w-1/4 p-2">
						<select
							name="status"
							className="w-full px-3 py-2 border rounded"
							onChange={handleFilterChange}
						>
							<option value="">Select Status</option>
							{uniqueOptions("status").map((status) => (
								<option key={status} value={status}>
									{status}
								</option>
							))}
						</select>
					</div>
					<div className="w-1/4 p-2">
						<select
							name="date"
							className="w-full px-3 py-2 border rounded"
							onChange={handleFilterChange}
						>
							<option value="">Select Date</option>
							{uniqueOptions("date").map((date) => (
								<option key={date} value={date}>
									{date}
								</option>
							))}
						</select>
					</div>
					<div className="w-1/4 p-2">
						<select
							name="transactionID"
							className="w-full px-3 py-2 border rounded"
							onChange={handleFilterChange}
						>
							<option value="">Select Transaction ID</option>
							{uniqueOptions("transactionID").map((transactionID) => (
								<option key={transactionID} value={transactionID}>
									{transactionID}
								</option>
							))}
						</select>
					</div>
					<div className="w-1/4 p-2">
						<select
							name="amount"
							className="w-full px-3 py-2 border rounded"
							onChange={handleFilterChange}
						>
							<option value="">Select Amount</option>
							{uniqueOptions("amount").map((amount) => (
								<option key={amount} value={amount}>
									{amount}
								</option>
							))}
						</select>
					</div>
				</form>
			</div>
			<div className="mt-4">
				<table className="w-fit overflow-auto">
					<thead>
						<tr>
							<th className="text-center">Status</th>
							<th className="text-center">Date</th>
							<th className="text-center">Ref No.</th>
							<th className="text-center">Description</th>
							<th className="text-center">Amount</th>
							<th className="text-center">Actions</th>
						</tr>
					</thead>
					<tbody>
						{filteredData.map((item, index) => (
							<tr key={index}>
								<td className="text-center py-4">{item.status}</td>
								<td className="text-center py-4">{item.date}</td>
								<td className="text-center py-4">{item.transactionID}</td>
								<td className="text-center py-4">{item.desc}</td>
								<td className="text-center py-4">{item.amount}</td>
								<td className="text-center">
									<button className="bg-green-500 px-8 py-2 rounded-full text-white">
										{item.actions}
									</button>
								</td>
							</tr>
						))}
					</tbody>
				</table>
			</div>
		</div>
	);
};

export default Filter;
