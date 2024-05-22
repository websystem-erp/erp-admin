import React, { useState, useEffect } from "react";
import axios from "axios";
import ChartWrapper from "../main/dashboard/charts/ChartWrapper";
import BarChart from "../main/dashboard/charts/BarChart";
import { attendance } from "../data/sourceData";
import anju from "../../assets/user/anju.jpg";
import akriti from "../../assets/user/akriti.jpg";
import ankur from "../../assets/user/ankur.jpg";
import vikas from "../../assets/user/vikas.jpg";
import CommonCard from "../List/CommonCard";
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
