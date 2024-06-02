import React, { useState, useEffect } from "react";
import axios from "axios";
import API_ENDPOINTS from "../../API/apiEndpoints";
import CardContainer from "../main/dashboard/CardContainer";
import ChartContainer from "../main/dashboard/charts/ChartContainer";
import Employee from "../main/dashboard/employeesDetails/Employee";
import Modal from "../popup/Modal";
import ListTable from "../List/ListTable";
import CommonTable from "../List/CommonTable";
import anju from "../../assets/user/anju.jpg";
import akriti from "../../assets/user/akriti.jpg";
import ankur from "../../assets/user/ankur.jpg";
import vikas from "../../assets/user/vikas.jpg";

const Dashboard = () => {
	const [dueFeesModalOpen, setDueFeesModalOpen] = useState(false);
	const [reqModalOpen, setReqModalOpen] = useState(false);
	const [students, setStudents] = useState([]);
	const [leaves, setLeaves] = useState([]);
	const [isLoading, setIsLoading] = useState(true);

	const imageMap = {
		anju: anju,
		akriti: akriti,
		ankur: ankur,
		vikas: vikas,
	};

	useEffect(() => {
		axios
			.get(API_ENDPOINTS.FETCH_ALL_STUDENTS)
			.then((response) => {
				if (response.status !== 200) {
					throw new Error("Network response was not ok");
				}
				const data = response.data;
				if (Array.isArray(data.data)) {
					setStudents(data.data);
				} else {
					console.error("Unexpected data format:", data);
				}
			})
			.catch((error) => console.error("Error fetching students:", error))
			.finally(() => setIsLoading(false));
	}, []);

	const handleDueFees = () => {
		setDueFeesModalOpen(true);
	};

	const handlePendingRequest = () => {
		setReqModalOpen(true);
		axios
			.get(API_ENDPOINTS.FETCH_ALL_PENDING_LEAVES)
			.then((response) => {
				if (response.status !== 200 && response.status !== 201) {
					console.error("Unexpected response status:", response.status);
					console.error("Full response:", response);
					throw new Error("Network response was not ok");
				}
				const data = response.data;
				if (Array.isArray(data.leaves)) {
					setLeaves(data.leaves);
				} else {
					console.error("Unexpected data format:", data);
				}
			})
			.catch((error) => console.error("Error fetching leaves:", error));
	};

	const updateLeaveStatus = (leaveId, status) => {
		axios
			.put(API_ENDPOINTS.UPDATE_LEAVES(leaveId, status), { status })
			.then((response) => {
				if (response.status !== 200) {
					throw new Error("Failed to update leave status");
				}
				// Refresh leaves list after updating status
				handlePendingRequest();
			})
			.catch((error) => console.error("Error updating leave status:", error));
	};

	const handleApprove = (leaveId) => {
		updateLeaveStatus(leaveId, "approved");
	};

	const handleReject = (leaveId) => {
		updateLeaveStatus(leaveId, "rejected");
	};

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
						<>
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
										{leaves.map((leave, index) => (
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
														onClick={() => handleApprove(leave.id)}
													>
														Approve
													</button>
													<button
														className="inline-block rounded bg-red-500 px-4 py-2 text-xs font-medium text-white hover:bg-red-700 ml-2"
														onClick={() => handleReject(leave.id)}
													>
														Reject
													</button>
												</td>
											</tr>
										))}
									</tbody>
								</table>
							</div>
						</>
					) : (
						<p>No Pending Requests</p>
					)}
				</div>
			</Modal>
			<Modal
				modalOpen={dueFeesModalOpen}
				setModalOpen={setDueFeesModalOpen}
				responsiveWidth={"md:w-[60%]"}
			>
				<div className="bg-white p-8 rounded-md w-fit sm:w-full">
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
									profile={imageMap[student.profileImage] || akriti} // Default to 'akriti' if no matching image
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
			<ChartContainer />
			<Employee />
		</>
	);
};

export default Dashboard;
