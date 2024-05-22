import React from "react";

const DepartmentAddingForm = ({ onClose }) => {
	return (
		<div className="w-full h-full">
			<form>
				<div className="flex flex-col my-2">
					<label className="text-white">Event Name</label>
					<input
						className="my-2 rounded-lg p-4"
						type="text"
						placeholder="e.g., Annual function, football match"
					/>
				</div>
				<div className="flex flex-col my-2">
					<label className="text-white">Target Amount</label>
					<input
						className="my-2 rounded-lg p-4"
						type="number"
						placeholder="₹ 2,000"
					/>
				</div>
				<div className="flex flex-col my-2">
					<label className="text-white">Collection End Date</label>
					<input
						className="my-2 rounded-lg p-4"
						type="date"
						placeholder="mm/dd/yyyy"
					/>
				</div>
				<div className="flex flex-col my-2">
					<label className="text-white">Event Details</label>
					<textarea
						className="my-2 rounded-lg p-4"
						rows="4"
						cols="50"
						type="text"
						placeholder="Let everyone know why you're collecting money, and what you'll do with it. This is your chance to tell your story."
					/>
				</div>
				<div className="flex justify-end items-center">
					<button
						className="px-4 py-2 me-4 text-white border-red-500 border-2 rounded-lg"
						onClick={onClose}
					>
						Cancel
					</button>
					<button
						className="px-4 py-2 ms-4 text-white bg-linear-blue rounded-lg"
						type="submit"
					>
						Submit
					</button>
				</div>
			</form>
		</div>
	);
};

export default DepartmentAddingForm;
