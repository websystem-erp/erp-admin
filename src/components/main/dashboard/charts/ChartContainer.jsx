import React from "react";
import ChartWrapper from "./ChartWrapper";
import LineChart from "./LineChart";
// import BarChart from "./BarChart";
import PieChart from "./PieChart";
// import { lineChartData } from "../../../data/sourceData";

const ChartContainer = () => {
	return (
		<div className="flex flex-wrap justify-between items-center px-0 md:px-80">
			<ChartWrapper
				chartType={<LineChart />}
				title={"Income and Expenditure"}
				desc={"(+30%) increase in this month"}
				icon={"tabler:clock-filled"}
				update={"updated 4 min ago"}
			/>

			{/* <PieChart /> */}
		</div>
	);
};

export default ChartContainer;
