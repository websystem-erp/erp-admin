import React from "react";
import InputField from "./InputField";
import API_ENDPOINTS from "../../API/apiEndpoints";

const fetchTeacherDetails = async (teacherId) => {
	try {
		const response = await fetch(API_ENDPOINTS.FETCH_TEACHERS(teacherId));
		if (!response.ok) {
			const errorText = await response.text();
			throw new Error(`Error fetching teacher details: ${errorText}`);
		}
		return await response.json();
	} catch (error) {
		console.error("Fetch error:", error);
		throw error;
	}
};

const saveSubject = async (subjectId, updatedSubject) => {
	try {
		const response = await fetch(API_ENDPOINTS.UPDATE_SUBJECT(subjectId), {
			method: "PUT",
			headers: {
				"Content-Type": "application/json",
			},
			body: JSON.stringify(updatedSubject),
		});
		if (!response.ok) {
			const errorText = await response.text();
			throw new Error(`Error saving subject: ${errorText}`);
		}
		return await response.json();
	} catch (error) {
		console.error("Save error:", error);
		throw error;
	}
};

const SubjectTable = ({
	subjects = [],
	editingSubjectId,
	subjectFormValues,
	onEditClick,
	onSave,
	onInputChange,
	teachers = [],
}) => {
	const handleSave = async (subjectId) => {
		try {
			const teacherId = subjectFormValues.teacherId;
			let teacherData = {};
			if (teacherId) {
				const teacherResponse = await fetchTeacherDetails(teacherId);
				teacherData = teacherResponse.data;
				console.log("Fetched teacher data:", teacherData);
			}
			const updatedSubject = {
				...subjectFormValues,
				teacherName: teacherData.name || "",
				teacherId: teacherData.id || null,
				totalLectures: parseInt(subjectFormValues.totalLectures, 10), // Ensure totalLectures is a number
			};
			const savedSubjectResponse = await saveSubject(subjectId, updatedSubject);
			console.log("Saved subject data:", savedSubjectResponse);
			onSave({
				...savedSubjectResponse.data,
				teacherName: teacherData.name || "",
				teacherId: teacherData.id || null,
			});
		} catch (error) {
			console.error("Error in handleSave:", error);
			// Optionally display a user-friendly error message
		}
	};

	return (
		<div className="overflow-x-auto">
			<table className="min-w-full divide-y-2 divide-gray-200 bg-white text-sm">
				<thead className="text-center">
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
										<InputField
											name="subjectName"
											value={subjectFormValues.subjectName || ""}
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
											value={subjectFormValues.subjectCode || ""}
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
										"No teacher assigned yet"
									)}
								</td>
								<td className="whitespace-nowrap px-4 py-2">
									{editingSubjectId === subject.id ? (
										<button
											onClick={() => handleSave(subject.id)}
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
						);
					})}
				</tbody>
			</table>
		</div>
	);
};

export default React.memo(SubjectTable);
