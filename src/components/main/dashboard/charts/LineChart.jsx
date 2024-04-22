import React from "react";
import {
	Chart as ChartJS,
	CategoryScale,
	LinearScale,
	PointElement,
	LineElement,
	Legend,
	Tooltip,
} from "chart.js";
import { Line } from "react-chartjs-2";
import { lineChartData } from "../../../data/sourceData";

ChartJS.defaults.color = "#ffffff";
ChartJS.defaults.borderColor = "#c9c9c9";
ChartJS.register(
	CategoryScale,
	LinearScale,
	PointElement,
	LineElement,
	Legend,
	Tooltip
);
const LineChart = () => {
	const options = {
		plugins: {
			legend: {
				position: "bottom",
				align: "",
			},
			tooltip: { display: true },
			maintainAspectRatio: false,
		},
	};
	return (
		<div className="md:w-[500px] lg:w-auto absolute -top-4 left-1/2 transform -translate-x-1/2">
			<Line
				data={lineChartData}
				className="bg-linear-black p-4 rounded-2xl box-shadow"
				options={options}
			/>
		</div>
	);
};

export default LineChart;
