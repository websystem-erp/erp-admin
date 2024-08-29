import React from "react";
import InputField from "./InputField";
import axios from "axios";
import API_ENDPOINTS from "../../API/apiEndpoints";

const SubjectTable = ({
	subjects = [],
	editingSubjectId,
	subjectFormValues,
	onEditClick,
	onSave,
	onInputChange,
	onDelete,
	teachers = [],
}) => {
	const handleSave = async () => {
		console.log("Saving subject ID:", editingSubjectId); // Log subject ID
		const parsedSubjectId = parseInt(editingSubjectId, 10); // Ensure subjectId is a number
		if (isNaN(parsedSubjectId)) {
			console.error("Invalid subject ID:", editingSubjectId);
			return;
		}

		try {
			const updatedSubject = {
				...subjectFormValues,
				totalLectures: parseInt(subjectFormValues.totalLectures, 10),
				teacherId: subjectFormValues.teacherId
					? parseInt(subjectFormValues.teacherId, 10)
					: null,
			};
			console.log("Saving updated subject:", updatedSubject); // Log updated subject data
			const response = await axios.put(
				API_ENDPOINTS.UPDATE_SUBJECT(parsedSubjectId),
				updatedSubject
			);
			if (response.status === 200) {
				onSave(response.data.data);
			} else {
				console.error("Error saving subject:", response.data);
			}
		} catch (error) {
			console.error(
				"Error saving subject:",
				error.response ? error.response.data : error.message
			);
		}
	};

	const handleDelete = async (subjectId) => {
		console.log("Deleting subject ID:", subjectId); // Log subject ID
		const parsedSubjectId = parseInt(subjectId, 10); // Ensure subjectId is a number
		if (isNaN(parsedSubjectId)) {
			console.error("Invalid subject ID:", subjectId);
			return;
		}

		try {
			const response = await axios.delete(
				API_ENDPOINTS.DELETE_SUBJECT(parsedSubjectId)
			);
			if (response.status === 200) {
				onDelete(subjectId);
			} else {
				console.error("Error deleting subject:", response.data);
			}
		} catch (error) {
			console.error(
				"Error deleting subject:",
				error.response ? error.response.data : error.message
			);
		}
	};

	return (
		<div className="overflow-x-auto">
			<table className="min-w-full divide-y-2 divide-gray-200 bg-white text-sm">
				<thead className="text-center">
					<tr>
						<th className="whitespace-nowrap px-4 py-2 font-medium text-gray-900">
							Course & Code
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
				<tbody className="divide-y divide-gray-200 text-center">
					{subjects.map((subject) => {
						if (!subject) return null; // Ensure subject is defined
						const teacher = subject.teacherId
							? teachers.find((t) => t.id === subject.teacherId)
							: null;
						return (
							<tr key={subject.id}>
								<td className="whitespace-nowrap px-4 py-2 font-medium text-gray-900">
									{editingSubjectId === subject.id ? (
										<>
											<InputField
												name="subjectName"
												value={subjectFormValues.subjectName || ""}
												onChange={onInputChange}
												type="text"
											/>
											<InputField
												name="subjectCode"
												value={subjectFormValues.subjectCode || ""}
												onChange={onInputChange}
												type="text"
											/>
										</>
									) : (
										`${subject.subjectName} (${subject.subjectCode})`
									)}
								</td>
								<td className="whitespace-nowrap px-4 py-2 text-gray-700">
									{editingSubjectId === subject.id ? (
										<InputField
											type="number"
											name="totalLectures"
											value={subjectFormValues.totalLectures || 0}
											onChange={onInputChange}
										/>
									) : (
										subject.totalLectures
									)}
								</td>
								<td className="whitespace-nowrap px-4 py-2 text-gray-700">
									{editingSubjectId === subject.id ? (
										<div className="mb-4">
											<select
												name="teacherId"
												value={subjectFormValues.teacherId || ""}
												onChange={onInputChange}
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
									) : teacher ? (
										`${teacher.name} (${teacher.id})`
									) : (
										"-"
									)}
								</td>
								<td className="whitespace-nowrap px-4 py-2">
									{editingSubjectId === subject.id ? (
										<button
											onClick={handleSave}
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
									<button
										onClick={() => handleDelete(subject.id)}
										className="inline-block rounded bg-red-600 px-4 py-2 text-xs font-medium text-white hover:bg-red-700 ml-2"
									>
										Delete
									</button>
								</td>
							</tr>
						);
					})}
				</tbody>
			</table>
		</div>
	);
};

export default React.memo(SubjectTable);
