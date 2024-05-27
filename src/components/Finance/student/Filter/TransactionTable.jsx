import React from "react";

const TransactionTable = ({ data }) => {
	return (
		<div className="flex items-center justify-center">
			<div className="container">
				<table className="w-full  sm:bg-white rounded-lg overflow-hidden sm:shadow-lg my-5">
					<thead className="text-white">
						<tr className="bg-linear-blue flex flex-col flex-no wrap sm:table-row rounded-l-lg sm:rounded-none mb-2 sm:mb-0">
							<th className="p-3 w-fit text-center">Status</th>
							<th className="p-3 w-fit text-center">Date</th>
							<th className="p-3 w-fit text-center">Ref No.</th>
							<th className="p-3 w-fit text-center">Description</th>
							<th className="p-3 w-fit text-center">Amount</th>
							<th className="p-3 w-fit text-center" width="110px">
								Actions
							</th>
						</tr>
					</thead>
					<tbody className="flex-1 sm:flex-none">
						{data.map((item, index) => (
							<tr
								className="flex flex-col flex-no wrap sm:table-row mb-2 sm:mb-0"
								key={index}
							>
								<td className="border-grey-light border hover:bg-gray-100 p-3">
									{item.status}
								</td>
								<td className="border-grey-light border hover:bg-gray-100 p-3">
									{item.date}
								</td>
								<td className="border-grey-light border hover:bg-gray-100 p-3">
									{item.transactionID}
								</td>
								<td className="border-grey-light border hover:bg-gray-100 p-3">
									{item.desc}
								</td>
								<td className="border-grey-light border hover:bg-gray-100 p-3">
									{item.amount}
								</td>
								<td className="border-grey-light border px-2">
									<button className="w-full bg-linear-blue px-3 py-2 text-white rounded-md hover:font-medium">
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

export default TransactionTable;
