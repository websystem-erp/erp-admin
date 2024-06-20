import React from "react";
// import ChartWrapper from "../main/dashboard/charts/ChartWrapper";
// import BarChart from "../main/dashboard/charts/BarChart";
// import { attendance } from "../data/sourceData";
import StudentList from "./StudentList";

const Students = () => {
	return (
		<>
			{/* <div className="p-4 flex flex-wrap">
				<div className="lg:w-3/4 w-full ">
					<h3 className="font-bold text-2xl">Student Details</h3>
				</div>
			</div> */}
			<StudentList />
		</>
	);
};

export default Students;
