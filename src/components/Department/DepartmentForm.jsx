import React from "react";

const DepartmentForm = ({
	formValues,
	onClose,
	handleInputChange,
	handleSubmit,
	errorMessage,
}) => (
	<div className="absolute top-0 left-0 h-full w-full flex justify-center items-center glassmorphism-dark">
		<div className="bg-gray-800 p-8 rounded-xl w-3/12 fixed ">
			<form onSubmit={handleSubmit} className="text-black">
				<div className="mb-4">
					<label className="block text-sm font-medium text-white">
						Course Name
					</label>
					<input
						type="text"
						name="name"
						value={formValues.name}
						onChange={handleInputChange}
						className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none  sm:text-sm"
						placeholder="Course Name"
					/>
				</div>
				<div className="mb-4">
					<label className="block text-sm font-medium text-white">
						Course Code
					</label>
					<input
						type="text"
						name="code"
						value={formValues.code}
						onChange={handleInputChange}
						className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none  sm:text-sm"
						placeholder="Course Code"
					/>
				</div>
				{errorMessage && (
					<div className="mb-4 text-red-500">{errorMessage}</div>
				)}
				<div className="flex justify-end items-center mt-4 gap-4">
					<button
						className="px-4 w-1/2 py-2 text-white border-red-500 border-2 rounded-lg hover:bg-red-500"
						type="button"
						onClick={onClose}
					>
						Cancel
					</button>
					<button
						className="px-4 py-2 w-1/2 text-white bg-green-600 rounded-lg"
						type="submit"
					>
						Submit
					</button>
				</div>
			</form>
		</div>
	</div>
);

export default React.memo(DepartmentForm);
