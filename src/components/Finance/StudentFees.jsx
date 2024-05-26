import React from "react";
import Filter from "../Filter/Filter";

const data = [
	{
		status: "Cancelled",
		date: "04/03/2024",
		transactionID: "15X76D98",
		desc: "Lorem ipsum, dolor sit amet consectetur adipisicing elit.",
		amount: "₹40,000",
		actions: "View",
	},
	{
		status: "Success",
		date: "04/03/2024",
		transactionID: "20X89F51",
		desc: "Lorem ipsum, dolor sit amet consectetur adipisicing elit.",
		amount: "₹40,000",
		actions: "View",
	},
	{
		status: "Pending",
		date: "04/03/2024",
		transactionID: "20X89F51",
		desc: "Lorem ipsum, dolor sit amet consectetur adipisicing elit.",
		amount: "₹40,000",
		actions: "View",
	},
];

const StudentFees = () => {
	return (
		<>
			<div className="flex justify-between px-16">
				<h3 className="font-bold">Transaction History</h3>
			</div>
			<div className="">
				<Filter data={data} />
			</div>
		</>
	);
};

export default StudentFees;
