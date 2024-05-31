import React from "react";

const FormItems = ({
	formLabel,
	formType,
	formName,
	formValue,
	formPlaceholder,
	handleInputChange,
}) => {
	return (
		<div className="mb-4">
			<label className="block text-sm font-medium text-gray-700">
				{formLabel}
			</label>
			<input
				type={formType}
				name={formName}
				value={formValue}
				onChange={handleInputChange}
				className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
				placeholder={formPlaceholder}
			/>
		</div>
	);
};

export default FormItems;
