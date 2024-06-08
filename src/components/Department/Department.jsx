import React, { useState, useEffect, useCallback } from "react";
import axios from "axios";
import { Icon } from "@iconify/react";
import DepartmentCourseCard from "./DepartmentCourseCard";
import API_ENDPOINTS from "../../API/apiEndpoints"; // Adjust the import path as needed
import DepartmentForm from "./DepartmentForm";

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
		const fetchData = async () => {
			try {
				const response = await axios.get(API_ENDPOINTS.FETCH_ALL_DEPARTMENTS);
				if (response.status === 200 && Array.isArray(response.data.data)) {
					const fetchedDepartments = response.data.data;
					const fetchSubjectsPromises = fetchedDepartments.map((department) =>
						axios.get(
							API_ENDPOINTS.FETCH_ALL_SUBJECTS_IN_DEPARTMENT(department.id)
						)
					);

					const subjectsResponses = await Promise.all(fetchSubjectsPromises);
					const updatedDepartments = fetchedDepartments.map(
						(department, index) => ({
							...department,
							subjects: subjectsResponses[index].data.data,
						})
					);

					setPrograms(updatedDepartments);
				} else {
					console.error("Unexpected data format:", response.data);
				}
			} catch (error) {
				console.error("Error fetching departments:", error);
			} finally {
				setIsLoading(false);
			}
		};

		fetchData();
	}, []);

	const onClose = useCallback(() => {
		setOpenForm(false);
		setErrorMessage("");
	}, []);

	const handleForm = useCallback(() => {
		setOpenForm(true);
	}, []);

	const handleInputChange = useCallback((e) => {
		const { name, value } = e.target;
		setFormValues((prevValues) => ({ ...prevValues, [name]: value }));
	}, []);

	const handleSubmit = useCallback(
		async (e) => {
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

			try {
				const response = await axios.post(
					API_ENDPOINTS.CREATE_DEPARTMENTS,
					requestData
				);
				if (response.status === 201) {
					setPrograms((prevPrograms) => [...prevPrograms, response.data.data]);
					onClose();
				} else {
					console.error("Unexpected response status:", response);
				}
			} catch (error) {
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
			}
		},
		[formValues, programs, onClose]
	);

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
									departmentId={program.id} // Pass departmentId
									onClick={() =>
										console.log(`Clicked on department ${program.id}`)
									}
								/>
							))}
						</div>
					</div>
				</div>
			)}

			{openForm && (
				<DepartmentForm
					formValues={formValues}
					onClose={onClose}
					handleInputChange={handleInputChange}
					handleSubmit={handleSubmit}
					errorMessage={errorMessage}
				/>
			)}
		</>
	);
};

export default Department;
