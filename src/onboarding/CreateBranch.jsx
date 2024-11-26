import React, { useState } from "react";
import { useOnboarding } from "../context/OnboardingContext";
import Toast from "../components/toast/Toast";

const CreateBranch = ({ onNext, onPrevious }) => {
	const { onboardingData, updateOnboardingData } = useOnboarding();
	const [toast, setToast] = useState(null);

	const handleChange = (e) => {
		const { name, value } = e.target;
		updateOnboardingData({ [name]: value });
	};

	const validateForm = () => {
		if (!onboardingData.branchName?.trim()) {
			setToast({ message: "Branch name is required", type: "error" });
			return false;
		}
		if (!onboardingData.branchLocation?.trim()) {
			setToast({ message: "Branch location is required", type: "error" });
			return false;
		}
		return true;
	};

	const handleNext = () => {
		if (!validateForm()) return;
		onNext();
	};

	return (
		<form>
			<h2 className="text-2xl font-semibold mb-4">Create Branch</h2>

			<div className="mb-4">
				<label
					htmlFor="branchName"
					className="block text-sm font-medium text-gray-700"
				>
					Branch Name *
				</label>
				<input
					id="branchName"
					name="branchName"
					type="text"
					value={onboardingData.branchName}
					onChange={handleChange}
					className="mt-1 block w-full border border-gray-300 rounded-md p-2"
					required
				/>
			</div>

			<div className="mb-4">
				<label
					htmlFor="branchLocation"
					className="block text-sm font-medium text-gray-700"
				>
					Location *
				</label>
				<input
					id="branchLocation"
					name="branchLocation"
					type="text"
					value={onboardingData.branchLocation}
					onChange={handleChange}
					className="mt-1 block w-full border border-gray-300 rounded-md p-2"
					required
				/>
			</div>

			<div className="flex justify-between gap-2">
				<button
					type="button"
					onClick={onPrevious}
					className="py-2 px-4 bg-gray-600 text-white font-semibold rounded-md hover:bg-gray-700"
				>
					Previous
				</button>
				<button
					type="button"
					onClick={handleNext}
					className="py-2 px-4 bg-green-600 text-white font-semibold rounded-md hover:bg-green-700 w-full"
				>
					Next
				</button>
			</div>

			{toast && (
				<div className="fixed bottom-4 right-4 z-50">
					<Toast
						message={toast.message}
						type={toast.type}
						onClose={() => setToast(null)}
					/>
				</div>
			)}
		</form>
	);
};

export default CreateBranch;
