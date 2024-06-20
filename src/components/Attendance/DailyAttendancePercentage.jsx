import React, { useState, useEffect } from "react";
import axios from "axios";
import API_ENDPOINTS from "../../API/apiEndpoints";

const DailyAttendancePercentage = ({ selectedDate }) => {
	const [attendanceStatus, setAttendanceStatus] = useState([]);
	const [presentPercentage, setPresentPercentage] = useState(0);
	const [absentPercentage, setAbsentPercentage] = useState(0);

	useEffect(() => {
		fetchAttendanceStatus();
	}, [selectedDate]);

	const fetchAttendanceStatus = async () => {
		try {
			const formattedDate = selectedDate.toISOString().split("T")[0];
			const apiUrl = API_ENDPOINTS.ALL_FACULTY_ATTENDANCE_DATE(formattedDate);
			const response = await axios.get(apiUrl);
			setAttendanceStatus(response.data.attendanceStatus || []);
			calculateDailyAttendancePercentage(response.data.attendanceStatus || []);
		} catch (error) {
			console.error("Error fetching attendance status:", error);
			setAttendanceStatus([]);
		}
	};

	const calculateDailyAttendancePercentage = (attendanceStatus) => {
		const totalTeachers = attendanceStatus.length;
		const presentTeachers = attendanceStatus.filter(
			(teacher) => teacher.status === "Present"
		).length;

		if (totalTeachers === 0) {
			setPresentPercentage(0);
			setAbsentPercentage(0);
			return;
		}

		const presentPercentage = (presentTeachers / totalTeachers) * 100;
		const absentPercentage = 100 - presentPercentage;

		setPresentPercentage(presentPercentage);
		setAbsentPercentage(absentPercentage);
	};

	return (
		<div className="my-4 p-4 bg-linear-black shadow rounded-lg w-full h-auto">
			<h2 className="text-lg font-medium ">
				{selectedDate.toLocaleDateString("en-US", {
					year: "numeric",
					month: "long",
					day: "numeric",
				})}
			</h2>
			{presentPercentage > 0 && absentPercentage > 0 ? (
				<>
					<p className="text-green-300">
						Present: {presentPercentage.toFixed(2)}%
					</p>
					<p className="text-red-300">Absent: {absentPercentage.toFixed(2)}%</p>
				</>
			) : (
				"Attendance not marked yet"
			)}
		</div>
	);
};

export default DailyAttendancePercentage;
