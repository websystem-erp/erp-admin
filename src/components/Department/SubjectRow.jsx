import React from "react";

const SubjectRow = ({
	subject,
	isEditing,
	subjectFormValues,
	onEdit,
	onSave,
	onInputChange,
	onEditClick,
}) => (
	<tr>
		<td className="whitespace-nowrap px-4 py-2 font-medium text-gray-900">
			{isEditing ? (
				<input
					type="text"
					name="subjectName"
					value={subjectFormValues.subjectName}
					onChange={onInputChange}
					className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
				/>
			) : (
				subject.subjectName
			)}
		</td>
		<td className="whitespace-nowrap px-4 py-2 text-gray-700">
			{isEditing ? (
				<input
					type="text"
					name="subjectCode"
					value={subjectFormValues.subjectCode}
					onChange={onInputChange}
					className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
				/>
			) : (
				subject.subjectCode
			)}
		</td>
		<td className="whitespace-nowrap px-4 py-2 text-gray-700">
			{isEditing ? (
				<input
					type="number"
					name="totalLectures"
					value={subjectFormValues.totalLectures}
					onChange={onInputChange}
					className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
				/>
			) : (
				subject.totalLectures
			)}
		</td>
		<td className="whitespace-nowrap px-4 py-2">
			{isEditing ? (
				<button
					onClick={() => onSave(subject.id)}
					className="inline-block rounded bg-green-600 px-4 py-2 text-xs font-medium text-white hover:bg-green-700"
				>
					Save
				</button>
			) : (
				<button
					onClick={() => onEditClick(subject)}
					className="inline-block rounded bg-linear-blue px-4 py-2 text-xs font-medium text-white"
				>
					Edit
				</button>
			)}
		</td>
	</tr>
);

export default React.memo(SubjectRow);
