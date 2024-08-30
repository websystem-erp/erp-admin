import React, { useState, useEffect, useMemo } from "react";
import axios from "axios";
import API_ENDPOINTS from "../../API/apiEndpoints";
import "react-datepicker/dist/react-datepicker.css";
import { Calendar, momentLocalizer } from "react-big-calendar";
import moment from "moment";
import "react-big-calendar/lib/css/react-big-calendar.css";

const localizer = momentLocalizer(moment);

const CustomEvent = ({ event }) => (
	<div className="flex flex-col h-full">
		<div className="text-sm font-semibold mb-1">
			{event.attendanceMarked ? (
				<>
					Present: {event.presentCount} | Absent: {event.absentCount}
				</>
			) : (
				"No attendance data"
			)}
		</div>
		{event.attendanceMarked && event.presentEmployees && (
			<div className="flex flex-wrap overflow-hidden">
				{event.presentEmployees.slice(0, 3).map((employee, index) => (
					<div
						key={index}
						className="w-6 h-6 rounded-full bg-green-500 flex items-center justify-center text-xs text-white mr-1 mb-1"
						title={employee.name}
					>
						{employee.name.charAt(0)}
					</div>
				))}
				{event.presentEmployees.length > 3 && (
					<div className="w-6 h-6 rounded-full bg-gray-300 flex items-center justify-center text-xs font-semibold">
						+{event.presentEmployees.length - 3}
					</div>
				)}
			</div>
		)}
	</div>
);

