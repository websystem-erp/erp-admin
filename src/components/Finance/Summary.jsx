import React from "react";
import Card from "../main/dashboard/Card";
import LineChart from "../main/dashboard/charts/LineChart";
import SummaryCard from "./summary/SummaryCard";
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
			<div className="flex justify-around ">
				<div className="relative w-[60%] my-8">
					<LineChart />
				</div>
				<div className="w-[20%]">
					<SummaryCard />
				</div>
			</div>
		</>
	);
};

export default Summary;
