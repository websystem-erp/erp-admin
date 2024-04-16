export const lineChartData = {
	labels: ["Jul", "Aug", "Sep", "Oct", "Nov", "Dec"],
	datasets: [
		{
			label: "Income",
			data: [40, 80, 110, 50, 48, 79],
			fill: false,
			borderColor: "#02864a",
			backgroundColor: "#02864a",
			tension: 0.5,
		},
		{
			label: "Expenditure",
			data: [10, 13, 43, 27, 11, 49],
			fill: false,
			borderColor: "#e8083e",
			backgroundColor: "#e8083e",
			tension: 0.5,
		},
	],
};
export const pieChartData = {
	labels: ["Jul", "Aug", "Sep", "Oct", "Nov", "Dec"],
	datasets: [
		{
			label: "Income",
			data: [40, 80, 110, 50, 48, 79],
			fill: false,
			borderColor: "rgba(255,255,255,0.3)",
			backgroundColor: [
				"#F94144",
				"#F3722C",
				"#F8961E",
				"#F9C74F",
				"#90BE6D",
				"#43AA8B",
			],
		},
	],
};
