import React, { useState } from "react";

const DepartmentForm = ({ onSubmit, onClose }) => {
	const [formData, setFormData] = useState({
		name: "",
		code: "",
		campusId: "",
		subjects: [],
		teachers: [],
		students: [],
	});

	const handleChange = (e) => {
		const { name, value } = e.target;
		setFormData((prevState) => ({
			...prevState,
			[name]: value,
		}));
	};

	const handleSubmit = (e) => {
		e.preventDefault();
		onSubmit(formData);
		setFormData({
			name: "",
			code: "",
			campusId: "",
			subjects: [],
			teachers: [],
			students: [],
		});
	};

	return (
		<div className="bg-white p-8 rounded-xl">
			<form onSubmit={handleSubmit} className="text-black">
				<label htmlFor="name">Course Name:</label>
				<input
					type="text"
					id="name"
					name="name"
					value={formData.name}
					onChange={handleChange}
					placeholder="Enter Course Name"
				/>

				<label htmlFor="code">Course Code:</label>
				<input
					type="text"
					id="code"
					name="code"
					value={formData.code}
					onChange={handleChange}
					placeholder="Enter Course Code"
				/>

				<label htmlFor="campusId">Campus ID:</label>
				<input
					type="text"
					id="campusId"
					name="campusId"
					value={formData.campusId}
					onChange={handleChange}
					placeholder="Enter Campus ID"
				/>

				{/* Inputs and labels for subjects, teachers, students */}
				{/* Add/remove buttons for subjects, teachers, students */}

				<div className="flex justify-end items-center mt-4">
					<button
						className="px-4 py-2 me-4 border-red-500 border-2 rounded-lg"
						type="button"
						onClick={onClose}
					>
						Cancel
					</button>
					<button
						className="px-4 py-2 ms-4 bg-linear-green rounded-lg"
						type="submit"
					>
						Submit
					</button>
				</div>
			</form>
		</div>
	);
};

export default DepartmentForm;
