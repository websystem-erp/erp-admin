import React, { useState, useEffect } from "react";
import axios from "axios";
import Employee from "../main/dashboard/employeesDetails/Employee";

const Payroll = () => {
	const [employeeReq, setEmployeeReq] = useState([]);

	useEffect(() => {
		const api = "https://jsonplaceholder.typicode.com/comments";

		const fetchData = async () => {
			try {
				const response = await axios.get(api);
				setEmployeeReq(response.data);
				console.log(response.data);
			} catch (error) {
				console.error("Error fetching data:", error);
			}
		};

		fetchData();
	}, []);
	return (
		<>
			<h3 className="font-bold text-2xl">Individual Records</h3>
			<Employee />
		</>
	);
};

export default Payroll;
