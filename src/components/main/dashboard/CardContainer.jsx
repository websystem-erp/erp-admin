import React, { useState, useEffect } from "react";
import axios from "axios";
import Card from "./Card";
import { Link } from "react-router-dom";
import API_ENDPOINTS from "../../../API/apiEndpoints";

const CardContainer = ({ onDueFeesClick, onPendingRequestClick }) => {
	const [employeeCount, setEmployeeCount] = useState(0);

	useEffect(() => {
		const fetchEmployeeCount = async () => {
			try {
				const response = await axios.get(API_ENDPOINTS.FETCH_ALL_TEACHERS);
				if (Array.isArray(response.data.data)) {
					setEmployeeCount(response.data.data.length);
				} else {
					console.error("Unexpected data format:", response.data);
				}
			} catch (error) {
				console.error("Error fetching data:", error);
			}
		};

		fetchEmployeeCount();
	}, []);

	return (
		<>
			<div className="flex flex-wrap justify-center items-center">
				<Link to="../../Employees">
					<Card
						icon={"clarity:employee-group-solid"}
						title={"Total Employees"}
						number={employeeCount}
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
				<Link to="../../Students">
					<Card
						icon={"solar:square-academic-cap-bold"}
						title={"Total Students"}
						number={"15K"}
						iconClass={"salary-icon"}
						iconColor={"bg-linear-green"}
					/>
				</Link>
			</div>
		</>
	);
};

export default CardContainer;
