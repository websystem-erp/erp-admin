import React, { useState, useEffect } from "react";
import anju from "../../assets/user/anju.jpg";
import akriti from "../../assets/user/akriti.jpg";
import ankur from "../../assets/user/ankur.jpg";
import vikas from "../../assets/user/vikas.jpg";
import ListTable from "../List/ListTable";
import CommonTable from "../List/CommonTable";
import ListTableBtn from "../List/ListTableBtn";

const StudentList = () => {
	const [students, setStudents] = useState([]);
	const [isLoading, setIsLoading] = useState(true);

	const imageMap = {
		anju: anju,
		akriti: akriti,
		ankur: ankur,
		vikas: vikas,
	};

	useEffect(() => {
		const api =
			"https://erp-system-backend.onrender.com/api/v1/student/1/fetchAll";

		fetch(api)
			.then((response) => {
				if (!response.ok) {
					throw new Error("Network response was not ok");
				}
				return response.json();
			})
			.then((data) => {
				if (Array.isArray(data.data)) {
					setStudents(data.data);
				} else {
					console.error("Unexpected data format:", data);
				}
			})
			.catch((error) => console.error("Error: ", error))
			.finally(() => setIsLoading(false));
	}, []);

	const handleFormModal = () => {
		console.log("working");
	};

	return (
		<>
			{isLoading ? (
				<p>Loading...</p>
			) : (
				<div className="bg-white p-8 rounded-md w-fit sm:w-full">
					<div className="flex items-center justify-between pb-6">
						<div>
							<h2 className="text-gray-600 font-semibold">Student Details</h2>
						</div>
						<div className="flex items-center justify-between">
							<div className="flex flex-col gap-2">
								<ListTableBtn
									onClick={handleFormModal}
									text={"Add Student"}
									buttonColor={"bg-linear-green"}
									borderRadius={"rounded"}
								/>
							</div>
						</div>
					</div>
					<ListTable
						pageTitle={"Student Details"}
						ListName={"Name"}
						ListRole={"Role"}
						ListID={"ID"}
						ListAction={"Actions"}
						showDataList={students.map((student) => (
							<CommonTable
								key={student.id}
								profile={imageMap[student.profileImage] || akriti} // Default to 'akriti' if no matching image
								name={student.name}
								role={student.role}
								id={student.id}
							/>
						))}
					/>
				</div>
			)}
		</>
	);
};

export default StudentList;
