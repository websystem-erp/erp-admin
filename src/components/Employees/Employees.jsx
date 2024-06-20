import React, { useState, useEffect } from "react";
import axios from "axios";
import { Icon } from "@iconify/react";
import { useNavigate } from "react-router-dom";
import Employee from "../main/dashboard/employeesDetails/Employee";
import CommonCard from "../List/CommonCard";
import API_ENDPOINTS from "../../API/apiEndpoints";
import DailyAttendancePercentage from "../Attendance/DailyAttendancePercentage";

const Employees = () => {
	const navigate = useNavigate();
	const [leaves, setLeaves] = useState([]);
	const [teachers, setTeachers] = useState({});
	const [currentPage, setCurrentPage] = useState(1);
	const leavesPerPage = 2;

	const defaultMalePhoto =
		"https://res.cloudinary.com/duyau9qkl/image/upload/v1717910208/images/w7y88n61dxedxzewwzpn.png";
	const defaultFemalePhoto =
		"https://res.cloudinary.com/duyau9qkl/image/upload/v1717910872/images/dxflhaspx3rm1kcak2is.png";

	useEffect(() => {
		const fetchLeaves = async () => {
			try {
				const response = await axios.get(
					API_ENDPOINTS.FETCH_ALL_PENDING_LEAVES
				);
				if (Array.isArray(response.data.leaves)) {
					setLeaves(response.data.leaves);
					// Fetch teacher details for all leaves
					const teacherIds = response.data.leaves.map(
						(leave) => leave.teacherId
					);
					const uniqueTeacherIds = [...new Set(teacherIds)];
					uniqueTeacherIds.forEach((teacherId) =>
						fetchTeacherDetails(teacherId)
					);
				} else {
					console.error("Unexpected data format:", response.data);
				}
			} catch (error) {
				console.error("Error fetching leaves:", error);
			}
		};
		fetchLeaves();
	}, []);

	const fetchTeacherDetails = async (teacherId) => {
		try {
			const response = await axios.get(API_ENDPOINTS.FETCH_TEACHERS(teacherId));
			if (response.data.success && response.data.data) {
				setTeachers((prevTeachers) => ({
					...prevTeachers,
					[teacherId]: response.data.data,
				}));
			} else {
				console.error("Unexpected data format:", response.data);
			}
		} catch (error) {
			console.error(
				`Error fetching teacher details for teacherId ${teacherId}:`,
				error
			);
		}
	};

	const updateLeaveStatus = async (teacherId, action) => {
		try {
			const response = await axios.put(
				API_ENDPOINTS.UPDATE_LEAVES(teacherId, action),
				{
					status: action,
				}
			);
			if (response.status === 200) {
				// Refetch leaves to update the list
				const fetchLeaves = async () => {
					try {
						const response = await axios.get(
							API_ENDPOINTS.FETCH_ALL_PENDING_LEAVES
						);
						if (Array.isArray(response.data.leaves)) {
							setLeaves(response.data.leaves);
							// Fetch teacher details for all leaves
							const teacherIds = response.data.leaves.map(
								(leave) => leave.teacherId
							);
							const uniqueTeacherIds = [...new Set(teacherIds)];
							uniqueTeacherIds.forEach((teacherId) =>
								fetchTeacherDetails(teacherId)
							);
						} else {
							console.error("Unexpected data format:", response.data);
						}
					} catch (error) {
						console.error("Error fetching leaves:", error);
					}
				};
				fetchLeaves();
			} else {
				throw new Error("Failed to update leave status");
			}
		} catch (error) {
			console.error("Error updating leave status:", error);
		}
	};

	const handleApprove = (teacherId) => {
		updateLeaveStatus(teacherId, "Accept");
	};

	const handleReject = (teacherId) => {
		updateLeaveStatus(teacherId, "Reject");
	};

	// Pagination logic
	const indexOfLastLeave = currentPage * leavesPerPage;
	const indexOfFirstLeave = indexOfLastLeave - leavesPerPage;
	const currentLeaves = leaves.slice(indexOfFirstLeave, indexOfLastLeave);

	const handlePrevPage = () => {
		if (currentPage > 1) setCurrentPage(currentPage - 1);
	};

	const handleNextPage = () => {
		if (currentPage < Math.ceil(leaves.length / leavesPerPage))
			setCurrentPage(currentPage + 1);
	};

	const handlePageChange = (event) => {
		const pageNumber = Number(event.target.value);
		if (
			pageNumber > 0 &&
			pageNumber <= Math.ceil(leaves.length / leavesPerPage)
		) {
			setCurrentPage(pageNumber);
		}
	};

	const currentDate = new Date();
	const handleDailyAttendanceClick = () => {
		navigate("/attendance");
	};
	const getDefaultPhoto = (gender) => {
		return gender && gender.toLowerCase() === "female"
			? defaultFemalePhoto
			: defaultMalePhoto;
	};

	return (
		<>
			<div className="p-4 flex flex-wrap">
				<div className="lg:w-3/4 w-full px-2 ">
					<h3 className="font-bold text-2xl">Attendance</h3>
					<div className="flex flex-wrap justify-between">
						<DailyAttendancePercentage
							selectedDate={currentDate}
							onClick={handleDailyAttendanceClick}
						/>
					</div>
				</div>
				<div className="lg:w-1/4 w-full px-2">
					<h3 className="font-bold text-2xl">Request</h3>
					<div className="flex flex-wrap md:justify-between justify-center w-full ">
						{currentLeaves.length > 0 ? (
							currentLeaves.map((leave, index) => {
								const teacher = teachers[leave.teacherId];
								const userDP = teacher
									? teacher.photo || getDefaultPhoto(teacher.gender)
									: getDefaultPhoto("male");
								return (
									<CommonCard
										key={index}
										userDP={userDP}
										userName={leave.name}
										userReq={leave.reason}
										onApprove={() => handleApprove(leave.teacherId)}
										onReject={() => handleReject(leave.teacherId)}
									/>
								);
							})
						) : (
							<p>No leave requests received</p>
						)}
					</div>
					<div className="inline-flex justify-center gap-1 mt-4">
						<button
							onClick={handlePrevPage}
							className="inline-flex size-8 items-center justify-center rounded border border-gray-100 bg-white text-gray-900 rtl:rotate-180"
						>
							<span className="sr-only">Prev Page</span>
							<Icon icon={"iconamoon:arrow-left-2-bold"} height={24} />
						</button>

						<div>
							<label htmlFor="PaginationPage" className="sr-only">
								Page
							</label>
							<input
								type="number"
								className="h-8 w-12 rounded border border-gray-100 bg-white p-0 text-center text-xs font-medium text-gray-900 [-moz-appearance:_textfield] [&::-webkit-inner-spin-button]:m-0 [&::-webkit-inner-spin-button]:appearance-none [&::-webkit-outer-spin-button]:m-0 [&::-webkit-outer-spin-button]:appearance-none"
								min="1"
								value={currentPage}
								onChange={handlePageChange}
								id="PaginationPage"
							/>
						</div>

						<button
							onClick={handleNextPage}
							className="inline-flex size-8 items-center justify-center rounded border border-gray-100 bg-white text-gray-900 rtl:rotate-180"
						>
							<span className="sr-only">Next Page</span>
							<Icon icon={"iconamoon:arrow-right-2-bold"} height={24} />
						</button>
					</div>
				</div>
			</div>
			<Employee />
		</>
	);
};

export default Employees;
