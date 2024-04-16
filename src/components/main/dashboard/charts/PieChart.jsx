import React from "react";
import { Chart as ChartJS, ArcElement, Legend, Tooltip, Title } from "chart.js";
import { Pie } from "react-chartjs-2";
import { pieChartData } from "../../../data/sourceData";

ChartJS.defaults.color = "#ffffff";
ChartJS.defaults.borderColor = "#c9c9c9";
ChartJS.register(ArcElement, Legend, Tooltip, Title);
const PieChart = () => {
	const options = {
		plugins: {
			legend: {
				position: "bottom",
				align: "",
			},
			title: {
				display: true,
				text: "Income and Expenditure",
				position: "bottom",
			},
			tooltip: { display: true },
			maintainAspectRatio: false,
		},
	};
	return (
		<div className="box-shadow bg-white lg:w-[360px] w-full h-auto relative rounded-2xl mx-4 my-8">
			<div className="md:w-[500px] lg:w-auto  ">
				<Pie
					data={pieChartData}
					className="bg-linear-red p-4 rounded-2xl box-shadow"
					options={options}
				/>
			</div>
		</div>
	);
};

export default PieChart;
