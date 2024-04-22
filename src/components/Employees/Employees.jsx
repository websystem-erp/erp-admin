import React, { useState, useEffect } from "react";
import ChartWrapper from "../main/dashboard/charts/ChartWrapper";
import BarChart from "../main/dashboard/charts/BarChart";
import { attendance } from "../data/sourceData";
import EmployeesCard from "./EmployeesCard";
import anju from "../../assets/user/anju.jpg";
import akriti from "../../assets/user/akriti.jpg";
import ankur from "../../assets/user/ankur.jpg";
import vikas from "../../assets/user/vikas.jpg";
import EmployeesDetailsContainer from "../main/dashboard/employeesDetails/EmployeesDetailsContainer";

const Employees = () => {
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
			<div className="p-4 flex flex-wrap">
				<div className="lg:w-3/5 w-full ">
					<h3 className="font-bold text-2xl">Attendance</h3>
					<div className="flex flex-wrap justify-between px-8">
						<ChartWrapper
							chartType={<BarChart data={attendance} />}
							title={"Attendance"}
							desc={"(-10%) increase in this month"}
							icon={"tabler:clock-filled"}
							update={"updated 4 min ago"}
						/>
						<ChartWrapper
							chartType={<BarChart data={attendance} />}
							title={"Attendance"}
							desc={"(-10%) increase in this month"}
							icon={"tabler:clock-filled"}
							update={"updated 4 min ago"}
						/>
						<ChartWrapper
							chartType={<BarChart data={attendance} />}
							title={"Attendance"}
							desc={"(-10%) increase in this month"}
							icon={"tabler:clock-filled"}
							update={"updated 4 min ago"}
						/>
					</div>
				</div>
				<div className="lg:w-2/5 w-full">
					<h3 className="font-bold text-2xl">Request</h3>
					<div className="flex flex-wrap md:justify-between justify-center w-full p-4">
						{employeeReq.slice(0, 2).map((req, ind) => {
							return (
								<EmployeesCard
									key={req.id}
									userDP={photos[ind % photos.length]}
									userName={photoNames[ind % photoNames.length]}
									userReq={req.body}
								/>
							);
						})}
					</div>
				</div>
			</div>
			<EmployeesDetailsContainer />
		</>
	);
};

export default Employees;
