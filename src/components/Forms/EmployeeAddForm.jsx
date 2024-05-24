import React, { useState } from "react";
import FloatingInput from "./FloatingInput";

const EmployeeAddForm = () => {
	const [formData, setFormData] = useState({
		EmployeeName: "",
		DepartmentID: "",
		EmployeeEmail: "",
		Role: "",
		Gender: "",
		DOB: "",
		phoneNumber: "",
		currentAddress: "",
		permanentAddress: "",
	});

	const handleChange = (e) => {
		setFormData({ ...formData, [e.target.id]: e.target.value });
	};

	const handleSubmit = async (e) => {
		e.preventDefault();
		try {
			const response = await fetch(
				"https://erp-system-backend.onrender.com/api/v1/teacher/1/reg",
				{
					method: "POST",
					headers: {
						"Content-Type": "application/json",
					},
					body: JSON.stringify(formData),
				}
			);

			if (response.ok) {
				console.log("Employee added successfully!");
				// Optionally, you can reset the form here
				// setFormData({
				//   EmployeeName: "",
				//   DepartmentID: "",
				//   EmployeeEmail: "",
				//   Role: "",
				//   Gender: "",
				//   DOB: "",
				//   phoneNumber: "",
				//   currentAddress: "",
				//   permanentAddress: ""
				// });
			} else {
				console.error("Failed to add employee");
			}
		} catch (error) {
			console.error("Error adding employee:", error);
		}
	};

	return (
		<div className="p-5">
			<div className="flex w-96 flex-col space-y-5 rounded-lg border py-10 px-5 shadow-xl mx-auto">
				<div className="mx-auto mb-2 space-y-3">
					<h1 className="text-3xl font-bold text-gray-700">
						Enter Employee Details
					</h1>
				</div>

				<form onSubmit={handleSubmit}>
					<FloatingInput
						type={"text"}
						id={"EmployeeName"}
						formTitle={"Employee Name"}
						value={formData.EmployeeName}
						onChange={handleChange}
					/>
					<FloatingInput
						type={"number"}
						id={"DepartmentID"}
						formTitle={"Department ID"}
						value={formData.DepartmentID}
						onChange={handleChange}
					/>
					<FloatingInput
						type={"email"}
						id={"EmployeeEmail"}
						formTitle={"Employee Email"}
						value={formData.EmployeeEmail}
						onChange={handleChange}
					/>
					<FloatingInput
						type={"text"}
						id={"Role"}
						formTitle={"Employee Role"}
						value={formData.Role}
						onChange={handleChange}
					/>
					<FloatingInput
						type={"text"}
						id={"Gender"}
						formTitle={"Gender"}
						value={formData.Gender}
						onChange={handleChange}
					/>
					<FloatingInput
						type={"date"}
						id={"DOB"}
						formTitle={"Date of Birth"}
						value={formData.DOB}
						onChange={handleChange}
					/>
					<FloatingInput
						type={"number"}
						id={"phoneNumber"}
						formTitle={"Contact Number"}
						value={formData.phoneNumber}
						onChange={handleChange}
					/>
					<FloatingInput
						type={"text"}
						id={"currentAddress"}
						formTitle={"Current Address"}
						value={formData.currentAddress}
						onChange={handleChange}
					/>
					<FloatingInput
						type={"text"}
						id={"permanentAddress"}
						formTitle={"Permanent Address"}
						value={formData.permanentAddress}
						onChange={handleChange}
					/>

					<button
						type="submit"
						className="mt-4 rounded-lg bg-linear-blue py-3 font-bold text-white w-full"
					>
						Submit
					</button>
				</form>
			</div>
		</div>
	);
};

export default EmployeeAddForm;
