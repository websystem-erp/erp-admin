import React, { useState, useEffect } from "react";
import anju from "../../../../assets/user/anju.jpg";
import akriti from "../../../../assets/user/akriti.jpg";
import ankur from "../../../../assets/user/ankur.jpg";
import vikas from "../../../../assets/user/vikas.jpg";
import Employee from "./Employee";
import EmployeeSetionButtons from "./EmployeeSetionButtons";

const EmployeesDetailsContainer = () => {
	const [teachers, setTeachers] = useState([]);

	useEffect(() => {
		const api = "https://erp-system-backend.onrender.com/api/v1/teacher/1/fetch/5";

		fetch(api)
			.then((response) => {
				if (!response.ok) {
					throw new Error("Network response was not ok");
				}
				return response.json();
			})
			.then((data) => {
				console.log("Fetched data:", data);
				if (Array.isArray(data)) {
					setTeachers(data);
				} else {
					console.error("Unexpected data format:", data);
				}
			})
			.catch((error) => console.log("Error: ", error));
	}, []);

	return (
		<>
			<div className="bg-white p-8 rounded-md w-fit sm:w-full">
				<div className="flex items-center justify-between pb-6">
					<div>
						<h2 className="text-gray-600 font-semibold">Employees Details</h2>
						<span className="text-xs">All products item</span>
					</div>
					<div className="flex items-center justify-between">
						<div className="flex flex-col gap-2">
							<EmployeeSetionButtons
								text={"Add Data"}
								buttonColor={"bg-linear-green"}
								borderRadius={"rounded"}
							/>
							<EmployeeSetionButtons
								text={"Delete"}
								buttonColor={"bg-linear-red"}
								borderRadius={"rounded"}
							/>
						</div>
					</div>
				</div>
				<div>
					<div className="-mx-4 sm:-mx-8 px-4 sm:px-8 py-4 overflow-x-auto">
						<div className="inline-block min-w-full shadow rounded-lg overflow-hidden">
							<table className="min-w-full leading-normal table-auto table-styling">
								<thead>
									<tr>
										<th className="px-2 py-3 border-b-2 border-gray-200 bg-gray-100 text-center text-sm md:text-base font-semibold text-gray-600 uppercase tracking-wider">
											Name
										</th>
										<th className="px-2 py-3 border-b-2 border-gray-200 bg-gray-100 text-center text-sm md:text-base font-semibold text-gray-600 uppercase tracking-wider">
											Role
										</th>
										<th className="px-2 py-3 border-b-2 border-gray-200 bg-gray-100 text-center text-sm md:text-base font-semibold text-gray-600 uppercase tracking-wider">
											ID
										</th>
										<th className="px-2 py-3 border-b-2 border-gray-200 bg-gray-100 text-center text-sm md:text-base font-semibold text-gray-600 uppercase tracking-wider">
											Action
										</th>
									</tr>
								</thead>
								<tbody>
									{teachers.map((teacher) => (
										<Employee
											key={teacher.id} // Add a key to each item
											profile={akriti}
											name={teacher.name}
											role={teacher.role}
											id={teacher.id}
										/>
									))}
								</tbody>
							</table>
							<div className="px-5 py-5 bg-white border-t flex flex-col xs:flex-row items-center xs:justify-between">
								<span className="text-xs xs:text-sm text-gray-900">
									Showing 1 to 4 of 50 Entries
								</span>
								<div className="inline-flex mt-2 xs:mt-0">
									<EmployeeSetionButtons
										text={"prev"}
										buttonColor={"bg-linear-blue"}
										borderRadius={"rounded-l"}
									/>
									<EmployeeSetionButtons
										text={"Next"}
										buttonColor={"bg-linear-blue"}
										borderRadius={"rounded-r"}
									/>
								</div>
							</div>
						</div>
					</div>
				</div>
			</div>
		</>
	);
};

export default EmployeesDetailsContainer;
