import React from "react";
import CardContainer from "../main/dashboard/CardContainer";
import ChartContainer from "../main/dashboard/charts/ChartContainer";
import EmployeesDetailsContainer from "../main/dashboard/employeesDetails/EmployeesDetailsContainer";

const Dashboard = () => {
	return (
		<>
			<CardContainer />
			<ChartContainer />
			<EmployeesDetailsContainer />
		</>
	);
};

export default Dashboard;
