import React, { useState, useEffect } from "react";
import axios from "axios";
import ChartWrapper from "../main/dashboard/charts/ChartWrapper";
import BarChart from "../main/dashboard/charts/BarChart";
import { attendance } from "../data/sourceData";
import anju from "../../assets/user/anju.jpg";
import akriti from "../../assets/user/akriti.jpg";
import ankur from "../../assets/user/ankur.jpg";
import vikas from "../../assets/user/vikas.jpg";
import Employee from "../main/dashboard/employeesDetails/Employee";
import CommonCard from "../List/CommonCard";

const Employees = () => {
	const [employeeReq, setEmployeeReq] = useState([]);
	const photos = [anju, akriti, ankur, vikas];
	const photoNames = ["Anju", "Akriti", "Ankur", "Vikas"];

	useEffect(() => {
		const api = "https://jsonplaceholder.typicode.com/comments";

		axios
			.get(api)
			.then((response) => {
				setEmployeeReq(response.data);
			})
			.catch((error) => console.log("Error: ", error));
	}, []);

	return (
		<>
			<div className="p-4 flex flex-wrap">
				<div className="lg:w-3/4 w-full ">
					<h3 className="font-bold text-2xl">Attendance</h3>
					<div className="flex flex-wrap justify-between px-8">
						<ChartWrapper
							chartType={<BarChart data={attendance} />}
							title={"Attendance"}
							desc={"(-10%) increase in this month"}
							icon={"tabler:clock-filled"}
							update={"updated 4 min ago"}
						/>
					</div>
				</div>
				<div className="lg:w-1/4 w-full">
					<h3 className="font-bold text-2xl">Request</h3>
					<div className="flex flex-wrap md:justify-between justify-center w-full p-4">
						{/* {employeeReq.slice(0, 2).map((req, ind) => {
							return (
								<CommonCard
									key={req.id}
									userDP={photos[ind % photos.length]}
									userName={photoNames[ind % photoNames.length]}
									userReq={"Lorem Ipsum is simply dummy"}
								/>
							);
						})} */}
						<p> No leave requests received</p>
					</div>
				</div>
			</div>
			<Employee />
		</>
	);
};

export default Employees;
