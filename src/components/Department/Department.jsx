import React, { useState, useEffect } from "react";
import ListTable from "../List/ListTable";
import CommonTable from "../List/CommonTable";
import ListTableBtn from "../List/ListTableBtn";

const Department = () => {
	const [programs, setPrograms] = useState([]);
	const [isLoading, setIsLoading] = useState(true);

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
			.catch((error) => console.error("Error: ", error))
			.finally(() => setIsLoading(false));
	}, []);

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
								<ListTableBtn
									text={"Add Department"}
									buttonColor={"bg-linear-green"}
									borderRadius={"rounded"}
								/>
							</div>
						</div>
					</div>
					<ListTable
						pageTitle={"Department"}
						ListName={"Department Name"}
						ListRole={"Code"}
						ListID={"Subjects"}
						ListAction={"Actions"}
						showDataList={programs.map((program) => (
							<CommonTable
								key={program.id}
								name={program.name}
								role={program.code}
								id={program.subjects.length}
							/>
						))}
					/>{" "}
				</div>
			)}
		</>
	);
};

export default Department;
