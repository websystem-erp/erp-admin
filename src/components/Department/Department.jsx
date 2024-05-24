import React, { useState, useEffect } from "react";
import ListTableBtn from "../List/ListTableBtn";
import DepartmentCourseList from "./DepartmentCourseList";
import FormItems from "../Forms/FormItems";

const Department = () => {
	const [isLoading, setIsLoading] = useState(true);
	const [programs, setPrograms] = useState([]);
	const [openForm, setOpenForm] = useState(false);

	useEffect(() => {
		const api =
			"https://erp-system-backend.onrender.com/api/v1/department/fetchAll";

		fetch(api)
			.then((response) => {
				if (!response.ok) {
					throw new Error("Network response was not ok");
				}
				return response.json();
			})
			.then((data) => {
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
	};

	const handleForm = () => {
		setOpenForm(true);
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
						<div className="flex items-center justify-between">
							<div className="flex flex-col gap-2">
								<button
									className="text-sm text-white transition duration-150 hover:bg-indigo-500 font-semibold py-2 px-4 h-fit bg-linear-green rounded"
									onClick={handleForm}
								>
									Add Department
								</button>
							</div>
						</div>
					</div>
					<DepartmentCourseList programs={programs} />
				</div>
			)}

			{openForm && (
				<div className="absolute top-0 left-0 glassmorphism-dark h-screen w-full flex justify-center items-center">
					<div className="bg-linear-black p-8 rounded-xl">
						<form>
							<FormItems
								formLabel={"Course Name"}
								formType={"text"}
								formPlaceholder={"Enter Course Name"}
							/>
							<FormItems
								formLabel={"Course Code"}
								formType={"text"}
								formPlaceholder={"Enter Course Code"}
							/>
							<FormItems
								formLabel={"Course Duration"}
								formType={"text"}
								formPlaceholder={"Enter Course Duration"}
							/>

							<div className="flex justify-end items-center mt-4">
								<button
									className="px-4 py-2 me-4 text-white border-red-500 border-2 rounded-lg"
									type="button"
									onClick={onClose}
								>
									Cancel
								</button>
								<button
									className="px-4 py-2 ms-4 text-white bg-linear-blue rounded-lg"
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
