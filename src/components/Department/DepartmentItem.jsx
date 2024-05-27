// DepartmentItem.jsx
import React from "react";

const DepartmentItem = ({ program }) => {
	return (
		<div className="bg-gray-200 p-4 my-2 rounded-md">
			<h3 className="text-lg font-semibold">{program.name}</h3>
			<p className="text-gray-500">{program.code}</p>
		</div>
	);
};

export default DepartmentItem;
