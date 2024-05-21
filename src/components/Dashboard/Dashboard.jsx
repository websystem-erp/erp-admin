import React from "react";
import CardContainer from "../main/dashboard/CardContainer";
import ChartContainer from "../main/dashboard/charts/ChartContainer";
// import EmployeesDetailsContainer from "../main/dashboard/employeesDetails/EmployeesDetailsContainer";
import Employee from "../main/dashboard/employeesDetails/Employee";

const Dashboard = () => {
	return (
		<>
			<CardContainer />
			<ChartContainer />
			<Employee />
		</>
	);
};

export default Dashboard;
