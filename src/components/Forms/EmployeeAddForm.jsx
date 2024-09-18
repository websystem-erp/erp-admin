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
	const [isCurrentAddressSame, setIsCurrentAddressSame] = useState(false);

	useEffect(() => {
		document.documentElement.classList.add("no-scroll");
		document.body.classList.add("no-scroll");

		return () => {
			document.documentElement.classList.remove("no-scroll");
			document.body.classList.remove("no-scroll");
		};
	}, []);

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

	const handleCheckboxChange = () => {
		setIsCurrentAddressSame(!isCurrentAddressSame);
		if (!isCurrentAddressSame) {
			setFormData((prevData) => ({
				...prevData,
				currentAddress: prevData.permanent_address,
			}));
		} else {
			setFormData((prevData) => ({
				...prevData,
				currentAddress: "",
			}));
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
			<div className="flex gap-4 justify-between items-center">
				<div className="">
					{formData.photo ? (
						<img
							src={formData.photo}
							alt="Student Photo"
							className="w-24 h-24 rounded-full object-cover cursor-pointer"
							onClick={() => document.getElementById("photoUpload").click()}
						/>
					) : (
						<div
							className="w-24 h-24 rounded-full bg-[url('https://res.cloudinary.com/duyau9qkl/image/upload/v1717910208/images/w7y88n61dxedxzewwzpn.png')] bg-cover flex items-center justify-center cursor-pointer relative"
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
				<div className="flex-1">
					<FloatingInput
						type="text"
						id="name"
						formTitle="Name"
						value={formData.name}
						handleChange={handleChange}
						formName="name"
					/>

					<FloatingInput
						type="date"
						id="dob"
						formTitle="Date of Birth"
						value={formData.dob}
						handleChange={handleChange}
						formName="dob"
					/>
				</div>
			</div>
			<div className="flex gap-2">
				<div className=" mt-2 w-auto flex-1">
					<select
						name="gender"
						id="gender"
						value={formData.gender}
						onChange={handleChange}
						className="w-full rounded-lg border-gray-300 text-gray-700 sm:text-sm border-1 peer block appearance-none border bg-transparent px-2.5 pb-2.5 pt-4 text-sm  focus:border-blue-600 focus:outline-none focus:ring-0"
					>
						<option value="">Gender</option>
						<option value="Male">Male</option>
						<option value="Female">Female</option>
						<option value="Other">Other</option>
					</select>
				</div>
				<div className="flex-1">
					<FloatingInput
						type="text"
						id="role"
						formTitle="Role"
						value={formData.role}
						handleChange={handleChange}
						formName="role"
					/>
				</div>
			</div>
			<div className="mt-1.5">
				<select
					name="departmentName"
					id="departmentName"
					value={formData.departmentName}
					onChange={handleChange}
					className="w-full rounded-lg border-gray-300 text-gray-700 sm:text-sm border-1 peer block appearance-none border bg-transparent px-2.5 pb-2.5 py-4 text-sm  focus:border-blue-600 focus:outline-none focus:ring-0"
				>
					<option value="">Department</option>
					{departments.map((dept) => (
						<option key={dept.id} value={dept.name}>
							{dept.name}
						</option>
					))}
				</select>
			</div>
			<FloatingInput
				type="text"
				id="contactNumber"
				formTitle="Contact Number"
				value={formData.contactNumber}
				handleChange={handleChange}
				formName="contactNumber"
				required
			/>
			<FloatingInput
				type="email"
				id="email"
				formTitle="Email"
				value={formData.email}
				handleChange={handleChange}
				formName="email"
				required
			/>
			<FloatingInput
				type="password"
				id="password"
				formTitle="Password"
				value={formData.password}
				handleChange={handleChange}
				formName="password"
				required
			/>
			<FloatingInput
				type="text"
				id="permanent_address"
				formTitle="Permanent Address"
				value={formData.permanent_address}
				handleChange={handleChange}
				formName="permanent_address"
			/>
			{!isCurrentAddressSame && (
				<FloatingInput
					type="text"
					id="currentAddress"
					formTitle="Current Address"
					value={formData.currentAddress}
					handleChange={handleChange}
					formName="currentAddress"
				/>
			)}
			<label className="flex mt-2 cursor-pointer items-start gap-4">
				<div className="flex items-center">
					&#8203;
					<input
						type="checkbox"
						className="size-4 rounded border-gray-300"
						checked={isCurrentAddressSame}
						onChange={handleCheckboxChange}
					/>
				</div>

				<div>
					<strong className="font-light text-xs text-gray-900">
						Current address same as permanent address
					</strong>
				</div>
			</label>
			<h6 className="my-4 font-bold">Subject Details</h6>
			<div className="flex gap-2">
				<FloatingInput
					type="text"
					id="subjectName"
					formTitle="Subject"
					value={formData.subject.subjectName}
					handleChange={handleSubjectChange}
					formName="subjectName"
				/>
				<FloatingInput
					type="text"
					id="subjectCode"
					formTitle="Subject Code"
					value={formData.subject.subjectCode}
					handleChange={handleSubjectChange}
					formName="subjectCode"
				/>
				<FloatingInput
					type="number"
					id="totalLectureTaken"
					formTitle="Total Lecture"
					value={formData.subject.totalLectureTaken}
					handleChange={handleSubjectChange}
					formName="totalLectureTaken"
				/>
			</div>
			<button
				type="submit"
				className="px-4 py-4 text-sm font-medium text-white bg-linear-blue w-full my-4 rounded"
				disabled={loading}
			>
				{loading ? "Submitting..." : "Submit"}
			</button>
		</form>
	);
};

export default EmployeeAddForm;
