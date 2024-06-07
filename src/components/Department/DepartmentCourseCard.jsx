import React, { useState } from "react";
import axios from "axios";
import { Icon } from "@iconify/react";
import API_ENDPOINTS from "../../API/apiEndpoints"; // Adjust the import path as needed
import SubjectTable from "./SubjectTable";

const DepartmentCourseCard = ({
	courseName,
	courseCode,
	price,
	duration,
	subjects = [],
	onClick,
	departmentId, // Add departmentId prop
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
		teacherId: null,
		departmentId: departmentId, // Assign departmentId here
		totalLectureTaken: 0,
	});
	const [isOpen, setIsOpen] = useState(false);
	const [isAdding, setIsAdding] = useState(false);

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
			data: {
				id: subjectId,
				subjectName: subjectFormValues.subjectName,
				subjectCode: subjectFormValues.subjectCode,
				totalLectures: subjectFormValues.totalLectures,
				teacherId: subjectFormValues.teacherId,
				departmentId: subjectFormValues.departmentId,
				totalLectureTaken: subjectFormValues.totalLectureTaken,
			},
		};

		console.log("Request payload:", requestData); // Log the request payload

		axios
			.put(API_ENDPOINTS.UPDATE_SUBJECT(subjectId), requestData)
			.then((response) => {
				if (response.status === 200) {
					console.log("Subject updated successfully:", response.data);
					setEditingSubjectId(null);
				} else {
					console.error("Unexpected response status:", response);
				}
			})
			.catch((error) => {
				console.error("Error updating subject:", error);
				console.error("Full error details:", JSON.stringify(error, null, 2));
			});
	};

	const handleAddSubject = () => {
		const requestData = {
			data: {
				subjectName: newSubjectFormValues.subjectName,
				subjectCode: newSubjectFormValues.subjectCode,
				totalLectures: newSubjectFormValues.totalLectures,
				teacherId: newSubjectFormValues.teacherId,
				departmentId: departmentId, // Ensure departmentId is included
				totalLectureTaken: newSubjectFormValues.totalLectureTaken,
			},
		};

		console.log("Request payload for new subject:", requestData); // Log the request payload

		axios
			.post(API_ENDPOINTS.CREATE_SUBJECT(departmentId), requestData)
			.then((response) => {
				if (response.status === 201) {
					console.log("Subject added successfully:", response.data);
					// Optionally, update the local state to reflect the new subject
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
							{/* Dropdown toggle button */}
							<button
								onClick={() => setIsOpen(!isOpen)}
								className="relative z-10 block p-2 text-white bg-white border border-transparent rounded-full dark:text-white focus:border-blue-500 focus:ring-opacity-40 dark:focus:ring-opacity-40 focus:ring-blue-300 focus:ring dark:bg-gray-800 focus:outline-none"
							>
								<Icon icon="zondicons:navigation-more" height={20} />
							</button>

							{/* Dropdown menu */}
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
					subjects={subjects}
					editingSubjectId={editingSubjectId}
					subjectFormValues={subjectFormValues}
					onEditClick={handleEditClick}
					onSave={handleSave}
					onInputChange={handleInputChange}
				/>
				{isAdding && (
					<div className="bg-gray-800 p-4 rounded-lg mt-4">
						<h5 className="text-white">Add New Subject</h5>
						<form
							onSubmit={(e) => {
								e.preventDefault();
								handleAddSubject();
							}}
						>
							<div className="mb-4">
								<label className="block text-sm font-medium text-gray-700">
									Subject Name
								</label>
								<input
									type="text"
									name="subjectName"
									value={newSubjectFormValues.subjectName}
									onChange={handleNewInputChange}
									className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
									placeholder="Subject Name"
								/>
							</div>
							<div className="mb-4">
								<label className="block text-sm font-medium text-gray-700">
									Subject Code
								</label>
								<input
									type="text"
									name="subjectCode"
									value={newSubjectFormValues.subjectCode}
									onChange={handleNewInputChange}
									className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
									placeholder="Subject Code"
								/>
							</div>
							<div className="mb-4">
								<label className="block text-sm font-medium text-gray-700">
									Total Lectures
								</label>
								<input
									type="number"
									name="totalLectures"
									value={newSubjectFormValues.totalLectures}
									onChange={handleNewInputChange}
									className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
									placeholder="Total Lectures"
								/>
							</div>
							<div className="flex justify-end items-center mt-4 gap-4">
								<button
									className="px-4 w-1/2 py-2 text-white border-red-500 border-2 rounded-lg hover:bg-red-500"
									type="button"
									onClick={() => setIsAdding(false)}
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
				)}
			</div>
		</div>
	);
};

export default DepartmentCourseCard;
