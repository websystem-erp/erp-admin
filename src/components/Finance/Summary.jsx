import React from "react";
import Card from "../main/dashboard/Card";
import LineChart from "../main/dashboard/charts/LineChart";
import SummaryCard from "./summary/SummaryCard";
import TransactionsDetails from "./summary/TransactionsDetails";
const Summary = () => {
	return (
		<>
			<div className="flex flex-wrap justify-center items-center">
				<Card
					icon={"vaadin:piggy-bank-coin"}
					title={"Bank Balance"}
					number={"₹30.1L"}
					iconClass={"salary-icon"}
					iconColor={"bg-linear-green"}
				/>
				<Card
					icon={"ri:money-rupee-circle-line"}
					title={"Fee Collected"}
					number={"₹25L"}
					iconClass={"salary-icon"}
					iconColor={"bg-linear-green"}
				/>
				<Card
					icon={"clarity:employee-group-solid"}
					title={"Expenses"}
					number={"₹10L"}
					iconClass={"salary-icon"}
					iconColor={"bg-linear-red"}
				/>
			</div>
			<div className="flex flex-col lg:flex-row justify-between px-16">
				<div className="relative w-full lg:w-4/5 h-[200px] lg:h-auto my-8 mx-0 lg:mx-16 bg-white rounded-2xl">
					<LineChart />
				</div>
				<div className="w-full lg:w-fit">
					<SummaryCard />
				</div>
			</div>
			<div className="mt-16">
				<TransactionsDetails />
			</div>
		</>
	);
};

export default Summary;
