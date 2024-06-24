import React, { useState, useEffect } from "react";
import FloatingInput from "../Forms/FloatingInput";
import Modal from "../popup/Modal";
import axios from "axios";
import API_ENDPOINTS from "../../API/apiEndpoints";

const StudentForm = ({ isOpen, onClose, onStudentAdd }) => {
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
		photo: "",
	});
	const [formErrors, setFormErrors] = useState({});
	const [photoLoading, setPhotoLoading] = useState(false);
	const [departments, setDepartments] = useState([]);

	useEffect(() => {
		const fetchDepartments = async () => {
			try {
				const response = await axios.get(API_ENDPOINTS.FETCH_ALL_DEPARTMENTS);
				console.log("Departments fetched:", response.data.data); // Log departments data
				if (Array.isArray(response.data.data)) {
					setDepartments(response.data.data);
				} else {
					console.error("Unexpected response format", response.data);
					setDepartments([]);
				}
			} catch (error) {
				console.error("Error fetching departments:", error);
				setDepartments([]);
			}
		};

		fetchDepartments();
	}, []);

	const handleInputChange = (e) => {
		const { name, value } = e.target;
		setFormData((prevState) => ({
			...prevState,
			[name]: value,
		}));
	};

	const handlePhotoUpload = async (e) => {
		setPhotoLoading(true);
		const file = e.target.files[0];
		const photoFormData = new FormData();
		photoFormData.append("file", file);
		photoFormData.append(
			"upload_preset",
			import.meta.env.VITE_CLOUDINARY_UPLOAD_PRESET
		);

		try {
			const response = await axios.post(
				`https://api.cloudinary.com/v1_1/${
					import.meta.env.VITE_CLOUDINARY_CLOUD_NAME
				}/image/upload`,
				photoFormData
			);
			setFormData((prevData) => ({
				...prevData,
				photo: response.data.secure_url,
			}));
		} catch (error) {
			console.error(
				"Error uploading photo:",
				error.response?.data || error.message
			);
		} finally {
			setPhotoLoading(false);
		}
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
					rollNo: parseInt(formData.rollNo),
					departmentId: formData.departmentId
						? parseInt(formData.departmentId)
						: null,
				}),
			});
			if (!response.ok) {
				const errorData = await response.json();
				console.error("Error response:", errorData);
				throw new Error("Network response was not ok");
			}
			const data = await response.json();
			onStudentAdd(data.data);
			onClose();
		} catch (error) {
			console.error("Error:", error);
		}
	};

	return (
		<Modal
			modalOpen={isOpen}
			setModalOpen={onClose}
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
				{formErrors.name && <p className="text-red-500">{formErrors.name}</p>}

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
				{formErrors.email && <p className="text-red-500">{formErrors.email}</p>}

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
				{formErrors.dob && <p className="text-red-500">{formErrors.dob}</p>}

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
						{departments.map((dept) => (
							<option key={dept.id} value={dept.id}>
								{dept.name} (ID: {dept.id})
							</option>
						))}
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
					xtraClass={formErrors.permanent_address ? "border-red-500" : ""}
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
					xtraClass={formErrors.fatherContactNumber ? "border-red-500" : ""}
				/>
				{formErrors.fatherContactNumber && (
					<p className="text-red-500">{formErrors.fatherContactNumber}</p>
				)}

				<div className="flex gap-4">
					<label className="flex-1">
						Photo:
						<input
							type="file"
							onChange={handlePhotoUpload}
							accept="image/*"
							disabled={photoLoading}
						/>
						{photoLoading && <p>Uploading...</p>}
					</label>
					{formData.photo && (
						<div className="flex-1">
							<p>Photo Preview:</p>
							<img src={formData.photo} alt="Student Photo" width="100" />
						</div>
					)}
				</div>

				<button
					type="submit"
					className="px-4 py-4 text-sm font-medium text-white bg-linear-blue w-full my-4 rounded hover:bg-blue-700"
				>
					Add Student
				</button>
			</form>
		</Modal>
	);
};

export default StudentForm;
