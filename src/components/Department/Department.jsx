import React, { useState, useEffect } from "react";
import axios from "axios";
import API_ENDPOINTS from "../../API/apiEndpoints";
import DepartmentCourseCard from "./DepartmentCourseCard";
import { Icon } from "@iconify/react";
import FormItems from "../Forms/FormItems";

const Department = () => {
	const [isLoading, setIsLoading] = useState(true);
	const [programs, setPrograms] = useState([]);
	const [openForm, setOpenForm] = useState(false);
	const [formValues, setFormValues] = useState({
		name: "",
		code: "",
		campusId: "",
		subjects: [""],
	});
	const [errorMessage, setErrorMessage] = useState("");

	useEffect(() => {
		axios
			.get(API_ENDPOINTS.FETCH_ALL_DEPARTMENTS)
			.then((response) => {
				if (response.status !== 200) {
					throw new Error("Network response was not ok");
				}
				const data = response.data;
				if (Array.isArray(data.data)) {
					setPrograms(data.data);
				} else {
					console.error("Unexpected data format:", data);
				}
			})
			.catch((error) => {
				console.error("Error:", error);
			})
			.finally(() => {
				setIsLoading(false);
			});
	}, []);

	const onClose = () => {
		setOpenForm(false);
		setErrorMessage("");
	};

	const handleForm = () => {
		setOpenForm(true);
	};

	const handleInputChange = (e) => {
		const { name, value } = e.target;
		setFormValues((prevValues) => ({
			...prevValues,
			[name]: value,
		}));
	};

	const handleSubjectChange = (index, value) => {
		const newSubjects = [...formValues.subjects];
		newSubjects[index] = value;
		setFormValues((prevValues) => ({
			...prevValues,
			subjects: newSubjects,
		}));
	};

	const addSubjectField = () => {
		setFormValues((prevValues) => ({
			...prevValues,
			subjects: [...prevValues.subjects, ""],
		}));
	};

	const handleSubmit = (e) => {
		e.preventDefault();
		const formattedSubjects = formValues.subjects.map((subject) =>
			subject.trim()
		);
		const requestData = {
			...formValues,
			subjects: formattedSubjects,
		};

		axios
			.post(API_ENDPOINTS.CREATE_DEPARTMENTS, requestData)
			.then((response) => {
				if (response.status === 201) {
					console.log("Department created successfully:", response.data);
					setPrograms((prevPrograms) => [...prevPrograms, response.data.data]);
					onClose();
				} else {
					console.error("Unexpected response status:", response);
				}
			})
			.catch((error) => {
				if (error.response) {
					if (error.response.status === 409) {
						console.error(
							"Conflict error: Department already exists:",
							error.response.data
						);
						setErrorMessage(
							"A department with this code or name already exists. Please use a different code or name."
						);
					} else if (error.response.status === 500) {
						console.error("Server error:", error.response.data);
						setErrorMessage(
							"An internal server error occurred. Please try again later."
						);
					} else {
						console.error("Unexpected error:", error.response.data);
						setErrorMessage("An unexpected error occurred. Please try again.");
					}
				} else {
					console.error("Error creating department:", error);
					setErrorMessage(
						"An error occurred while creating the department. Please check your network connection and try again."
					);
				}
			});
	};

	return (
		<>
			{isLoading ? (
				<p>Loading...</p>
			) : (
				<div className="bg-white p-8 rounded-md w-fit sm:w-full">
					<div className="flex items-center justify-between pb-6">
						<div>
							<h2 className="text-gray-600 font-semibold">Department</h2>
						</div>
					</div>
					<div className="">
						<div className="p-4 w-fit text-gray-400 hover:bg-linear-black rounded-lg m-4">
							<div
								className="border-dashed border-2 w-fit p-4 rounded-lg flex justify-center items-center flex-col cursor-pointer"
								onClick={handleForm}
							>
								<Icon icon="mingcute:add-fill" height={36} />
								<h5 className="font-semibold w-full text-start ">
									Add New Course
								</h5>
							</div>
						</div>
						<div className="flex flex-wrap">
							{programs.map((program, index) => (
								<DepartmentCourseCard
									key={index}
									courseName={program.name}
									courseCode={program.code}
									price={"₹14,000/-"}
									duration={"3 Months"}
									subjects={program.subjects}
								/>
							))}
						</div>
					</div>
				</div>
			)}

			{openForm && (
				<div className="absolute top-0 left-0 glassmorphism-dark h-screen w-full flex justify-center items-center">
					<div className="bg-linear-black p-8 rounded-xl w-3/12">
						<form onSubmit={handleSubmit} className="text-black">
							<FormItems
								formLabel={"Department Name"}
								formType={"text"}
								formName={"name"}
								formValue={formValues.name}
								formPlaceholder={"Enter Department Name"}
								handleInputChange={handleInputChange}
							/>
							<FormItems
								formLabel={"Department Code"}
								formType={"text"}
								formName={"code"}
								formValue={formValues.code}
								formPlaceholder={"Enter Department Code"}
								handleInputChange={handleInputChange}
							/>
							<FormItems
								formLabel={"Campus ID"}
								formType={"text"}
								formName={"campusId"}
								formValue={formValues.campusId}
								formPlaceholder={"Enter Campus ID"}
								handleInputChange={handleInputChange}
							/>
							<div className="mb-4">
								<label className="block text-sm font-medium text-gray-700">
									Subjects
								</label>
								{formValues.subjects.map((subject, index) => (
									<div key={index} className="flex items-center mb-2">
										<input
											type="text"
											value={subject}
											onChange={(e) =>
												handleSubjectChange(index, e.target.value)
											}
											className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
											placeholder={`Subject ${index + 1}`}
										/>
									</div>
								))}
								<button
									type="button"
									className="mt-2 px-4 py-2 bg-blue-500 bg-linear-blue rounded-md"
									onClick={addSubjectField}
								>
									Add Subject
								</button>
							</div>
							{errorMessage && (
								<div className="mb-4 text-red-500">{errorMessage}</div>
							)}
							<div className="flex justify-end items-center mt-4 gap-4">
								<button
									className="px-4 w-1/2 py-2 text-white border-red-500 border-2 rounded-lg hover:bg-red-500"
									type="button"
									onClick={onClose}
								>
									Cancel
								</button>
								<button
									className="px-4 py-2 w-1/2 text-white bg-linear-green rounded-lg"
									type="submit"
								>
									Submit
								</button>
							</div>
						</form>
					</div>
				</div>
			)}
		</>
	);
};

export default Department;
