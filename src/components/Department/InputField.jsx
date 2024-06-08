import React from "react";

const InputField = React.memo(
	({ label, name, value, onChange, type, placeholder }) => (
		<div className="mb-4">
			<label className="block text-sm font-medium text-gray-700">{label}</label>
			<input
				type={type}
				name={name}
				value={value}
				onChange={onChange}
				className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none text-black sm:text-sm"
				placeholder={placeholder}
			/>
		</div>
	)
);

export default InputField;
