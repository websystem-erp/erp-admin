import React, { useState, useEffect } from "react";
import anju from "../../assets/user/anju.jpg";
import akriti from "../../assets/user/akriti.jpg";
import ankur from "../../assets/user/ankur.jpg";
import vikas from "../../assets/user/vikas.jpg";
import ListTable from "../List/ListTable";
import CommonTable from "../List/CommonTable";
import ListTableBtn from "../List/ListTableBtn";
import API_ENDPOINTS from "../../API/apiEndpoints";

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
		const fetchStudents = async () => {
			try {
				const response = await fetch(API_ENDPOINTS.FETCH_ALL_STUDENTS);
				if (!response.ok) {
					throw new Error("Network response was not ok");
				}
				const data = await response.json();
				if (Array.isArray(data.data)) {
					setStudents(data.data);
				} else {
					console.error("Unexpected data format:", data);
				}
			} catch (error) {
				console.error("Error: ", error);
			} finally {
				setIsLoading(false);
			}
		};

		fetchStudents();
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
								profile={imageMap[student.profileImage] || akriti}
								name={student.name}
								role={student.role}
								id={student.id}
								hideDropDown={"hidden"}
							/>
						))}
					/>
				</div>
			)}
		</>
	);
};

export default StudentList;