const Attendance = () => {
	const [teachers, setTeachers] = useState([]);
	const [departments, setDepartments] = useState([]);
	const [selectedDepartment, setSelectedDepartment] = useState("");
	const [selectedDate, setSelectedDate] = useState(new Date());
	const [attendance, setAttendance] = useState({});
	const [attendanceStatus, setAttendanceStatus] = useState([]);
	const [monthlyAttendance, setMonthlyAttendance] = useState([]);
	const [attendanceFetched, setAttendanceFetched] = useState(false);
	const [attendanceMarked, setAttendanceMarked] = useState(false);
	const [selectAll, setSelectAll] = useState(false);
	const [isLoading, setIsLoading] = useState(true);
	const [error, setError] = useState(null);
	const [showModal, setShowModal] = useState(false);
	const [selectedEvent, setSelectedEvent] = useState(null);
	const [isEditMode, setIsEditMode] = useState(false);
	const [editedAttendance, setEditedAttendance] = useState([]);

	useEffect(() => {
		fetchTeachers();
		fetchDepartments();
	}, []);

	useEffect(() => {
		if (teachers.length > 0) {
			fetchAttendanceStatus();
			fetchMonthlyAttendance();
		}
	}, [selectedDate, teachers]);

	const fetchTeachers = async () => {
		try {
			const response = await axios.get(API_ENDPOINTS.FETCH_ALL_TEACHERS);
			setTeachers(response.data.data || []);
		} catch (error) {
			console.error("Error fetching teachers:", error);
			setError("Failed to fetch teachers");
		}
	};

	const fetchDepartments = async () => {
		try {
			const response = await axios.get(API_ENDPOINTS.FETCH_ALL_DEPARTMENTS);
			setDepartments(response.data.data || []);
		} catch (error) {
			console.error("Error fetching departments:", error);
			setError("Failed to fetch departments");
		}
	};

	const fetchAttendanceStatus = async () => {
		setIsLoading(true);
		setError(null);
		try {
			const formattedDate = moment(selectedDate).format("YYYY-MM-DD");
			const apiUrl = API_ENDPOINTS.ALL_FACULTY_ATTENDANCE_DATE(formattedDate);
			const response = await axios.get(apiUrl);
			console.log("Daily attendance response:", response.data);
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
		} finally {
			setIsLoading(false);
		}
	};

	const fetchMonthlyAttendance = async () => {
		setIsLoading(true);
		setError(null);
		try {
			const startDate = moment(selectedDate).startOf("month");
			const endDate = moment(selectedDate).endOf("month");
			const monthlyData = [];

			for (
				let date = moment(startDate);
				date <= endDate;
				date = date.clone().add(1, "d")
			) {
				const formattedDate = date.format("YYYY-MM-DD");
				const dayData = {
					date: formattedDate,
					attendanceMarked: false,
					presentEmployees: [],
					absentEmployees: [],
				};

				try {
					const apiUrl =
						API_ENDPOINTS.ALL_FACULTY_ATTENDANCE_DATE(formattedDate);
					const response = await axios.get(apiUrl);
					if (response.data && response.data.attendanceStatus) {
						dayData.attendanceMarked = true;
						dayData.presentEmployees = response.data.attendanceStatus.filter(
							(e) => e.status === "Present"
						);
						dayData.absentEmployees = response.data.attendanceStatus.filter(
							(e) => e.status === "Absent"
						);
					}
				} catch (error) {
					if (error.response && error.response.status !== 404) {
						console.error(
							`Error fetching attendance for ${formattedDate}:`,
							error
						);
					}
					// For 404, we assume no attendance was marked for that day
				}

				monthlyData.push(dayData);
			}

			console.log("Monthly attendance data:", monthlyData);
			setMonthlyAttendance(monthlyData);
		} catch (error) {
			console.error("Error fetching monthly attendance:", error);
			setError("Failed to fetch monthly attendance data");
		} finally {
			setIsLoading(false);
		}
	};

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

	const handleSelectAllChange = (event) => {
		const checked = event.target.checked;
		setSelectAll(checked);
		const newAttendance = {};
		if (checked) {
			filteredTeachers.forEach((teacher) => {
				newAttendance[teacher.id] = true;
			});
		}
		setAttendance(newAttendance);
	};

	const postAttendance = async () => {
		const selectedTeachers = Object.keys(attendance).filter(
			(teacherId) => attendance[teacherId]
		);
		const attendanceData = {
			date: moment(selectedDate).format("YYYY-MM-DD"),
			selectedTeachers: selectedTeachers.map(Number),
		};

		try {
			const apiUrl = API_ENDPOINTS.MARK_FACULTY_TEACHERS;
			await axios.post(apiUrl, attendanceData);
			alert("Attendance marked successfully!");
			setAttendance({});
			setAttendanceFetched(false);
			fetchAttendanceStatus();
			fetchMonthlyAttendance();
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

	const handleEventSelect = (event) => {
		console.log("Selected event:", event);
		setSelectedEvent(event);
		setEditedAttendance([...event.presentEmployees, ...event.absentEmployees]);
		setShowModal(true);
		setIsEditMode(false);
	};

	const handleAttendanceEdit = (employeeId) => {
		setEditedAttendance((prevAttendance) =>
			prevAttendance.map((employee) =>
				employee.id === employeeId
					? {
							...employee,
							status: employee.status === "Present" ? "Absent" : "Present",
					  }
					: employee
			)
		);
	};

	const handleSaveEdit = async () => {
		try {
			const apiUrl = API_ENDPOINTS.UPDATE_ATTENDANCE;
			await axios.put(apiUrl, {
				date: moment(selectedEvent.start).format("YYYY-MM-DD"),
				attendanceData: editedAttendance,
			});
			alert("Attendance updated successfully!");
			setIsEditMode(false);
			fetchMonthlyAttendance(); // Refresh the calendar data
			setShowModal(false);
		} catch (error) {
			console.error("Error updating attendance:", error);
			alert(
				`Error updating attendance: ${
					error.response?.data?.message || error.message
				}`
			);
		}
	};

	const filteredTeachers = selectedDepartment
		? teachers.filter((teacher) =>
				teacher.subject.some(
					(subject) => subject.department.id === parseInt(selectedDepartment)
				)
		  )
		: teachers;

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
			<div className="mb-4">
				<Calendar
					localizer={localizer}
					events={calendarEvents}
					startAccessor="start"
					endAccessor="end"
					style={{ height: 500 }}
					onSelectEvent={handleEventSelect}
					components={{
						event: CustomEvent,
					}}
				/>
			</div>

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
			</div>

			{teachers.length === 0 ? (
				<p>No employees found. Please add employees to mark attendance.</p>
			) : (
				<div>
					<fieldset>
						<div className="text-lg font-medium text-gray-900 mb-2">
							Selected Date: {moment(selectedDate).format("MMMM D, YYYY")}
						</div>
						<div className="mt-4 space-y-2">
							<label
								htmlFor="select-all"
								className="flex cursor-pointer items-start gap-4"
							>
								<div className="flex items-center">
									<input
										type="checkbox"
										className="size-4 rounded border-gray-300"
										id="select-all"
										checked={selectAll}
										onChange={handleSelectAllChange}
										disabled={filteredTeachers.length === 0}
									/>
								</div>
								<div>
									<strong className="font-medium text-gray-900">
										Select All
									</strong>
								</div>
							</label>
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
								: "bg-red-500 text-white hover:bg-red-600"
						}`}
						disabled={attendanceMarked}
					>
						Submit Attendance
					</button>
				</div>
			)}

			{showModal && selectedEvent && (
				<div className="fixed z-10 inset-0 bg-gray-600 bg-opacity-50 overflow-y-auto h-full w-full flex items-center justify-center">
					<div className="bg-white p-5 border w-96 shadow-lg rounded-md">
						<h3 className="text-lg font-medium text-gray-900 mb-4">
							Attendance for{" "}
							{moment(selectedEvent.start).format("MMMM D, YYYY")}
						</h3>
						<div className="mb-4">
							<p className="text-sm text-gray-500">
								Present:{" "}
								{editedAttendance.filter((e) => e.status === "Present").length}
							</p>
							<p className="text-sm text-gray-500">
								Absent:{" "}
								{editedAttendance.filter((e) => e.status === "Absent").length}
							</p>
						</div>
						<div className="mb-4">
							<h4 className="text-md font-medium text-gray-700 mb-2">
								Employees:
							</h4>
							<div className="max-h-60 overflow-y-auto">
								{editedAttendance.map((employee) => (
									<div
										key={employee.id}
										className="flex items-center justify-between mb-2"
									>
										<span className="text-sm">{employee.name}</span>
										{isEditMode ? (
											<button
												onClick={() => handleAttendanceEdit(employee.id)}
												className={`px-2 py-1 rounded ${
													employee.status === "Present"
														? "bg-green-500 text-white"
														: "bg-red-500 text-white"
												}`}
											>
												{employee.status}
											</button>
										) : (
											<div
												className={`w-3 h-3 rounded-full ${
													employee.status === "Present"
														? "bg-green-500"
														: "bg-red-500"
												}`}
											></div>
										)}
									</div>
								))}
							</div>
						</div>
						{isEditMode ? (
							<div className="flex justify-between">
								<button
									className="px-4 py-2 bg-green-500 text-white text-base font-medium rounded-md shadow-sm hover:bg-green-700 focus:outline-none focus:ring-2 focus:ring-green-300"
									onClick={handleSaveEdit}
								>
									Save Changes
								</button>
								<button
									className="px-4 py-2 bg-gray-300 text-gray-700 text-base font-medium rounded-md shadow-sm hover:bg-gray-400 focus:outline-none focus:ring-2 focus:ring-gray-300"
									onClick={() => setIsEditMode(false)}
								>
									Cancel
								</button>
							</div>
						) : (
							<div className="flex justify-between">
								<button
									className="px-4 py-2 bg-red-500 text-white text-base font-medium rounded-md shadow-sm hover:bg-red-700 focus:outline-none focus:ring-2 focus:ring-red-300"
									onClick={() => setIsEditMode(true)}
								>
									Edit Attendance
								</button>
								<button
									className="px-4 py-2 bg-gray-300 text-gray-700 text-base font-medium rounded-md shadow-sm hover:bg-gray-400 focus:outline-none focus:ring-2 focus:ring-gray-300"
									onClick={() => setShowModal(false)}
								>
									Close
								</button>
							</div>
						)}
					</div>
				</div>
			)}
		</div>
	);
};

export default Attendance;
