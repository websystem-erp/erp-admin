import React, { useState } from "react";
import { useOnboarding } from "../context/OnboardingContext";
import Toast from "../components/toast/Toast";
import compressImage from "../utils/imageCompression";

const CreateCampus = ({ onNext }) => {
	const { onboardingData, updateOnboardingData } = useOnboarding();
	const [toast, setToast] = useState(null);
	const [isProcessing, setIsProcessing] = useState(false);

	const handleChange = (e) => {
		const { name, value } = e.target;
		updateOnboardingData({ [name]: value });
	};

	const handleFileChange = async (e) => {
		const file = e.target.files[0];
		if (file) {
			try {
				setIsProcessing(true);

				if (!file.type.startsWith("image/")) {
					setToast({
						message: "Please upload only image files for the logo",
						type: "error",
					});
					return;
				}

				const fileSizeKB = file.size / 1024;
				let processedFile = file;

				if (fileSizeKB > 100) {
					setToast({
						message: "Compressing image...",
						type: "info",
					});
					processedFile = await compressImage(file);
				}

				const newFile = new File([processedFile], "campus-logo.jpg", {
					type: "image/jpeg",
				});

				const finalSizeKB = newFile.size / 1024;
				if (finalSizeKB > 100) {
					setToast({
						message: "Logo is too large. Please try with a smaller image.",
						type: "error",
					});
					return;
				}

				const reader = new FileReader();
				reader.onloadend = () => {
					updateOnboardingData({
						campusLogo: newFile,
						campusLogoPreview: reader.result,
					});
				};
				reader.readAsDataURL(newFile);

				setToast({
					message: "Logo processed successfully",
					type: "success",
				});
			} catch (error) {
				console.error("Error processing image:", error);
				setToast({
					message: "Error processing logo. Please try again.",
					type: "error",
				});
			} finally {
				setIsProcessing(false);
			}
		}
	};

	const validateForm = () => {
		if (!onboardingData.campusName?.trim()) {
			setToast({ message: "Campus name is required", type: "error" });
			return false;
		}
		if (!onboardingData.campusLocation?.trim()) {
			setToast({ message: "Location is required", type: "error" });
			return false;
		}
		if (!onboardingData.campusFoundedYear) {
			setToast({ message: "Founded year is required", type: "error" });
			return false;
		}
		if (!onboardingData.campusLogo) {
			setToast({ message: "Please upload a campus logo", type: "error" });
			return false;
		}
		return true;
	};

	const handleNext = () => {
		if (!validateForm()) return;
		onNext();
	};

	return (
		<div className="max-w-2xl mx-auto p-6">
			<h2 className="text-2xl font-semibold mb-6">Create Campus</h2>

			<div className="flex justify-between items-start gap-8">
				<div className="w-1/3">
					<div className="mb-4 flex flex-col items-center">
						<div
							className="relative w-36 h-36 p-1 rounded-full border border-gray-300 flex items-center justify-center cursor-pointer overflow-hidden"
							onClick={() => document.getElementById("logoUpload").click()}
						>
							{onboardingData.campusLogoPreview ? (
								<img
									src={onboardingData.campusLogoPreview}
									alt="Logo Preview"
									className="w-fit h-fit object-contain p-4"
								/>
							) : (
								<span className="text-gray-500">
									Upload Logo * (Max: 100KB)
								</span>
							)}
							{isProcessing && (
								<div className="absolute inset-0 bg-white bg-opacity-75 flex items-center justify-center">
									<svg
										className="animate-spin h-8 w-8 text-green-500"
										xmlns="http://www.w3.org/2000/svg"
										fill="none"
										viewBox="0 0 24 24"
									>
										<circle
											className="opacity-25"
											cx="12"
											cy="12"
											r="10"
											stroke="currentColor"
											strokeWidth="4"
										></circle>
										<path
											className="opacity-75"
											fill="currentColor"
											d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
										></path>
									</svg>
								</div>
							)}
						</div>
						<input
							id="logoUpload"
							type="file"
							accept="image/*"
							className="hidden"
							onChange={handleFileChange}
							disabled={isProcessing}
							required
						/>
						<p className="text-xs text-gray-500 mt-2 text-center">
							Click to upload campus logo
						</p>
					</div>
				</div>

				<div className="flex-1 space-y-4">
					<div>
						<label
							htmlFor="campusName"
							className="block text-sm font-medium text-gray-700"
						>
							Campus Name *
						</label>
						<input
							id="campusName"
							name="campusName"
							type="text"
							value={onboardingData.campusName || ""}
							onChange={handleChange}
							className="mt-1 block w-full border border-gray-300 rounded-md p-2"
							required
						/>
					</div>

					<div>
						<label
							htmlFor="campusLocation"
							className="block text-sm font-medium text-gray-700"
						>
							Location *
						</label>
						<input
							id="campusLocation"
							name="campusLocation"
							type="text"
							value={onboardingData.campusLocation || ""}
							onChange={handleChange}
							className="mt-1 block w-full border border-gray-300 rounded-md p-2"
							required
						/>
					</div>

					<div>
						<label
							htmlFor="campusFoundedYear"
							className="block text-sm font-medium text-gray-700"
						>
							Founded Year *
						</label>
						<input
							id="campusFoundedYear"
							name="campusFoundedYear"
							type="number"
							min="1800"
							max={new Date().getFullYear()}
							value={onboardingData.campusFoundedYear || ""}
							onChange={handleChange}
							className="mt-1 block w-full border border-gray-300 rounded-md p-2"
							required
						/>
					</div>
				</div>
			</div>

			<button
				type="button"
				onClick={handleNext}
				disabled={isProcessing}
				className="w-full py-2 px-4 bg-green-600 text-white font-semibold rounded-md hover:bg-green-700 transition duration-300 mt-8 disabled:opacity-50 disabled:cursor-not-allowed"
			>
				{isProcessing ? "Processing..." : "Next"}
			</button>

			{toast && (
				<div className="fixed bottom-4 right-4 z-50">
					<Toast
						message={toast.message}
						type={toast.type}
						onClose={() => setToast(null)}
					/>
				</div>
			)}
		</div>
	);
};

export default CreateCampus;
