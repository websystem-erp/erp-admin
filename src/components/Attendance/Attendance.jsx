import React, { useState, useEffect } from "react";
import axios from "axios";
import API_ENDPOINTS from "../../API/apiEndpoints";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";

const Attendance = () => {
	const [teachers, setTeachers] = useState([]);
	const [departments, setDepartments] = useState([]);
	const [selectedDepartment, setSelectedDepartment] = useState("");
	const [selectedDate, setSelectedDate] = useState(new Date());
	const [attendance, setAttendance] = useState({});
	const [attendanceStatus, setAttendanceStatus] = useState([]);
	const [attendanceFetched, setAttendanceFetched] = useState(false);
	const [attendanceMarked, setAttendanceMarked] = useState(false);

	useEffect(() => {
		const fetchDepartments = async () => {
			try {
				const response = await axios.get(API_ENDPOINTS.FETCH_ALL_DEPARTMENTS);
				setDepartments(response.data.data);
			} catch (error) {
				console.error("Error fetching departments:", error);
			}
		};

		const fetchTeachers = async () => {
			try {
				const response = await axios.get(API_ENDPOINTS.FETCH_ALL_TEACHERS);
				setTeachers(response.data.data);
			} catch (error) {
				console.error("Error fetching teachers:", error);
			}
		};

		fetchDepartments();
		fetchTeachers();
	}, []);

	useEffect(() => {
		fetchAttendanceStatus();
	}, [selectedDate]);

	const handleDepartmentChange = (event) => {
		setSelectedDepartment(event.target.value);
	};

	const handleDateChange = (date) => {
		setSelectedDate(date);
		setAttendanceFetched(false);
		setAttendanceMarked(false);
	};

	const handleAttendanceChange = (teacherId) => {
		setAttendance((prev) => ({
			...prev,
			[teacherId]: !prev[teacherId],
		}));
	};

	const postAttendance = async () => {
		const selectedTeachers = Object.keys(attendance).filter(
			(teacherId) => attendance[teacherId]
		);
		const attendanceData = {
			date: selectedDate.toISOString().split("T")[0],
			selectedTeachers: selectedTeachers.map(Number),
		};

		try {
			const apiUrl = API_ENDPOINTS.MARK_FACULTY_TEACHERS;
			await axios.post(apiUrl, attendanceData);
			alert("Attendance marked successfully!");
			setAttendance({});
			setAttendanceFetched(false);
			fetchAttendanceStatus(); // Refetch attendance status to update the UI
		} catch (error) {
			if (error.response && error.response.status === 409) {
				alert("Attendance is already marked for this date!");
				setAttendanceMarked(true);
			} else {
				console.error("Error marking attendance:", error);
				alert(
					`Error marking attendance: ${
						error.response?.data?.message || error.message
					}`
				);
			}
		}
	};

	const fetchAttendanceStatus = async () => {
		try {
			const formattedDate = selectedDate.toISOString().split("T")[0];
			const apiUrl = API_ENDPOINTS.ALL_FACULTY_ATTENDANCE_DATE(formattedDate);
			const response = await axios.get(apiUrl);
			setAttendanceStatus(response.data.attendanceStatus || []);
			setAttendanceFetched(true);
			setAttendanceMarked(
				response.data.attendanceStatus &&
					response.data.attendanceStatus.length > 0
			);
		} catch (error) {
			console.error("Error fetching attendance status:", error);
			setAttendanceStatus([]);
			setAttendanceFetched(true);
		}
	};

	const filteredTeachers = selectedDepartment
		? teachers.filter((teacher) =>
				teacher.subject.some(
					(subject) => subject.department.id === parseInt(selectedDepartment)
				)
		  )
		: teachers;

	const presentTeachers = attendanceStatus.filter(
		(teacher) => teacher.status === "Present"
	);
	const absentTeachers = attendanceStatus.filter(
		(teacher) => teacher.status === "Absent"
	);

	return (
		<>
			<div className="w-full flex gap-4 mb-4">
				<select
					onChange={handleDepartmentChange}
					value={selectedDepartment}
					className="border p-2 rounded w-40"
				>
					<option value="">All Departments</option>
					{departments.map((department) => (
						<option key={department.id} value={department.id}>
							{department.name}
						</option>
					))}
				</select>
				<DatePicker
					selected={selectedDate}
					onChange={handleDateChange}
					className="border p-2 rounded"
				/>
			</div>
			<div>
				<fieldset>
					<div className="text-lg font-medium text-gray-900">
						Selected Date: {selectedDate.toLocaleDateString()}
					</div>

					<div className="mt-4 space-y-2">
						{filteredTeachers.length === 0 && <p>No teachers found.</p>}
						{filteredTeachers.map((teacher) => (
							<label
								key={teacher.id}
								htmlFor={`teacher-${teacher.id}`}
								className="flex cursor-pointer items-start gap-4"
							>
								<div className="flex items-center">
									<input
										type="checkbox"
										className="size-4 rounded border-gray-300"
										id={`teacher-${teacher.id}`}
										checked={!!attendance[teacher.id]}
										onChange={() => handleAttendanceChange(teacher.id)}
									/>
								</div>

								<div>
									<strong className="font-medium text-gray-900">
										{teacher.name}
									</strong>
								</div>
							</label>
						))}
					</div>
				</fieldset>
				<button
					onClick={postAttendance}
					className={`mt-4 px-4 py-2 rounded ${
						attendanceMarked
							? "bg-gray-400 cursor-not-allowed"
							: "bg-linear-blue text-white"
					}`}
					disabled={attendanceMarked}
				>
					Submit Attendance
				</button>
			</div>
			<div className="mt-4">
				<h2 className="text-lg font-medium text-gray-900">
					Attendance Status for {selectedDate.toLocaleDateString()}
				</h2>
				{attendanceFetched && attendanceStatus.length === 0 ? (
					<p>Attendance not marked for the selected date.</p>
				) : (
					<>
						<div>
							<h3 className="text-md font-medium text-green-600">
								Present Faculty
							</h3>
							{presentTeachers.length === 0 ? (
								<p>No teachers are present.</p>
							) : (
								<ul>
									{presentTeachers.map((teacher) => (
										<li key={teacher.id}>{teacher.name}</li>
									))}
								</ul>
							)}
						</div>
						<div className="mt-2">
							<h3 className="text-md font-medium text-red-600">
								Absent Faculty
							</h3>
							{absentTeachers.length === 0 ? (
								<p>All teachers are present.</p>
							) : (
								<ul>
									{absentTeachers.map((teacher) => (
										<li key={teacher.id}>{teacher.name}</li>
									))}
								</ul>
							)}
						</div>
					</>
				)}
			</div>
		</>
	);
};

export default Attendance;
