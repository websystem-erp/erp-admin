import React, { useState, useEffect } from "react";
import axios from "axios";
import { Icon } from "@iconify/react";
import DepartmentCourseCard from "./DepartmentCourseCard";
import API_ENDPOINTS from "../../API/apiEndpoints"; // Adjust the import path as needed

const Department = () => {
	const [isLoading, setIsLoading] = useState(true);
	const [programs, setPrograms] = useState([]);
	const [openForm, setOpenForm] = useState(false);
	const [formValues, setFormValues] = useState({
		name: "",
		code: "",
	});
	const [errorMessage, setErrorMessage] = useState("");

	useEffect(() => {
		axios
			.get(API_ENDPOINTS.FETCH_ALL_DEPARTMENTS)
			.then((response) => {
				if (response.status === 200 && Array.isArray(response.data.data)) {
					setPrograms(response.data.data);
				} else {
					console.error("Unexpected data format:", response.data);
				}
			})
			.catch((error) => {
				console.error("Error fetching departments:", error);
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
		setFormValues((prevValues) => ({ ...prevValues, [name]: value }));
	};

	const handleSubmit = (e) => {
		e.preventDefault();

		const duplicate = programs.find(
			(program) =>
				program.name.toLowerCase() === formValues.name.toLowerCase() ||
				program.code.toLowerCase() === formValues.code.toLowerCase()
		);

		if (duplicate) {
			setErrorMessage(
				"A department with this code or name already exists. Please use a different code or name."
			);
			return;
		}

		const requestData = { ...formValues };

		console.log("Submitting new department with data:", requestData);

		axios
			.post(API_ENDPOINTS.CREATE_DEPARTMENTS, requestData)
			.then((response) => {
				if (response.status === 201) {
					setPrograms((prevPrograms) => [...prevPrograms, response.data.data]);
					onClose();
				} else {
					console.error("Unexpected response status:", response);
				}
			})
			.catch((error) => {
				if (error.response) {
					if (error.response.status === 409) {
						setErrorMessage(
							"A department with this code or name already exists. Please use a different code or name."
						);
					} else if (error.response.status === 500) {
						setErrorMessage(
							"An internal server error occurred. Please try again later."
						);
					} else {
						setErrorMessage("An unexpected error occurred. Please try again.");
					}
				} else {
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
						<h2 className="text-gray-600 font-semibold">Department</h2>
					</div>
					<div className="">
						<div className="p-4 w-fit text-gray-400 hover:bg-gray-800 rounded-lg m-4">
							<div
								className="border-dashed border-2 w-fit p-4 rounded-lg flex justify-center items-center flex-col cursor-pointer"
								onClick={handleForm}
							>
								<Icon icon="mingcute:add-fill" height={36} />
								<h5 className="font-semibold w-full text-start">
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
									price={"₹ 1,00,000/-"}
									duration={"3 Months"}
									subjects={program.subjects}
									subjectName={"english"}
									subjectCode={"Eng001"}
									totalLecture={28}
								/>
							))}
						</div>
					</div>
				</div>
			)}

			{openForm && (
				<div className="absolute top-0 left-0 glassmorphism-dark h-screen w-full flex justify-center items-center">
					<div className="bg-gray-800 p-8 rounded-xl w-3/12">
						<form onSubmit={handleSubmit} className="text-black">
							<div className="mb-4">
								<label className="block text-sm font-medium text-gray-700">
									Course Name
								</label>
								<input
									type="text"
									name="name"
									value={formValues.name}
									onChange={handleInputChange}
									className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
									placeholder="Course Name"
								/>
							</div>
							<div className="mb-4">
								<label className="block text-sm font-medium text-gray-700">
									Course Code
								</label>
								<input
									type="text"
									name="code"
									value={formValues.code}
									onChange={handleInputChange}
									className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
									placeholder="Course Code"
								/>
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
									className="px-4 py-2 w-1/2 text-white bg-green-600 rounded-lg"
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
