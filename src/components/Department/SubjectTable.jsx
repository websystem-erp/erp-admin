import React from "react";

const InputField = ({ name, value, onChange, type, className }) => (
	<input
		type={type}
		name={name}
		value={value}
		onChange={onChange}
		className={`mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm ${className}`}
	/>
);

const SubjectTable = ({
	subjects,
	editingSubjectId,
	subjectFormValues,
	onEditClick,
	onSave,
	onInputChange,
}) => (
	<div className="overflow-x-auto">
		<table className="min-w-full divide-y-2 divide-gray-200 bg-white text-sm">
			<thead className="ltr:text-left rtl:text-right">
				<tr>
					<th className="whitespace-nowrap px-4 py-2 font-medium text-gray-900">
						Name
					</th>
					<th className="whitespace-nowrap px-4 py-2 font-medium text-gray-900">
						Code
					</th>
					<th className="whitespace-nowrap px-4 py-2 font-medium text-gray-900">
						Total Lectures
					</th>
					<th className="whitespace-nowrap px-4 py-2 font-medium text-gray-900">
						Teacher
					</th>
					<th className="px-4 py-2"></th>
				</tr>
			</thead>
			<tbody className="divide-y divide-gray-200">
				{subjects.map((subject) => (
					<tr key={subject.id}>
						<td className="whitespace-nowrap px-4 py-2 font-medium text-gray-900">
							{editingSubjectId === subject.id ? (
								<InputField
									name="subjectName"
									value={subjectFormValues.subjectName}
									onChange={onInputChange}
									type="text"
								/>
							) : (
								subject.subjectName
							)}
						</td>
						<td className="whitespace-nowrap px-4 py-2 text-gray-700">
							{editingSubjectId === subject.id ? (
								<InputField
									name="subjectCode"
									value={subjectFormValues.subjectCode}
									onChange={onInputChange}
									type="text"
								/>
							) : (
								subject.subjectCode
							)}
						</td>
						<td className="whitespace-nowrap px-4 py-2 text-gray-700">
							{editingSubjectId === subject.id ? (
								<InputField
									type="number"
									name="totalLectures"
									value={subjectFormValues.totalLectures}
									onChange={onInputChange}
								/>
							) : (
								subject.totalLectures
							)}
						</td>
						<td className="whitespace-nowrap px-4 py-2 text-gray-700">
							{subject.teacher ? subject.teacher.name : "N/A"}
						</td>
						<td className="whitespace-nowrap px-4 py-2">
							{editingSubjectId === subject.id ? (
								<button
									onClick={() => onSave(subject.id)}
									className="inline-block rounded bg-green-600 px-4 py-2 text-xs font-medium text-white hover:bg-green-700"
								>
									Save
								</button>
							) : (
								<button
									onClick={() => onEditClick(subject)}
									className="inline-block rounded bg-indigo-600 px-4 py-2 text-xs font-medium text-white hover:bg-indigo-700"
								>
									Edit
								</button>
							)}
						</td>
					</tr>
				))}
			</tbody>
		</table>
	</div>
);

export default SubjectTable;
