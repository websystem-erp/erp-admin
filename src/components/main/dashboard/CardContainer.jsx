import React from "react";
import Card from "./Card";

const CardContainer = () => {
	return (
		<>
			<div className="flex flex-wrap justify-center items-center">
				<Card
					icon={"clarity:employee-group-solid"}
					title={"Total Employees"}
					number={300}
					iconClass={"salary-icon"}
					iconColor={"bg-linear-black"}
				/>
				<Card
					icon={"ri:money-rupee-circle-line"}
					title={"Average Salay"}
					number={"₹25k"}
					iconClass={"salary-icon"}
					iconColor={"bg-linear-blue"}
				/>
				<Card
					icon={"lets-icons:chat"}
					title={"Pending Request"}
					number={50}
					iconClass={"salary-icon"}
					iconColor={"bg-linear-red"}
				/>
				<Card
					icon={"fa6-solid:file-pen"}
					title={"New Admission"}
					number={800}
					iconClass={"salary-icon"}
					iconColor={"bg-linear-green"}
				/>
			</div>
		</>
	);
};

export default CardContainer;
