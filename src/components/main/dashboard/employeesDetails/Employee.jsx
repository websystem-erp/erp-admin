import React, { useState, useEffect } from "react";
import ListTable from "../../../List/ListTable";
import CommonTable from "../../../List/CommonTable";
import ListTableBtn from "../../../List/ListTableBtn";
import Modal from "../../../popup/Modal";
import ModalDetails from "../../../popup/ModalDetails";
import EmployeeAddForm from "../../../Forms/EmployeeAddForm";
import API_ENDPOINTS from "../../../../API/apiEndpoints";

const Employee = () => {
	const [teachers, setTeachers] = useState([]);
	const [isLoading, setIsLoading] = useState(true);
	const [modalOpen, setModalOpen] = useState(false);
	const [formModalOpen, setFormModalOpen] = useState(false);
	const [selectedProfile, setSelectedProfile] = useState(null);

	useEffect(() => {
		fetchTeachers();
	}, []);

	const fetchTeachers = async () => {
		try {
			const response = await fetch(API_ENDPOINTS.FETCH_ALL_TEACHERS);
			if (!response.ok) throw new Error("Network response was not ok");
			const data = await response.json();

			// Log fetched data
			console.log("Fetched data:", data);

			if (Array.isArray(data.data)) {
				setTeachers(data.data);
				// Log the teachers data
				console.log("Teachers data:", data.data);
			} else {
				console.error("Unexpected data format:", data);
			}
		} catch (error) {
			console.error("Error fetching teachers:", error);
		} finally {
			setIsLoading(false);
		}
	};

	const handleViewProfile = (profile) => {
		setSelectedProfile(profile);
		setModalOpen(true);
	};

	const handleDeleteProfile = async (id) => {
		try {
			const response = await fetch(
				API_ENDPOINTS.DELETE_TEACHERS.replace(":id", id),
				{ method: "DELETE" }
			);
			if (!response.ok) throw new Error("Network response was not ok");
			setTeachers(teachers.filter((teacher) => teacher.id !== id));
		} catch (error) {
			console.error("Error deleting teacher:", error);
		}
	};

	const handleFormModal = () => {
		setFormModalOpen(true);
	};

	const handleEmployeeAdded = () => {
		fetchTeachers();
		setFormModalOpen(false);
	};

	return (
		<>
			{isLoading ? (
				<p>Loading...</p>
			) : (
				<div className="bg-white p-8 rounded-md w-fit sm:w-full">
					<div className="flex items-center justify-between pb-6">
						<h2 className="text-gray-600 font-semibold">Employee Details</h2>
						<ListTableBtn
							text={"Add Employee"}
							buttonColor={"bg-linear-green"}
							borderRadius={"rounded"}
							onClick={handleFormModal}
						/>
						<Modal
							modalOpen={formModalOpen}
							setModalOpen={setFormModalOpen}
							responsiveWidth={"md:w-fit"}
						>
							<EmployeeAddForm onEmployeeAdded={handleEmployeeAdded} />
						</Modal>
					</div>
					<ListTable
						ListName={"Name"}
						ListRole={"Role"}
						ListID={"ID"}
						ListAction={"Actions"}
						showDataList={teachers.map((teacher) => (
							<CommonTable
								key={teacher.id}
								profile={teacher.photo}
								name={teacher.name}
								role={teacher.role}
								id={teacher.id}
								dangerAction={"Remove"}
								action1={"View Profile"}
								action2={"Edit Profile"}
								buttonHide={"hidden"}
								onViewProfile={() =>
									handleViewProfile({
										profile: teacher.photo,
										name: teacher.name,
										role: teacher.role,
										id: teacher.id,
										gender: teacher.gender,
										dob: teacher.dob,
										contactNumber: teacher.contactNumber,
										departmentId: teacher.departmentId,
										permanent_address: teacher.permanent_address,
										currentAddress: teacher.currentAddress,
									})
								}
								onDelete={() => handleDeleteProfile(teacher.id)}
							/>
						))}
					/>
					{selectedProfile && (
						<Modal
							modalOpen={modalOpen}
							setModalOpen={setModalOpen}
							responsiveWidth={"md:w-fit"}
						>
							<div>
								<img
									src={selectedProfile.profile}
									alt={selectedProfile.name}
									className="w-32 h-32 mx-auto rounded-full"
								/>
								<h3 className="text-xl font-semibold my-4">
									{selectedProfile.name}
								</h3>
								<ModalDetails
									modalTitle={"Department Id : "}
									modalDesc={selectedProfile.departmentId}
								/>
								<ModalDetails
									modalTitle={"ID : "}
									modalDesc={selectedProfile.id}
								/>
								<ModalDetails
									modalTitle={"Gender : "}
									modalDesc={selectedProfile.gender}
								/>
								<ModalDetails
									modalTitle={"Role : "}
									modalDesc={selectedProfile.role}
								/>
								<ModalDetails
									modalTitle={"Date of Birth : "}
									modalDesc={selectedProfile.dob}
								/>
								<ModalDetails
									modalTitle={"Contact Number : "}
									modalDesc={selectedProfile.contactNumber}
								/>
							</div>
						</Modal>
					)}
				</div>
			)}
		</>
	);
};

export default Employee;
