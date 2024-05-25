import React, { useState } from "react";
import axios from "axios";
import FloatingInput from "./FloatingInput";

const EmployeeAddForm = () => {
	const [formData, setFormData] = useState({
		name: "",
		email: "",
		password: "",
		role: "",
		gender: "",
		dob: "",
		contactNumber: "",
		departmentId: 1,
		permanent_address: "",
		currentAddress: "",
		subject: {
			subjectName: "",
			subjectCode: "",
			totalLectures: 0,
			totalLectureTaken: 0,
		},
	});

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

	const handleSubmit = async (e) => {
		e.preventDefault();
		try {
			const response = await axios.post(
				"https://erp-system-backend.onrender.com/api/v1/teacher/1/reg",
				formData
			);
			console.log("Response:", response.data);
		} catch (error) {
			console.error("Error:", error);
		}
	};

	return (
		<form onSubmit={handleSubmit}>
			<FloatingInput
				xtraClass={"w-full"}
				type="text"
				id="name"
				formTitle="Name"
				value={formData.name}
				handleChange={handleChange}
				formName="name"
				required
			/>
			<div className="flex gap-4 ">
				<div className="w-full">
					<FloatingInput
						xtraClass={"flex-1"}
						type="text"
						id="contactNumber"
						formTitle="Contact Number"
						value={formData.contactNumber}
						handleChange={handleChange}
						formName="contactNumber"
						required
					/>
				</div>
				<FloatingInput
					xtraClass={" "}
					type="date"
					id="dob"
					formTitle="Date of Birth"
					value={formData.dob}
					handleChange={handleChange}
					formName="dob"
					required
				/>
			</div>
			<div className="flex gap-4">
				<FloatingInput
					xtraClass={"flex-1"}
					type="email"
					id="email"
					formTitle="Email"
					value={formData.email}
					handleChange={handleChange}
					formName="email"
					required
				/>
				<FloatingInput
					xtraClass={"flex-1"}
					type="password"
					id="password"
					formTitle="Password"
					value={formData.password}
					handleChange={handleChange}
					formName="password"
					required
				/>
			</div>

			<div className="flex gap-4">
				<FloatingInput
					xtraClass={"w-full"}
					type="text"
					id="gender"
					formTitle="Gender"
					value={formData.gender}
					handleChange={handleChange}
					formName="gender"
					required
				/>
				<FloatingInput
					xtraClass={"flex-1"}
					type="text"
					id="role"
					formTitle="Role"
					value={formData.role}
					handleChange={handleChange}
					formName="role"
					required
				/>
			</div>
			<FloatingInput
				xtraClass={"flex-1"}
				type="text"
				id="permanent_address"
				formTitle="Permanent Address"
				value={formData.permanent_address}
				handleChange={handleChange}
				formName="permanent_address"
				required
			/>
			<FloatingInput
				xtraClass={"flex-1"}
				type="text"
				id="currentAddress"
				formTitle="Current Address"
				value={formData.currentAddress}
				handleChange={handleChange}
				formName="currentAddress"
				required
			/>
			<div className="flex gap-4">
				<FloatingInput
					xtraClass={"flex-1"}
					type="text"
					id="subjectName"
					formTitle="Subject Name"
					value={formData.subject.subjectName}
					handleChange={handleSubjectChange}
					formName="subjectName"
				/>
				<FloatingInput
					xtraClass={"flex-1"}
					type="text"
					id="subjectCode"
					formTitle="Subject Code"
					value={formData.subject.subjectCode}
					handleChange={handleSubjectChange}
					formName="subjectCode"
				/>
			</div>
			<div className="flex gap-4">
				<FloatingInput
					xtraClass={"flex-1"}
					type="number"
					id="totalLectures"
					formTitle="Total Lectures"
					value={formData.subject.totalLectures}
					handleChange={handleSubjectChange}
					formName="totalLectures"
				/>
				<FloatingInput
					xtraClass={"flex-1"}
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
				className="w-full my-8 inline-block rounded border bg-linear-blue text-white  px-12 py-3 text-sm font-medium  hover:bg-linear-blue  focus:outline-none focus:ring "
			>
				Submit
			</button>
		</form>
	);
};

export default EmployeeAddForm;
