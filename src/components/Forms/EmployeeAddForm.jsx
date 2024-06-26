import React, { useState, useEffect } from "react";
import axios from "axios";
import API_ENDPOINTS from "../../API/apiEndpoints";
import FloatingInput from "./FloatingInput";
import { Icon } from "@iconify/react";

const EmployeeAddForm = ({ onEmployeeAdded }) => {
	const [formData, setFormData] = useState({
		name: "",
		email: "",
		password: "",
		role: "",
		gender: "",
		dob: "",
		departmentName: "",
		contactNumber: "",
		permanent_address: "",
		currentAddress: "",
		subject: {
			subjectName: "",
			subjectCode: "",
			totalLectures: 0,
			totalLectureTaken: 0,
		},
		photo: "",
	});

	const [loading, setLoading] = useState(false);
	const [error, setError] = useState(null);
	const [photoLoading, setPhotoLoading] = useState(false);
	const [departments, setDepartments] = useState([]);

	useEffect(() => {
		const fetchDepartments = async () => {
			try {
				const response = await axios.get(API_ENDPOINTS.FETCH_ALL_DEPARTMENTS);
				setDepartments(response.data.data);
			} catch (error) {
				console.error("Error fetching departments:", error);
			}
		};

		fetchDepartments();
	}, []);

	const handleChange = (e) => {
		const { name, value } = e.target;
		setFormData({
			...formData,
			[name]: value,
		});
	};

	const handleSubjectChange = (e) => {
		const { name, value } = e.target;
		setFormData({
			...formData,
			subject: {
				...formData.subject,
				[name]: value,
			},
		});
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

	const handleSubmit = async (e) => {
		e.preventDefault();
		setLoading(true);
		setError(null);

		const selectedDepartment = departments.find(
			(dept) => dept.name === formData.departmentName
		);

		try {
			const response = await axios.post(
				API_ENDPOINTS.REGISTER_TEACHER,
				{
					...formData,
					departmentId: selectedDepartment ? selectedDepartment.id : null,
				},
				{
					headers: {
						Authorization: `Bearer ${import.meta.env.VITE_API_KEY}`,
					},
				}
			);
			console.log("Response:", response.data);
			onEmployeeAdded();
		} catch (error) {
			console.error(
				"Error:",
				error.response?.data?.message || "An error occurred"
			);
			setError(error.response?.data?.message || "An error occurred");
		} finally {
			setLoading(false);
		}
	};

	return (
		<form
			onSubmit={handleSubmit}
			className="max-w-lg mx-auto p-4 bg-white rounded shadow"
		>
			{error && <div className="error-message">{error}</div>}
			<div className="flex flex-col items-center mb-4">
				<div className="relative">
					{formData.photo ? (
						<img
							src={formData.photo}
							alt="Employee Photo"
							className="w-24 h-24 rounded-full object-cover cursor-pointer"
							onClick={() => document.getElementById("photoUpload").click()}
						/>
					) : (
						<div
							className="w-24 h-24 rounded-full bg-gray-200 flex items-center justify-center cursor-pointer"
							onClick={() => document.getElementById("photoUpload").click()}
						>
							{photoLoading ? (
								<p>Uploading...</p>
							) : (
								<span className="text-xs p-1 rounded-full absolute right-0 bottom-0 bg-gray-200">
									<Icon
										icon="majesticons:camera"
										className="h-6 w-6 flex-shrink-0"
									/>
								</span>
							)}
						</div>
					)}
					<input
						type="file"
						id="photoUpload"
						className="hidden"
						onChange={handlePhotoUpload}
						accept="image/*"
						disabled={photoLoading}
					/>
				</div>
			</div>
			<div className="grid grid-cols-1 gap-4">
				<FloatingInput
					xtraClass="w-full"
					type="text"
					id="name"
					formTitle="Name"
					value={formData.name}
					handleChange={handleChange}
					formName="name"
					required
				/>
				<div>
					<select
						name="departmentName"
						id="departmentName"
						value={formData.departmentName}
						onChange={handleChange}
						className="w-full p-2 border rounded"
						required
					>
						<option value="">Select Department</option>
						{departments.map((dept) => (
							<option key={dept.id} value={dept.name}>
								{dept.name}
							</option>
						))}
					</select>
				</div>
				<FloatingInput
					xtraClass="w-full"
					type="text"
					id="contactNumber"
					formTitle="Contact Number"
					value={formData.contactNumber}
					handleChange={handleChange}
					formName="contactNumber"
					required
				/>
				<FloatingInput
					xtraClass="w-full"
					type="date"
					id="dob"
					formTitle="Date of Birth"
					value={formData.dob}
					handleChange={handleChange}
					formName="dob"
					required
				/>
				<FloatingInput
					xtraClass="w-full"
					type="email"
					id="email"
					formTitle="Email"
					value={formData.email}
					handleChange={handleChange}
					formName="email"
					required
				/>
				<FloatingInput
					xtraClass="w-full"
					type="password"
					id="password"
					formTitle="Password"
					value={formData.password}
					handleChange={handleChange}
					formName="password"
					required
				/>
				<FloatingInput
					xtraClass="w-full"
					type="text"
					id="gender"
					formTitle="Gender"
					value={formData.gender}
					handleChange={handleChange}
					formName="gender"
					required
				/>
				<FloatingInput
					xtraClass="w-full"
					type="text"
					id="role"
					formTitle="Role"
					value={formData.role}
					handleChange={handleChange}
					formName="role"
					required
				/>
				<FloatingInput
					xtraClass="w-full"
					type="text"
					id="permanent_address"
					formTitle="Permanent Address"
					value={formData.permanent_address}
					handleChange={handleChange}
					formName="permanent_address"
					required
				/>
				<FloatingInput
					xtraClass="w-full"
					type="text"
					id="currentAddress"
					formTitle="Current Address"
					value={formData.currentAddress}
					handleChange={handleChange}
					formName="currentAddress"
					required
				/>
				<FloatingInput
					xtraClass="w-full"
					type="text"
					id="subjectName"
					formTitle="Subject Name"
					value={formData.subject.subjectName}
					handleChange={handleSubjectChange}
					formName="subjectName"
				/>
				<FloatingInput
					xtraClass="w-full"
					type="text"
					id="subjectCode"
					formTitle="Subject Code"
					value={formData.subject.subjectCode}
					handleChange={handleSubjectChange}
					formName="subjectCode"
				/>
				<FloatingInput
					xtraClass="w-full"
					type="number"
					id="totalLectures"
					formTitle="Total Lectures"
					value={formData.subject.totalLectures}
					handleChange={handleSubjectChange}
					formName="totalLectures"
				/>
				<FloatingInput
					xtraClass="w-full"
					type="number"
					id="totalLectureTaken"
					formTitle="Total Lectures Taken"
					value={formData.subject.totalLectureTaken}
					handleChange={handleSubjectChange}
					formName="totalLectureTaken"
				/>
			</div>
			<button
				type="submit"
				className="px-4 py-4 text-sm font-medium text-white bg-linear-blue w-full my-4 rounded hover:bg-blue-700"
				disabled={loading}
			>
				{loading ? "Submitting..." : "Submit"}
			</button>
		</form>
	);
};

export default EmployeeAddForm;
