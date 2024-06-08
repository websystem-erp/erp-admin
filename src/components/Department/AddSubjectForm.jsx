import React from "react";
import InputField from "./InputField";

const AddSubjectForm = ({
	formValues,
	handleChange,
	handleSubmit,
	handleCancel,
	teachers,
}) => (
	<div className="p-4 w-full bg-linear-black rounded-lg relative">
		<h4 className="text-center text-lg font-bold text-white p-2">
			Add Subject
		</h4>
		<form onSubmit={handleSubmit}>
			<InputField
				label="Subject Name"
				name="subjectName"
				value={formValues.subjectName}
				onChange={handleChange}
				type="text"
			/>
			<InputField
				label="Subject Code"
				name="subjectCode"
				value={formValues.subjectCode}
				onChange={handleChange}
				type="text"
			/>
			<InputField
				label="Total Lectures"
				name="totalLectures"
				value={formValues.totalLectures}
				onChange={handleChange}
				type="number"
			/>
			<div className="mb-4">
				<label className="block text-white">Teacher</label>
				<select
					name="teacherId"
					value={formValues.teacherId || ""}
					onChange={handleChange}
					className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none text-black sm:text-sm"
				>
					<option value="">Select a teacher</option>
					{teachers.map((teacher) => (
						<option key={teacher.id} value={teacher.id}>
							{teacher.name} ({teacher.id})
						</option>
					))}
				</select>
			</div>
			<div className="flex justify-end gap-2">
				<button
					type="button"
					onClick={handleCancel}
					className="inline-block rounded bg-red-600 px-4 py-2 text-xs font-medium text-white hover:bg-red-700"
				>
					Cancel
				</button>
				<button
					type="submit"
					className="inline-block rounded bg-green-600 px-4 py-2 text-xs font-medium text-white hover:bg-green-700"
				>
					Add
				</button>
			</div>
		</form>
	</div>
);

export default AddSubjectForm;
