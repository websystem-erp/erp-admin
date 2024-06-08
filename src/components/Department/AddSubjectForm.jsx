import React from "react";

const InputField = ({ label, name, value, onChange, type, placeholder }) => (
	<div className="mb-4">
		<label className="block text-sm font-medium text-gray-700">{label}</label>
		<input
			type={type}
			name={name}
			value={value}
			onChange={onChange}
			className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none text-black sm:text-sm"
			placeholder={placeholder}
		/>
	</div>
);

const AddSubjectForm = ({
	formValues,
	handleChange,
	handleSubmit,
	handleCancel,
}) => (
	<div className="bg-gray-800 p-4 rounded-lg mt-4">
		<h5 className="text-white">Add New Subject</h5>
		<form onSubmit={handleSubmit}>
			<InputField
				label="Subject Name"
				name="subjectName"
				value={formValues.subjectName}
				onChange={handleChange}
				placeholder="Subject Name"
				type="text"
			/>
			<InputField
				label="Subject Code"
				name="subjectCode"
				value={formValues.subjectCode}
				onChange={handleChange}
				placeholder="Subject Code"
				type="text"
			/>
			<InputField
				label="Total Lectures"
				name="totalLectures"
				value={formValues.totalLectures}
				onChange={handleChange}
				type="number"
				placeholder="Total Lectures"
			/>
			<div className="flex justify-end items-center mt-4 gap-4">
				<button
					className="px-4 w-1/2 py-2 text-white border-red-500 border-2 rounded-lg hover:bg-red-500"
					type="button"
					onClick={handleCancel}
				>
					Cancel
				</button>
				<button
					className="px-4 py-2 w-1/2 text-white bg-green-600 rounded-lg"
					type="submit"
				>
					Add Subject
				</button>
			</div>
		</form>
	</div>
);

export default AddSubjectForm;
