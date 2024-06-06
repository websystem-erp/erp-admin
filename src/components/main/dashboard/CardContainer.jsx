import React, { useState, useEffect } from "react";
import axios from "axios";
import { Link } from "react-router-dom";
import Card from "./Card";
import API_ENDPOINTS from "../../../API/apiEndpoints";

const CardContainer = ({ onDueFeesClick, onPendingRequestClick }) => {
	const [employeeCount, setEmployeeCount] = useState(0);
	const [studentCount, setStudentCount] = useState(0);
	const [leavesCount, setLeavesCount] = useState(0);

	const fetchData = async (endpoint, setState, processData) => {
		try {
			const response = await axios.get(endpoint);
			if (processData) {
				processData(response.data, setState);
			} else if (Array.isArray(response.data.data)) {
				setState(response.data.data.length);
			} else {
				console.error("Unexpected data format:", response.data);
			}
		} catch (error) {
			console.error("Error fetching data:", error);
		}
	};

	useEffect(() => {
		fetchData(API_ENDPOINTS.FETCH_ALL_TEACHERS, setEmployeeCount);
		fetchData(API_ENDPOINTS.FETCH_ALL_STUDENTS, setStudentCount);
		fetchData(
			API_ENDPOINTS.FETCH_ALL_PENDING_LEAVES,
			setLeavesCount,
			(data, setState) => {
				if (Array.isArray(data.leaves)) setState(data.leaves.length);
				else console.error("Unexpected data format for leaves:", data);
			}
		);
	}, []);

	return (
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
					number={leavesCount}
					iconClass={"salary-icon"}
					iconColor={"bg-linear-red"}
				/>
			</button>
			<Link to="../../Students">
				<Card
					icon={"solar:square-academic-cap-bold"}
					title={"Total Students"}
					number={studentCount}
					iconClass={"salary-icon"}
					iconColor={"bg-linear-green"}
				/>
			</Link>
		</div>
	);
};

export default CardContainer;
