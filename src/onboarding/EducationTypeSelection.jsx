import React from "react";
import { useOnboarding } from "../context/OnboardingContext";

const EducationTypeSelection = ({ onNext }) => {
	const { onboardingData, updateOnboardingData } = useOnboarding();

	const handleNext = () => {
		if (
			onboardingData.educationType === "SCHOOL" &&
			!onboardingData.boardType
		) {
			alert("Please select a board type for school.");
			return;
		}
		onNext();
	};

	return (
		<div className="p-6">
			<h2 className="text-2xl font-semibold mb-6 text-center">
				Education Type
			</h2>
			<div className="space-y-6">
				<div>
					<p className="mb-2 font-medium">Select your institution type:</p>
					<div className="flex space-x-4">
						{["SCHOOL", "COLLEGE"].map((type) => (
							<label key={type} className="flex items-center">
								<input
									type="radio"
									value={type}
									checked={onboardingData.educationType === type}
									onChange={(e) =>
										updateOnboardingData({ educationType: e.target.value })
									}
									className="mr-2"
								/>
								{type.charAt(0) + type.slice(1).toLowerCase()}
							</label>
						))}
					</div>
				</div>

				{onboardingData.educationType === "SCHOOL" && (
					<div>
						<p className="mb-2 font-medium">Select board type:</p>
						<div className="flex space-x-4">
							{["CBSE", "STATE", "ICSE"].map((board) => (
								<label key={board} className="flex items-center">
									<input
										type="radio"
										value={board}
										checked={onboardingData.boardType === board}
										onChange={(e) =>
											updateOnboardingData({ boardType: e.target.value })
										}
										className="mr-2"
									/>
									{board}
								</label>
							))}
						</div>
					</div>
				)}

				<button
					onClick={handleNext}
					disabled={!onboardingData.educationType}
					className={`w-full py-2 px-4 rounded-md text-white font-semibold ${
						onboardingData.educationType
							? "bg-green-600 hover:bg-green-700"
							: "bg-gray-400"
					}`}
				>
					Next
				</button>
			</div>
		</div>
	);
};

export default EducationTypeSelection;
