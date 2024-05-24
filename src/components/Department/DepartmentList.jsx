// DepartmentList.jsx
import React from "react";
import DepartmentItem from "./DepartmentItem";

const DepartmentList = ({ programs }) => {
	return (
		<div>
			<h2 className="text-gray-600 font-semibold">Department List</h2>
			{programs.map((program) => (
				<DepartmentItem key={program.id} program={program} />
			))}
		</div>
	);
};

export default DepartmentList;
