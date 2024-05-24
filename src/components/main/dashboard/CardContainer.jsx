import React from "react";
import Card from "./Card";
import { Link } from "react-router-dom";

const CardContainer = ({ onDueFeesClick, onPendingRequestClick }) => {
	return (
		<>
			<div className="flex flex-wrap justify-center items-center">
				<Link to="../../Employees">
					<Card
						icon={"clarity:employee-group-solid"}
						title={"Total Employees"}
						number={300}
						iconClass={"salary-icon"}
						iconColor={"bg-linear-blue"}
					/>
				</Link>
				<button onClick={onDueFeesClick}>
					<Card
						icon={"ri:money-rupee-circle-line"}
						title={"Due Fees"}
						number={"₹25k"}
						iconClass={"salary-icon"}
						iconColor={"bg-linear-red"}
					/>
				</button>
				<button onClick={onPendingRequestClick}>
					<Card
						icon={"lets-icons:chat"}
						title={"Pending Request"}
						number={0}
						iconClass={"salary-icon"}
						iconColor={"bg-linear-red"}
					/>
				</button>
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
