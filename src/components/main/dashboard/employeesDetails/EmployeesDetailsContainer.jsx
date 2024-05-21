import React, { useState, useEffect } from "react";
import anju from "../../../../assets/user/anju.jpg";
import akriti from "../../../../assets/user/akriti.jpg";
import ankur from "../../../../assets/user/ankur.jpg";
import vikas from "../../../../assets/user/vikas.jpg";
import ListTable from "../../../List/ListTable";
import CommonTable from "../../../List/CommonTable";

const EmployeesDetailsContainer = () => {
	const [teachers, setTeachers] = useState([]);
	const [isLoading, setIsLoading] = useState(true);

	const imageMap = {
		anju: anju,
		akriti: akriti,
		ankur: ankur,
		vikas: vikas,
	};

	useEffect(() => {
		const api =
			"https://erp-system-backend.onrender.com/api/v1/teacher/1/fetchAll";

		fetch(api)
			.then((response) => {
				if (!response.ok) {
					throw new Error("Network response was not ok");
				}
				return response.json();
			})
			.then((data) => {
				if (Array.isArray(data.data)) {
					setTeachers(data.data);
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
				<ListTable
					pageTitle={"Employee Details"}
					ListName={"Name"}
					ListRole={"Role"}
					ListID={"ID"}
					ListAction={"Actions"}
					showDataList={teachers.map((teacher) => (
						<CommonTable
							key={teacher.id}
							profile={imageMap[teacher.profileImage] || akriti}
							name={teacher.name}
							role={teacher.role}
							id={teacher.id}
						/>
					))}
				/>
			)}
		</>
	);
};

export default EmployeesDetailsContainer;
