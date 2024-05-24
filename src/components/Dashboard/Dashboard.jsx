import React, { useState, useEffect } from "react";
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
	const [isLoading, setIsLoading] = useState(true);

	const imageMap = {
		anju: anju,
		akriti: akriti,
		ankur: ankur,
		vikas: vikas,
	};

	useEffect(() => {
		const api =
			"https://erp-system-backend.onrender.com/api/v1/student/1/fetchAll";

		fetch(api)
			.then((response) => {
				if (!response.ok) {
					throw new Error("Network response was not ok");
				}
				return response.json();
			})
			.then((data) => {
				if (Array.isArray(data.data)) {
					setStudents(data.data);
				} else {
					console.error("Unexpected data format:", data);
				}
			})
			.catch((error) => console.error("Error: ", error))
			.finally(() => setIsLoading(false));
	}, []);

	const handleDueFees = () => {
		setDueFeesModalOpen(true);
	};

	const handlePendingRequest = () => {
		setReqModalOpen(true);
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
				<div className="bg-white p-8 rounded-md w-fit sm:w-full">
					<h2 className="text-gray-600 font-semibold">
						Pending Request Details
					</h2>
					<p>No Request Received</p>
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
