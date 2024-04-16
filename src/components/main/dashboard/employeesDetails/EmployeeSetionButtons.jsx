import React from "react";

const EmployeeSetionButtons = ({ text, buttonColor, borderRadius }) => {
	return (
		<button
			className={`text-sm text-white transition duration-150 hover:bg-indigo-500 font-semibold py-2 px-4 ${buttonColor} ${borderRadius}`}
		>
			{text}
		</button>
	);
};

export default EmployeeSetionButtons;
