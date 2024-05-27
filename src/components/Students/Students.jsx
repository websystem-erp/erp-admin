import React from "react";
import ChartWrapper from "../main/dashboard/charts/ChartWrapper";
import BarChart from "../main/dashboard/charts/BarChart";
import { attendance } from "../data/sourceData";
import StudentList from "./StudentList";

const Students = () => {
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
			</div>
			<StudentList />
		</>
	);
};

export default Students;
