import React, { useState, useEffect, useMemo } from "react";
import axios from "axios";
import API_ENDPOINTS from "../../API/apiEndpoints";
import moment from "moment";
import AttendanceCalendar from "./AttendanceCalendar";
import AttendanceModal from "./AttendanceModal";
import EmployeeCard from "./EmployeeCard";

const Attendance = () => {
	const [teachers, setTeachers] = useState([]);
	const [departments, setDepartments] = useState([]);
	const [selectedDepartment, setSelectedDepartment] = useState("");
	const [selectedDate, setSelectedDate] = useState(moment());
	const [attendance, setAttendance] = useState({});
	const [monthlyAttendance, setMonthlyAttendance] = useState([]);
	const [isLoading, setIsLoading] = useState(true);
	const [error, setError] = useState(null);
	const [showModal, setShowModal] = useState(false);
	const [selectedEvent, setSelectedEvent] = useState(null);
	const [oldestTeacherDate, setOldestTeacherDate] = useState(null);
	const [showUpdateDialog, setShowUpdateDialog] = useState(false);

	useEffect(() => {
		const fetchInitialData = async () => {
			try {
				setIsLoading(true);
				await Promise.all([fetchTeachers(), fetchDepartments()]);
			} catch (err) {
				setError("Failed to fetch initial data. Please try again.");
			} finally {
				setIsLoading(false);
			}
		};
		fetchInitialData();
	}, []);

	useEffect(() => {
		if (teachers.length > 0 && oldestTeacherDate) {
			fetchAttendanceData();
		}
	}, [selectedDate, teachers, oldestTeacherDate]);

	const fetchTeachers = async () => {
		try {
			const response = await axios.get(API_ENDPOINTS.FETCH_ALL_TEACHERS);
			const sortedTeachers = response.data.data.sort(
				(a, b) => new Date(a.created_at) - new Date(b.created_at)
			);
			setTeachers(sortedTeachers);
			if (sortedTeachers.length > 0) {
				setOldestTeacherDate(
					moment(sortedTeachers[0].created_at).startOf("day")
				);
			}
		} catch (error) {
			throw new Error("Failed to fetch teachers");
		}
	};

	const fetchDepartments = async () => {
		try {
			const response = await axios.get(API_ENDPOINTS.FETCH_ALL_DEPARTMENTS);
			setDepartments(response.data.data || []);
		} catch (error) {
			throw new Error("Failed to fetch departments");
		}
	};

	const fetchAttendanceData = async () => {
		setIsLoading(true);
		setError(null);
		try {
			const formattedDate = selectedDate.format("YYYY-MM-DD");
			const response = await axios.get(
				API_ENDPOINTS.ALL_FACULTY_ATTENDANCE_DATE(formattedDate)
			);
			if (response.data.success) {
				const newAttendance = {};
				response.data.attendanceStatus.forEach((status) => {
					newAttendance[status.id] = status.status;
				});
				setAttendance(newAttendance);
			}
			await fetchMonthlyAttendance();
		} catch (error) {
			if (error.response && error.response.status === 404) {
				// Attendance doesn't exist for this date, set all to absent
				const newAttendance = {};
				teachers.forEach((teacher) => {
					newAttendance[teacher.id] = "Absent";
				});
				setAttendance(newAttendance);
			} else {
				setError("Failed to fetch attendance data. Please try again.");
			}
		} finally {
			setIsLoading(false);
		}
	};

	const fetchMonthlyAttendance = async () => {
		const endDate = moment().endOf("day");
		const startDate = moment.max(
			oldestTeacherDate,
			endDate.clone().subtract(30, "days").startOf("day")
		);
		const monthlyData = [];

		for (
			let date = moment(startDate);
			date <= endDate;
			date = date.clone().add(1, "d")
		) {
			const formattedDate = date.format("YYYY-MM-DD");
			try {
				const apiUrl = API_ENDPOINTS.ALL_FACULTY_ATTENDANCE_DATE(formattedDate);
				const response = await axios.get(apiUrl);
				if (response.data && response.data.attendanceStatus) {
					const presentEmployees = response.data.attendanceStatus.filter(
						(e) => e.status === "Present"
					);
					const absentEmployees = response.data.attendanceStatus.filter(
						(e) => e.status === "Absent"
					);
					monthlyData.push({
						date: formattedDate,
						attendanceMarked: true,
						presentEmployees,
						absentEmployees,
					});
				}
			} catch (error) {
				if (error.response && error.response.status !== 404) {
					console.error(
						`Error fetching attendance for ${formattedDate}:`,
						error
					);
				}
				monthlyData.push({
					date: formattedDate,
					attendanceMarked: false,
					presentEmployees: [],
					absentEmployees: [],
				});
			}
		}
		setMonthlyAttendance(monthlyData);
	};

	const handleDepartmentChange = (event) => {
		setSelectedDepartment(event.target.value);
	};

	const handleDateChange = (date) => {
		setSelectedDate(moment(date));
	};

	const handleAttendanceChange = (teacherId, status) => {
		setAttendance((prev) => ({
			...prev,
			[teacherId]: status,
		}));
	};

	const handleSubmit = async () => {
		setShowUpdateDialog(true);
	};

	const submitAttendance = async () => {
		const presentTeachers = Object.keys(attendance).filter(
			(teacherId) => attendance[teacherId] === "Present"
		);
		const attendanceData = {
			date: selectedDate.format("YYYY-MM-DD"),
			selectedTeachers: presentTeachers.map(Number),
		};

		try {
			const apiUrl = API_ENDPOINTS.UPDATE_ATTENDANCE;
			console.log("Submitting attendance to:", apiUrl);
			console.log("Attendance data:", attendanceData);

			const response = await axios.post(apiUrl, attendanceData);

			if (response.data.success) {
				alert("Attendance updated successfully!");
				fetchAttendanceData();
			} else {
				throw new Error(response.data.message);
			}
		} catch (error) {
			console.error("Error updating attendance:", error);
			alert(`Error updating attendance: ${error.message}`);
		} finally {
			setShowUpdateDialog(false);
		}
	};

	const handleEventSelect = (event) => {
		setSelectedEvent(event);
		setShowModal(true);
	};

	const handleSaveEdit = async (requestBody) => {
		try {
			const apiUrl = API_ENDPOINTS.UPDATE_ATTENDANCE;
			await axios.put(apiUrl, requestBody);
			alert("Attendance updated successfully!");
			setShowModal(false);
			fetchAttendanceData();
		} catch (error) {
			console.error("Error updating attendance:", error);
			alert(`Error updating attendance: ${error.message}`);
		}
	};

	const filteredTeachers = useMemo(() => {
		return selectedDepartment
			? teachers.filter((teacher) =>
					teacher.subject.some(
						(subject) => subject.department.id === parseInt(selectedDepartment)
					)
			  )
			: teachers;
	}, [teachers, selectedDepartment]);

	const calendarEvents = useMemo(() => {
		return monthlyAttendance.map((day) => ({
			title: day.attendanceMarked
				? `Present: ${day.presentEmployees.length}, Absent: ${day.absentEmployees.length}`
				: "No data",
			start: new Date(day.date),
			end: new Date(day.date),
			attendanceMarked: day.attendanceMarked,
			presentCount: day.presentEmployees.length,
			absentCount: day.absentEmployees.length,
			presentEmployees: day.presentEmployees,
			absentEmployees: day.absentEmployees,
			allDay: true,
		}));
	}, [monthlyAttendance]);

	if (isLoading) {
		return <div className="text-center mt-8">Loading...</div>;
	}

	if (error) {
		return <div className="text-center mt-8 text-red-500">{error}</div>;
	}

	return (
		<div className="container mx-auto p-4">
			<h1 className="text-2xl font-bold mb-4">Employee Attendance</h1>

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
				<input
					type="date"
					value={selectedDate.format("YYYY-MM-DD")}
					onChange={(e) => handleDateChange(e.target.value)}
					className="border p-2 rounded"
				/>
			</div>

			{filteredTeachers.length === 0 ? (
				<p>No employees found. Please add employees to mark attendance.</p>
			) : (
				<div>
					<div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 mb-8">
						{filteredTeachers.map((teacher) => (
							<EmployeeCard
								key={teacher.id}
								employee={teacher}
								attendance={attendance[teacher.id] || "Absent"}
								onAttendanceChange={handleAttendanceChange}
								selectedDate={selectedDate}
							/>
						))}
					</div>
					<button
						onClick={handleSubmit}
						className="mt-4 mb-16 bg-green-500 hover:bg-green-700 text-white font-bold py-2 px-4 rounded"
					>
						Update Attendance
					</button>
				</div>
			)}

			<AttendanceCalendar
				events={calendarEvents}
				onSelectEvent={handleEventSelect}
			/>

			{showModal && selectedEvent && (
				<AttendanceModal
					event={selectedEvent}
					onClose={() => setShowModal(false)}
					onSave={handleSaveEdit}
				/>
			)}

			{showUpdateDialog && (
				<div className="fixed inset-0 bg-gray-600 bg-opacity-50 overflow-y-auto h-full w-full">
					<div className="relative top-20 mx-auto p-5 border w-96 shadow-lg rounded-md bg-white">
						<h3 className="text-lg font-bold">Update Attendance</h3>
						<p className="mt-2">
							Are you sure you want to update the attendance for this date?
						</p>
						<div className="mt-3 flex justify-end space-x-2">
							<button
								onClick={() => setShowUpdateDialog(false)}
								className="px-4 py-2 bg-gray-300 text-black rounded hover:bg-gray-400"
							>
								Cancel
							</button>
							<button
								onClick={submitAttendance}
								className="px-4 py-2 bg-green-500 text-white rounded hover:bg-green-700"
							>
								Update
							</button>
						</div>
					</div>
				</div>
			)}
		</div>
	);
};

export default Attendance;
