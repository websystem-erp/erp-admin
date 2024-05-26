import React from "react";
import {
	Chart as ChartJS,
	CategoryScale,
	LinearScale,
	PointElement,
	LineElement,
	BarElement,
	Legend,
	Tooltip,
} from "chart.js";
import { Bar } from "react-chartjs-2";

ChartJS.defaults.color = "#ffffff";
ChartJS.defaults.borderColor = "#c9c9c9";
ChartJS.register(
	CategoryScale,
	LinearScale,
	PointElement,
	LineElement,
	BarElement,
	Legend,
	Tooltip
);
const BarChart = ({ data }) => {
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
		<div className="md:w-[500px] lg:w-fit absolute -top-4 left-1/2 transform -translate-x-1/2">
			<Bar
				data={data}
				className="bg-linear-green p-4 rounded-2xl box-shadow"
				options={options}
			/>
		</div>
	);
};

export default BarChart;
