import React, { useState } from "react";
import axios from "axios";
import { Icon } from "@iconify/react";
import API_ENDPOINTS from "../../API/apiEndpoints"; // Adjust the import path as needed
import SubjectTable from "./SubjectTable";
import AddSubjectForm from "./AddSubjectForm";

const DepartmentCourseCard = ({
	courseName,
	courseCode,
	price,
	duration,
	subjects = [],
	onClick,
	departmentId,
}) => {
	const [editingSubjectId, setEditingSubjectId] = useState(null);
	const [subjectFormValues, setSubjectFormValues] = useState({
		subjectName: "",
		subjectCode: "",
		totalLectures: 0,
		teacherId: null,
		departmentId: departmentId,
		totalLectureTaken: 0,
	});
	const [newSubjectFormValues, setNewSubjectFormValues] = useState({
		subjectName: "",
		subjectCode: "",
		totalLectures: 0,
	});
	const [isOpen, setIsOpen] = useState(false);
	const [isAdding, setIsAdding] = useState(false);
	const [localSubjects, setLocalSubjects] = useState(subjects);

	const handleEditClick = (subject) => {
		setEditingSubjectId(subject.id);
		setSubjectFormValues({
			subjectName: subject.subjectName,
			subjectCode: subject.subjectCode,
			totalLectures: subject.totalLectures,
			teacherId: subject.teacherId,
			departmentId: subject.departmentId,
			totalLectureTaken: subject.totalLectureTaken,
		});
	};

	const handleInputChange = (e) => {
		const { name, value } = e.target;
		setSubjectFormValues((prevValues) => ({ ...prevValues, [name]: value }));
	};

	const handleNewInputChange = (e) => {
		const { name, value } = e.target;
		setNewSubjectFormValues((prevValues) => ({ ...prevValues, [name]: value }));
	};

	const handleSave = (subjectId) => {
		const requestData = {
			subjectName: subjectFormValues.subjectName,
			subjectCode: subjectFormValues.subjectCode,
			totalLectures: parseInt(subjectFormValues.totalLectures, 10),
			teacherId: subjectFormValues.teacherId,
			departmentId: subjectFormValues.departmentId,
			totalLectureTaken: subjectFormValues.totalLectureTaken,
		};

		console.log("Request payload for updating subject:", requestData);

		axios
			.put(API_ENDPOINTS.UPDATE_SUBJECT(subjectId), requestData)
			.then((response) => {
				console.log("Update response status:", response.status);
				console.log("Update response data:", response.data);

				if (response.status === 200) {
					console.log("Subject updated successfully:", response.data);
					setEditingSubjectId(null);
					setLocalSubjects((prevSubjects) =>
						prevSubjects.map((subject) =>
							subject.id === subjectId ? response.data.data : subject
						)
					);
				} else {
					console.error("Unexpected response status:", response);
				}
			})
			.catch((error) => {
				console.error("Error updating subject:", error);
				console.error("Full error details:", JSON.stringify(error, null, 2));
			});
	};

	const handleAddSubject = (e) => {
		e.preventDefault();
		const requestData = {
			subjectName: newSubjectFormValues.subjectName,
			subjectCode: newSubjectFormValues.subjectCode,
			totalLectures: parseInt(newSubjectFormValues.totalLectures, 10),
		};

		console.log("Request payload for new subject:", requestData);

		axios
			.post(API_ENDPOINTS.CREATE_SUBJECT(departmentId), requestData)
			.then((response) => {
				console.log("Create response status:", response.status);
				console.log("Create response data:", response.data);

				if (response.status === 201) {
					console.log("Subject added successfully:", response.data);

					// Append the new subject to the existing list
					setLocalSubjects((prevSubjects) => [
						...prevSubjects,
						response.data.data,
					]);

					// Fetch updated department data
					axios
						.get(API_ENDPOINTS.FETCH_DEPARTMENTS(departmentId))
						.then((res) => {
							console.log("Fetched department data:", res.data);
							if (res.status === 200) {
								setLocalSubjects(res.data.data.subjects);
							}
						})
						.catch((err) => {
							console.error("Error fetching department data:", err);
							console.error(
								"Full error details:",
								JSON.stringify(err, null, 2)
							);
						});

					setIsAdding(false);
				} else {
					console.error("Unexpected response status:", response);
				}
			})
			.catch((error) => {
				console.error("Error adding subject:", error);
				console.error("Full error details:", JSON.stringify(error, null, 2));
			});
	};

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
								<p className="text-xs w-fit">Price: </p>
								<p className="text-lg font-semibold w-fit">{price}</p>
							</div>
							<div>
								<p className="text-xs w-fit">Duration: </p>
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
									<button className="flex w-full items-center px-3 py-3 text-sm capitalize transition-colors duration-300 transform text-white hover:bg-gray-700 dark:hover:text-white">
										<Icon icon="flowbite:edit-solid" height={24} />
										<span className="mx-1">Edit Course</span>
									</button>
									<hr className="border-gray-200 dark:border-gray-700" />
									<button className="flex w-full items-center px-3 py-3 text-sm capitalize transition-colors duration-300 transform text-red-500 hover:bg-red-700 dark:hover:text-white">
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
					subjectFormValues={subjectFormValues}
					onEditClick={handleEditClick}
					onSave={handleSave}
					onInputChange={handleInputChange}
				/>
				{isAdding && (
					<AddSubjectForm
						formValues={newSubjectFormValues}
						handleChange={handleNewInputChange}
						handleSubmit={handleAddSubject}
						handleCancel={() => setIsAdding(false)}
					/>
				)}
			</div>
		</div>
	);
};

export default DepartmentCourseCard;
