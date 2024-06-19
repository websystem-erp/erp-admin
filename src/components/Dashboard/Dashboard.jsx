import React, { useState, useEffect } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import API_ENDPOINTS from "../../API/apiEndpoints";
import CardContainer from "../main/dashboard/CardContainer";
import DailyAttendancePercentage from "../Attendance/DailyAttendancePercentage";
import Employee from "../main/dashboard/employeesDetails/Employee";
import Modal from "../popup/Modal";
import ListTable from "../List/ListTable";
import CommonTable from "../List/CommonTable";

const Dashboard = () => {
	const [dueFeesModalOpen, setDueFeesModalOpen] = useState(false);
	const [reqModalOpen, setReqModalOpen] = useState(false);
	const [students, setStudents] = useState([]);
	const [leaves, setLeaves] = useState([]);
	const [isLoading, setIsLoading] = useState(true);

	const navigate = useNavigate();

	useEffect(() => {
		const fetchStudents = async () => {
			try {
				const response = await axios.get(API_ENDPOINTS.FETCH_ALL_STUDENTS);
				if (Array.isArray(response.data.data)) {
					setStudents(response.data.data);
				} else {
					console.error("Unexpected data format:", response.data);
				}
			} catch (error) {
				console.error("Error fetching students:", error);
			} finally {
				setIsLoading(false);
			}
		};
		fetchStudents();
	}, []);

	const handleDueFees = () => setDueFeesModalOpen(true);
	const handlePendingRequest = () => {
		setReqModalOpen(true);
		fetchLeaves();
	};

	const fetchLeaves = async () => {
		try {
			const response = await axios.get(API_ENDPOINTS.FETCH_ALL_PENDING_LEAVES);
			if (Array.isArray(response.data.leaves)) {
				setLeaves(response.data.leaves);
			} else {
				console.error("Unexpected data format:", response.data);
			}
		} catch (error) {
			console.error("Error fetching leaves:", error);
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

	const handleDailyAttendanceClick = () => {
		navigate("/attendance");
	};

	const currentDate = new Date();

	return (
		<>
			<CardContainer
				onDueFeesClick={handleDueFees}
				onPendingRequestClick={handlePendingRequest}
			/>
			<Modal
				modalOpen={reqModalOpen}
				setModalOpen={setReqModalOpen}
				responsiveWidth={"md:w-[60%]"}
			>
				<div className="bg-white p-8 rounded-md w-fit sm:w-full max-h-[80vh] overflow-y-auto">
					<h2 className="text-gray-600 font-semibold">
						Pending Request Details
					</h2>
					{leaves.length > 0 ? (
						<div className="overflow-x-auto">
							<table className="min-w-full divide-y-2 divide-gray-200 bg-white text-sm">
								<thead>
									<tr>
										<th className="whitespace-nowrap px-4 py-2 font-medium text-gray-900">
											Name
										</th>
										<th className="whitespace-nowrap px-4 py-2 font-medium text-gray-900">
											Reason
										</th>
										<th className="whitespace-nowrap px-4 py-2 font-medium text-gray-900">
											From
										</th>
										<th className="whitespace-nowrap px-4 py-2 font-medium text-gray-900">
											To
										</th>
										<th className="whitespace-nowrap px-4 py-2 font-medium text-gray-900">
											Status
										</th>
										<th className="whitespace-nowrap px-4 py-2 font-medium text-gray-900">
											Number of Days
										</th>
										<th className="whitespace-nowrap px-4 py-2 font-medium text-gray-900">
											Actions
										</th>
									</tr>
								</thead>
								<tbody className="divide-y divide-gray-200">
									{leaves.map((leave, index) => {
										const teacherId = leave.teacherId;
										return (
											<tr key={index}>
												<td className="whitespace-nowrap px-4 py-2 font-medium text-gray-900">
													{leave.name}
												</td>
												<td className="whitespace-nowrap px-4 py-2 text-gray-700">
													{leave.reason}
												</td>
												<td className="whitespace-nowrap px-4 py-2 text-gray-700">
													{new Date(leave.dateFrom).toLocaleDateString()}
												</td>
												<td className="whitespace-nowrap px-4 py-2 text-gray-700">
													{new Date(leave.dateTo).toLocaleDateString()}
												</td>
												<td className="whitespace-nowrap px-4 py-2 text-gray-700">
													{leave.status}
												</td>
												<td className="whitespace-nowrap px-4 py-2 text-gray-700">
													{leave.noOfDays}
												</td>
												<td className="whitespace-nowrap px-4 py-2">
													<button
														className="inline-block rounded bg-green-500 px-4 py-2 text-xs font-medium text-white hover:bg-green-700"
														onClick={() => handleApprove(teacherId)}
													>
														Approve
													</button>
													<button
														className="inline-block rounded bg-red-500 px-4 py-2 text-xs font-medium text-white hover:bg-red-700 ml-2"
														onClick={() => handleReject(teacherId)}
													>
														Reject
													</button>
												</td>
											</tr>
										);
									})}
								</tbody>
							</table>
						</div>
					) : (
						<p>No Pending Requests</p>
					)}
				</div>
			</Modal>
			<Modal
				modalOpen={dueFeesModalOpen}
				setModalOpen={setDueFeesModalOpen}
				responsiveWidth={"md:w/[60%]"}
			>
				<div className="bg-white p-8 rounded-md w-fit sm:w/full">
					{isLoading ? (
						<p>Loading...</p>
					) : (
						<ListTable
							pageTitle={"Pending Requests"}
							ListName={"Name"}
							ListRole={"Role"}
							ListID={"ID"}
							ListAction={"Actions"}
							hide={"hidden"}
							showDataList={students.map((student) => (
								<CommonTable
									key={student.id}
									profile={student.photo}
									name={student.name}
									role={student.role}
									id={student.id}
									action1={"View Profile"}
									action2={"View Details"}
									dangerAction={"Remove"}
									hideDropDown={"hidden"}
								/>
							))}
						/>
					)}
				</div>
			</Modal>
			<DailyAttendancePercentage
				selectedDate={currentDate}
				onClick={handleDailyAttendanceClick}
			/>
			<Employee />
		</>
	);
};

export default Dashboard;
