import React from "react";

const FilterOptions = ({ filters, onFilterChange, uniqueOptions }) => {
	return (
		<div className="flex flex-wrap mb-4" id="filter">
			<form className="w-full flex flex-wrap">
				<div className="w-1/4 p-2">
					<select
						name="status"
						className="w-full px-3 py-2 border rounded"
						onChange={onFilterChange}
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
						onChange={onFilterChange}
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
						onChange={onFilterChange}
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
						onChange={onFilterChange}
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
	);
};

export default FilterOptions;
