import React from "react";
import ChartWrapper from "../main/dashboard/charts/ChartWrapper";
import BarChart from "../main/dashboard/charts/BarChart";
import { attendance } from "../data/sourceData";
import anju from "../../assets/user/anju.jpg";
import akriti from "../../assets/user/akriti.jpg";
import ankur from "../../assets/user/ankur.jpg";
import vikas from "../../assets/user/vikas.jpg";

const Employees = () => {
	return (
		<>
			<div className="p-8">
				<div className="flex justify-between items-center">
					<h3 className="font-bold text-2xl">Attendance</h3>
					<p className="text-xs font-bold text-zinc-600">Apr 16, 2024</p>
				</div>
				<ChartWrapper
					chartType={<BarChart data={attendance} />}
					title={"Attendance"}
					desc={"(-10%) increase in this month"}
					icon={"tabler:clock-filled"}
					update={"updated 4 min ago"}
				/>
				<di className="flex justify-between items-center">
					<div className="w-10 h-10 overflow-hidden rounded-full shadow">
						<img src={anju} alt="" />
					</div>
					<p className="text-black">Anju</p>
				</di>
			</div>
		</>
	);
};

export default Employees;
