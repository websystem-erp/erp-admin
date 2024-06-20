import React, { useState, useCallback, useEffect } from "react";
import axios from "axios";
import { Icon } from "@iconify/react";
import API_ENDPOINTS from "../../API/apiEndpoints";
import SubjectTable from "./SubjectTable";
import AddSubjectForm from "./AddSubjectForm";

const DepartmentCourseCard = ({
	courseName,
	courseCode,
	price,
	duration,
	subjects = [], // Default to an empty array
	onClick,
	departmentId,
	onDeleteSuccess,
}) => {
	const [newSubjectFormValues, setNewSubjectFormValues] = useState({
		subjectName: "",
		subjectCode: "",
		totalLectures: 0,
		teacherId: "",
	});
	const [editingSubjectFormValues, setEditingSubjectFormValues] = useState({
		subjectName: "",
		subjectCode: "",
		totalLectures: 0,
		teacherId: "",
	});
	const [isOpen, setIsOpen] = useState(false);
	const [isAdding, setIsAdding] = useState(false);
	const [localSubjects, setLocalSubjects] = useState(subjects);
	const [editingSubjectId, setEditingSubjectId] = useState(null);
	const [teachers, setTeachers] = useState([]);
	const [subjectChangeTrigger, setSubjectChangeTrigger] = useState(false); // Trigger for re-fetching subjects

	const fetchSubjects = useCallback(() => {
		// Fetch all subjects with teachers included
		axios
			.get(API_ENDPOINTS.FETCH_ALL_SUBJECTS_IN_DEPARTMENT(departmentId))
			.then((response) => {
				setLocalSubjects(response.data.data || []);
			})
			.catch((error) => {
				console.error("Error fetching subjects:", error);
			});
	}, [departmentId]);

	useEffect(() => {
		// Fetch all teachers
		axios
			.get(API_ENDPOINTS.FETCH_ALL_TEACHERS)
			.then((response) => {
				setTeachers(response.data.data);
			})
			.catch((error) => {
				console.error("Error fetching teachers:", error);
			});
	}, []);

	useEffect(() => {
		fetchSubjects();
	}, [fetchSubjects, subjectChangeTrigger]);

	const handleNewInputChange = useCallback((e) => {
		const { name, value } = e.target;
		setNewSubjectFormValues((prevValues) => ({ ...prevValues, [name]: value }));
	}, []);

	const handleEditInputChange = useCallback((e) => {
		const { name, value } = e.target;
		setEditingSubjectFormValues((prevValues) => ({
			...prevValues,
			[name]: value,
		}));
	}, []);

	const handleAddSubject = useCallback(
		(e) => {
			e.preventDefault();
			const requestData = {
				subjectName: newSubjectFormValues.subjectName,
				subjectCode: newSubjectFormValues.subjectCode,
				totalLectures: parseInt(newSubjectFormValues.totalLectures, 10),
				teacherId: newSubjectFormValues.teacherId
					? parseInt(newSubjectFormValues.teacherId, 10)
					: null,
			};

			axios
				.post(API_ENDPOINTS.CREATE_SUBJECT(departmentId), requestData)
				.then((response) => {
					if (response.status === 201) {
						setSubjectChangeTrigger((prev) => !prev); // Trigger re-fetching subjects
						setIsAdding(false);
					}
				})
				.catch((error) => {
					console.error(
						"Error adding subject:",
						error.response ? error.response.data : error.message
					);
				});
		},
		[newSubjectFormValues, departmentId]
	);

	const handleEditSubject = useCallback((subject) => {
		console.log("Editing subject:", subject); // Log the subject object
		setEditingSubjectId(subject.id); // Set the editing subject ID correctly
		setEditingSubjectFormValues({
			subjectName: subject.subjectName,
			subjectCode: subject.subjectCode,
			totalLectures: subject.totalLectures,
			teacherId: subject.teacherId ? subject.teacherId.toString() : "",
		});
	}, []);

	const handleSaveEdit = useCallback(async () => {
		console.log("Editing subject ID:", editingSubjectId); // Log subject ID
		const parsedSubjectId = parseInt(editingSubjectId, 10); // Ensure subjectId is a number
		if (isNaN(parsedSubjectId)) {
			console.error("Invalid subject ID:", editingSubjectId);
			return;
		}

		try {
			const updatedSubject = {
				...editingSubjectFormValues,
				totalLectures: parseInt(editingSubjectFormValues.totalLectures, 10),
				teacherId: editingSubjectFormValues.teacherId
					? parseInt(editingSubjectFormValues.teacherId, 10)
					: null,
			};
			console.log("Updating subject:", updatedSubject); // Log updated subject data
			const response = await axios.put(
				API_ENDPOINTS.UPDATE_SUBJECT(parsedSubjectId),
				updatedSubject
			);
			if (response.status === 200) {
				setSubjectChangeTrigger((prev) => !prev); // Trigger re-fetching subjects
				setEditingSubjectId(null);
			} else {
				console.error("Error saving subject:", response.data);
			}
		} catch (error) {
			console.error(
				"Error saving subject:",
				error.response ? error.response.data : error.message
			);
		}
	}, [editingSubjectId, editingSubjectFormValues]);

	const handleDeleteSubject = useCallback(async (subjectId) => {
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
				setSubjectChangeTrigger((prev) => !prev); // Trigger re-fetching subjects
			} else {
				console.error("Error deleting subject:", response.data);
			}
		} catch (error) {
			console.error(
				"Error deleting subject:",
				error.response ? error.response.data : error.message
			);
		}
	}, []);

	const handleDeleteCourse = useCallback(() => {
		axios
			.delete(API_ENDPOINTS.DELETE_DEPARTMENT(departmentId))
			.then((response) => {
				if (response.status === 200) {
					if (onDeleteSuccess) {
						onDeleteSuccess(departmentId);
					}
				} else {
					console.error("Error deleting department:", response.data);
				}
			})
			.catch((error) => {
				console.error(
					"Error deleting department:",
					error.response ? error.response.data : error.message
				);
			});
	}, [departmentId, onDeleteSuccess]);

	return (
		<div className="w-full md:w-1/2 p-4" onClick={onClick}>
			<div className="bg-linear-blue p-4 rounded-t-2xl">
				<div className="flex justify-between">
					<div>
						<div className="mb-4">
							<h6 className="text-white text-xs tracking-widest">COURSE</h6>
							<h2 className="text-white font-bold text-2xl">{courseName}</h2>
							<h6 className="text-xs">{courseCode}</h6>
						</div>
						<div className="flex gap-4">
							<div>
								<p className="text-xs w-fit">Price:</p>
								<p className="text-lg font-semibold w-fit">{price}</p>
							</div>
							<div>
								<p className="text-xs w-fit">Duration:</p>
								<p className="text-lg font-semibold w-fit">{duration}</p>
							</div>
						</div>
					</div>
					<div className="flex flex-col gap-2">
						<div className="relative inline-block">
							<button
								onClick={() => setIsOpen(!isOpen)}
								className="relative z-10 block p-2 text-white bg-white border border-transparent rounded-full dark:text-white focus:border-blue-500 focus:ring-opacity-40 dark:focus:ring-opacity-40 focus:ring-blue-300 focus:ring dark:bg-gray-800 focus:outline-none"
							>
								<Icon icon="zondicons:navigation-more" height={20} />
							</button>

							{isOpen && (
								<div
									className="absolute right-0 z-20 w-48 py-2 mt-2 origin-top-right bg-white rounded-md shadow-xl dark:bg-gray-800"
									onClick={() => setIsOpen(false)}
								>
									<button
										onClick={() => setIsAdding(true)}
										className="flex w-full items-center px-3 py-3 text-sm capitalize transition-colors duration-300 transform text-white hover:bg-gray-700 dark:hover:text-white"
									>
										<Icon icon="mingcute:add-fill" height={24} />
										<span className="mx-1">Add Subject</span>
									</button>
									<hr className="border-gray-200 dark:border-gray-700" />
									<button
										className="flex w-full items-center px-3 py-3 text-sm capitalize transition-colors duration-300 transform text-red-500 hover:bg-red-700 dark:hover:text-white"
										onClick={handleDeleteCourse}
									>
										<Icon icon="mdi:delete" height={24} />
										<span className="mx-1">Delete Course</span>
									</button>
								</div>
							)}
						</div>
					</div>
				</div>
			</div>
			<div className="p-4 w-full bg-linear-black rounded-b-lg relative">
				<h4 className="text-center text-lg font-bold text-white p-2">
					Subjects
				</h4>
				<SubjectTable
					subjects={localSubjects}
					editingSubjectId={editingSubjectId}
					subjectFormValues={editingSubjectFormValues}
					onEditClick={handleEditSubject}
					onSave={handleSaveEdit}
					onInputChange={handleEditInputChange}
					onDelete={handleDeleteSubject}
					teachers={teachers}
				/>
				{isAdding && (
					<AddSubjectForm
						formValues={newSubjectFormValues}
						handleChange={handleNewInputChange}
						handleSubmit={handleAddSubject}
						handleCancel={() => setIsAdding(false)}
						teachers={teachers}
					/>
				)}
			</div>
		</div>
	);
};

export default React.memo(DepartmentCourseCard);
