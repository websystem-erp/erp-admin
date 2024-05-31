import React, { useState } from "react";
import { Icon } from "@iconify/react";
const EditableField = ({ label, value, onSave, type = "text" }) => {
	const [isEditing, setIsEditing] = useState(false);
	const [currentValue, setCurrentValue] = useState(value);

	const handleSave = () => {
		setIsEditing(false);
		onSave(currentValue);
	};

	return (
		<div className="mb-2 flex justify-between items-center w-fit gap-2 ">
			<label className="block font-medium text-white">{label}: </label>
			{isEditing ? (
				<div className="flex items-center">
					<input
						type={type}
						value={currentValue}
						onChange={(e) => setCurrentValue(e.target.value)}
						className="border p-1 rounded text-black capitalize"
						placeholder={currentValue}
					/>
					<button onClick={handleSave} className="ml-2 text-green-500">
						<Icon icon="typcn:tick" />
					</button>
				</div>
			) : (
				<div className="flex items-center ">
					<span
						onClick={() => setIsEditing(true)}
						className="cursor-pointer w-full capitalize text-lg font-semibold"
					>
						{value}
					</span>
					<button
						onClick={() => setIsEditing(true)}
						className="ml-2 text-amber-500"
					>
						<Icon icon="flowbite:edit-solid" />
					</button>
				</div>
			)}
		</div>
	);
};

export default EditableField;
