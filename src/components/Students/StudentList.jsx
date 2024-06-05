import React, { useState, useEffect } from "react";
import anju from "../../assets/user/anju.jpg";
import akriti from "../../assets/user/akriti.jpg";
import ankur from "../../assets/user/ankur.jpg";
import vikas from "../../assets/user/vikas.jpg";
import ListTable from "../List/ListTable";
import CommonTable from "../List/CommonTable";
import ListTableBtn from "../List/ListTableBtn";
import API_ENDPOINTS from "../../API/apiEndpoints";
import Modal from "../popup/Modal";
import ModalDetails from "../popup/ModalDetails";
import FloatingInput from "../Forms/FloatingInput";

const StudentList = () => {
	const [students, setStudents] = useState([]);
	const [isLoading, setIsLoading] = useState(true);
	const [modalOpen, setModalOpen] = useState(false);
	const [selectedProfile, setSelectedProfile] = useState(null);
	const [formModalOpen, setFormModalOpen] = useState(false);
	const [formData, setFormData] = useState({
		name: "",
		rollNo: "",
		email: "",
		password: "",
		gender: "",
		dob: "",
		contactNumber: "",
		departmentId: "",
		permanent_address: "",
		currentAddress: "",
		fatherName: "",
		motherName: "",
		fatherContactNumber: "",
	});
	const [formErrors, setFormErrors] = useState({});

	const imageMap = {
		anju: anju,
		akriti: akriti,
		ankur: ankur,
		vikas: vikas,
	};

	useEffect(() => {
		const fetchStudents = async () => {
			try {
				const response = await fetch(API_ENDPOINTS.FETCH_ALL_STUDENTS);
				if (!response.ok) {
					throw new Error("Network response was not ok");
				}
				const data = await response.json();
				if (Array.isArray(data.data)) {
					setStudents(data.data);
				} else {
					console.error("Unexpected data format:", data);
				}
			} catch (error) {
				console.error("Error: ", error);
			} finally {
				setIsLoading(false);
			}
		};

		fetchStudents();
	}, []);

	const handleFormModal = () => {
		setFormModalOpen(true);
	};

	const handleViewProfile = (profile) => {
		setSelectedProfile(profile);
		setModalOpen(true);
	};

	const handleDeleteProfile = async (id) => {
		try {
			const response = await fetch(API_ENDPOINTS.DELETE_STUDENTS(id), {
				method: "DELETE",
			});
			if (!response.ok) throw new Error("Network response was not ok");
			setStudents(students.filter((student) => student.id !== id));
		} catch (error) {
			console.error("Error deleting student:", error);
		}
	};

	const handleInputChange = (e) => {
		const { name, value } = e.target;
		setFormData((prevState) => ({
			...prevState,
			[name]: value,
		}));
	};

	const validateForm = () => {
		const errors = {};
		const requiredFields = [
			"name",
			"rollNo",
			"email",
			"password",
			"gender",
			"contactNumber",
			"dob",
			"permanent_address",
			"currentAddress",
			"fatherName",
			"fatherContactNumber",
		];
		requiredFields.forEach((field) => {
			if (!formData[field]) {
				errors[field] = `${field.replace("_", " ")} is required`;
			}
		});
		setFormErrors(errors);
		return Object.keys(errors).length === 0;
	};

	const handleSubmit = async (e) => {
		e.preventDefault();
		if (!validateForm()) {
			return;
		}

		try {
			const response = await fetch(API_ENDPOINTS.REGISTER_STUDENTS, {
				method: "POST",
				headers: {
					"Content-Type": "application/json",
				},
				body: JSON.stringify({
					...formData,
					rollNo: parseInt(formData.rollNo), // Convert rollNo to integer
					departmentId: formData.departmentId
						? parseInt(formData.departmentId)
						: null, // Convert departmentId to integer if it exists
				}),
			});
			if (!response.ok) {
				const errorData = await response.json();
				console.error("Error response:", errorData);
				throw new Error("Network response was not ok");
			}
			const data = await response.json();
			setStudents((prevState) => [...prevState, data.data]);
			setFormModalOpen(false);
		} catch (error) {
			console.error("Error:", error);
		}
	};

	return (
		<>
			{isLoading ? (
				<p>Loading...</p>
			) : (
				<div className="bg-white p-8 rounded-md w-fit sm:w-full">
					<div className="flex items-center justify-between pb-6">
						<div>
							<h2 className="text-gray-600 font-semibold">Student Details</h2>
						</div>
						<div className="flex items-center justify-between">
							<div className="flex flex-col gap-2">
								<ListTableBtn
									onClick={handleFormModal}
									text={"Add Student"}
									buttonColor={"bg-linear-green"}
									borderRadius={"rounded"}
								/>
							</div>
						</div>
						<Modal
							modalOpen={formModalOpen}
							setModalOpen={setFormModalOpen}
							responsiveWidth={"md:w-fit"}
						>
							<form onSubmit={handleSubmit}>
								<FloatingInput
									type="text"
									id="name"
									formTitle="Name"
									value={formData.name}
									handleChange={handleInputChange}
									formName="name"
									xtraClass={formErrors.name ? "border-red-500" : ""}
								/>
								{formErrors.name && (
									<p className="text-red-500">{formErrors.name}</p>
								)}

								<FloatingInput
									type="number"
									id="rollNo"
									formTitle="Roll No"
									value={formData.rollNo}
									handleChange={handleInputChange}
									formName="rollNo"
									xtraClass={formErrors.rollNo ? "border-red-500" : ""}
								/>
								{formErrors.rollNo && (
									<p className="text-red-500">{formErrors.rollNo}</p>
								)}

								<FloatingInput
									type="email"
									id="email"
									formTitle="Email"
									value={formData.email}
									handleChange={handleInputChange}
									formName="email"
									xtraClass={formErrors.email ? "border-red-500" : ""}
								/>
								{formErrors.email && (
									<p className="text-red-500">{formErrors.email}</p>
								)}

								<FloatingInput
									type="password"
									id="password"
									formTitle="Password"
									value={formData.password}
									handleChange={handleInputChange}
									formName="password"
									xtraClass={formErrors.password ? "border-red-500" : ""}
								/>
								{formErrors.password && (
									<p className="text-red-500">{formErrors.password}</p>
								)}

								<div>
									<select
										name="gender"
										id="gender"
										value={formData.gender}
										onChange={handleInputChange}
										className={`mt-1.5 w-full rounded-lg border-gray-300 text-gray-700 sm:text-sm ${
											formErrors.gender ? "border-red-500" : ""
										}`}
									>
										<option value="">Gender</option>
										<option value="Male">Male</option>
										<option value="Female">Female</option>
										<option value="Other">Other</option>
									</select>
									{formErrors.gender && (
										<p className="text-red-500">{formErrors.gender}</p>
									)}
								</div>

								<FloatingInput
									type="date"
									id="dob"
									formTitle="Date of Birth"
									value={formData.dob}
									handleChange={handleInputChange}
									formName="dob"
									xtraClass={formErrors.dob ? "border-red-500" : ""}
								/>
								{formErrors.dob && (
									<p className="text-red-500">{formErrors.dob}</p>
								)}

								<FloatingInput
									type="text"
									id="contactNumber"
									formTitle="Contact Number"
									value={formData.contactNumber}
									handleChange={handleInputChange}
									formName="contactNumber"
									xtraClass={formErrors.contactNumber ? "border-red-500" : ""}
								/>
								{formErrors.contactNumber && (
									<p className="text-red-500">{formErrors.contactNumber}</p>
								)}

								<div>
									<select
										name="departmentId"
										id="departmentId"
										value={formData.departmentId}
										onChange={handleInputChange}
										className={`mt-1.5 w-full rounded-lg border-gray-300 text-gray-700 sm:text-sm ${
											formErrors.departmentId ? "border-red-500" : ""
										}`}
									>
										<option value="">Department ID</option>
										<option value="1">1</option>
										<option value="2">2</option>
										<option value="3">3</option>
									</select>
									{formErrors.departmentId && (
										<p className="text-red-500">{formErrors.departmentId}</p>
									)}
								</div>

								<FloatingInput
									type="text"
									id="permanent_address"
									formTitle="Permanent Address"
									value={formData.permanent_address}
									handleChange={handleInputChange}
									formName="permanent_address"
									xtraClass={
										formErrors.permanent_address ? "border-red-500" : ""
									}
								/>
								{formErrors.permanent_address && (
									<p className="text-red-500">{formErrors.permanent_address}</p>
								)}

								<FloatingInput
									type="text"
									id="currentAddress"
									formTitle="Current Address"
									value={formData.currentAddress}
									handleChange={handleInputChange}
									formName="currentAddress"
									xtraClass={formErrors.currentAddress ? "border-red-500" : ""}
								/>
								{formErrors.currentAddress && (
									<p className="text-red-500">{formErrors.currentAddress}</p>
								)}

								<FloatingInput
									type="text"
									id="fatherName"
									formTitle="Father's Name"
									value={formData.fatherName}
									handleChange={handleInputChange}
									formName="fatherName"
									xtraClass={formErrors.fatherName ? "border-red-500" : ""}
								/>
								{formErrors.fatherName && (
									<p className="text-red-500">{formErrors.fatherName}</p>
								)}

								<FloatingInput
									type="text"
									id="motherName"
									formTitle="Mother's Name"
									value={formData.motherName}
									handleChange={handleInputChange}
									formName="motherName"
								/>

								<FloatingInput
									type="text"
									id="fatherContactNumber"
									formTitle="Father's Contact Number"
									value={formData.fatherContactNumber}
									handleChange={handleInputChange}
									formName="fatherContactNumber"
									xtraClass={
										formErrors.fatherContactNumber ? "border-red-500" : ""
									}
								/>
								{formErrors.fatherContactNumber && (
									<p className="text-red-500">
										{formErrors.fatherContactNumber}
									</p>
								)}

								<button
									type="submit"
									className="px-4 py-4 text-sm font-medium text-white bg-linear-blue w-full my-4 rounded hover:bg-blue-700"
								>
									Add Student
								</button>
							</form>
						</Modal>
					</div>
					<ListTable
						pageTitle={"Student Details"}
						ListName={"Name"}
						ListRole={"Role"}
						ListID={"ID"}
						ListAction={"Actions"}
						showDataList={students.map((student) => (
							<CommonTable
								key={student.id}
								profile={imageMap[student.profileImage] || akriti}
								name={student.name}
								role={student.role}
								id={student.id}
								dangerAction={"Remove"}
								action1={"View Profile"}
								buttonHide={"hidden"}
								onViewProfile={() =>
									handleViewProfile({
										profile: imageMap[student.profileImage] || akriti,
										name: student.name,
										role: student.role,
										id: student.id,
										gender: student.gender,
										dob: student.dob,
										contactNumber: student.contactNumber,
										departmentId: student.departmentId,
										permanent_address: student.permanent_address,
										currentAddress: student.currentAddress,
										fatherName: student.fatherName,
										motherName: student.motherName,
										fatherContactNumber: student.fatherContactNumber,
									})
								}
								onDelete={() => handleDeleteProfile(student.id)}
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
								<ModalDetails
									modalTitle={"Father's Name : "}
									modalDesc={selectedProfile.fatherName}
								/>
								<ModalDetails
									modalTitle={"Mother's Name : "}
									modalDesc={selectedProfile.motherName}
								/>
								<ModalDetails
									modalTitle={"Father's Contact Number : "}
									modalDesc={selectedProfile.fatherContactNumber}
								/>
								<ModalDetails
									modalTitle={"Permanent Address : "}
									modalDesc={selectedProfile.permanent_address}
								/>
								<ModalDetails
									modalTitle={"Current Address : "}
									modalDesc={selectedProfile.currentAddress}
								/>
							</div>
						</Modal>
					)}
				</div>
			)}
		</>
	);
};

export default StudentList;
