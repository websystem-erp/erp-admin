import React from "react";
import ChartWrapper from "./ChartWrapper";
import LineChart from "./LineChart";
import BarChart from "./BarChart";
import PieChart from "./PieChart";

const ChartContainer = () => {
	return (
		<div className="flex flex-wrap justify-center items-center">
			<ChartWrapper
				chartType={<LineChart />}
				title={"Income and Expenditure"}
				desc={"(+30%) increase in this month"}
				icon={"tabler:clock-filled"}
				update={"updated 4 min ago"}
			/>
			<ChartWrapper
				chartType={<BarChart />}
				title={"Income and Expenditure"}
				desc={"(+30%) increase in this month"}
				icon={"tabler:clock-filled"}
				update={"updated 4 min ago"}
			/>
			<PieChart />
		</div>
	);
};

export default ChartContainer;
