import React from "react";
import Card from "./Card";
import { Link } from "react-router-dom";
import Employees from "../../Employees/Employees";

const CardContainer = () => {
	return (
		<>
			<div className="flex flex-wrap justify-center items-center">
				<Link to="../../Employees">
					<Card
						icon={"clarity:employee-group-solid"}
						title={"Total Employees"}
						number={300}
						iconClass={"salary-icon"}
						iconColor={"bg-linear-black"}
					/>
				</Link>
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
					icon={"solar:square-academic-cap-bold"}
					title={"Total Students"}
					number={"15K"}
					iconClass={"salary-icon"}
					iconColor={"bg-linear-green"}
				/>
			</div>
		</>
	);
};

export default CardContainer;
