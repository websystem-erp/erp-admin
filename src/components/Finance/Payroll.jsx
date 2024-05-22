import React, { useState, useEffect } from "react";
import anju from "../../assets/user/anju.jpg";
import akriti from "../../assets/user/akriti.jpg";
import ankur from "../../assets/user/ankur.jpg";
import vikas from "../../assets/user/vikas.jpg";
import Employee from "../main/dashboard/employeesDetails/Employee";

const Payroll = () => {
	const [employeeReq, setEmployeeReq] = useState([]);
	const photos = [anju, akriti, ankur, vikas];
	const photoNames = ["Anju", "Akriti", "Ankur", "Vikas"];

	useEffect(() => {
		const api = "https://jsonplaceholder.typicode.com/comments";

		fetch(api)
			.then((response) => response.json())
			.then((data) => {
				setEmployeeReq(data);
				console.log(employeeReq);
			})
			.catch((error) => console.log("Error: ", error));
	}, []);
	return (
		<>
			<h3 className="font-bold text-2xl">Individual Records</h3>
			<Employee />
		</>
	);
};

export default Payroll;
