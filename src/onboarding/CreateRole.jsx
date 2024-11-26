import React, { useState } from "react";
import { useOnboarding } from "../context/OnboardingContext";
import Toast from "../components/toast/Toast";
import compressImage from "../utils/imageCompression";

const CreateRole = ({ onNext, onPrevious }) => {
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
						message: "Please upload only image files",
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

				const newFile = new File([processedFile], "admin-photo.jpg", {
					type: "image/jpeg",
				});

				const finalSizeKB = newFile.size / 1024;
				if (finalSizeKB > 100) {
					setToast({
						message: "Image is too large. Please try with a smaller image.",
						type: "error",
					});
					return;
				}

				const reader = new FileReader();
				reader.onloadend = () => {
					updateOnboardingData({
						adminPhoto: newFile,
						adminPhotoPreview: reader.result,
					});
				};
				reader.readAsDataURL(newFile);

				setToast({
					message: "Image processed successfully",
					type: "success",
				});
			} catch (error) {
				console.error("Error processing image:", error);
				setToast({
					message: "Error processing image. Please try again.",
					type: "error",
				});
			} finally {
				setIsProcessing(false);
			}
		}
	};

	const validateForm = () => {
		if (!onboardingData.adminName?.trim()) {
			setToast({ message: "Name is required", type: "error" });
			return false;
		}
		if (!onboardingData.adminEmail?.trim()) {
			setToast({ message: "Email is required", type: "error" });
			return false;
		}
		if (!onboardingData.adminEmail.match(/^[^\s@]+@[^\s@]+\.[^\s@]+$/)) {
			setToast({
				message: "Please enter a valid email address",
				type: "error",
			});
			return false;
		}
		if (!onboardingData.adminPassword?.trim()) {
			setToast({ message: "Password is required", type: "error" });
			return false;
		}
		if (onboardingData.adminPassword.length < 6) {
			setToast({
				message: "Password must be at least 6 characters long",
				type: "error",
			});
			return false;
		}
		if (!onboardingData.adminPhoto) {
			setToast({ message: "Please upload your photo", type: "error" });
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
			<h2 className="text-2xl font-semibold mb-6 text-center">
				Create Admin Account
			</h2>

			<div className="space-y-6">
				<div>
					<label
						htmlFor="adminName"
						className="block text-sm font-medium text-gray-700"
					>
						Name *
					</label>
					<input
						id="adminName"
						name="adminName"
						type="text"
						value={onboardingData.adminName || ""}
						onChange={handleChange}
						className="mt-1 block w-full border border-gray-300 rounded-md p-2"
						required
					/>
				</div>

				<div>
					<label
						htmlFor="adminEmail"
						className="block text-sm font-medium text-gray-700"
					>
						Email *
					</label>
					<input
						id="adminEmail"
						name="adminEmail"
						type="email"
						value={onboardingData.adminEmail || ""}
						onChange={handleChange}
						className="mt-1 block w-full border border-gray-300 rounded-md p-2"
						required
					/>
				</div>

				<div>
					<label
						htmlFor="adminPassword"
						className="block text-sm font-medium text-gray-700"
					>
						Password *
					</label>
					<input
						id="adminPassword"
						name="adminPassword"
						type="password"
						value={onboardingData.adminPassword || ""}
						onChange={handleChange}
						className="mt-1 block w-full border border-gray-300 rounded-md p-2"
						required
					/>
				</div>

				<div className="mt-8">
					<span className="block text-sm font-medium text-gray-900 mb-2">
						Upload your photo * (Max size: 100KB)
					</span>
					<div className="flex justify-between items-center gap-4">
						{onboardingData.adminPhotoPreview && (
							<img
								src={onboardingData.adminPhotoPreview}
								alt="Photo Preview"
								className="w-24 h-24 object-cover rounded-full"
							/>
						)}
						<label
							htmlFor="file-input"
							className={`flex-1 flex flex-col items-center justify-center h-24 px-4 transition bg-white border-2 border-gray-300 border-dashed rounded-lg appearance-none cursor-pointer hover:border-gray-400 focus:outline-none ${
								isProcessing ? "opacity-50 cursor-not-allowed" : ""
							}`}
						>
							<span className="flex items-center space-x-2">
								{isProcessing ? (
									<svg
										className="animate-spin h-5 w-5 text-gray-500"
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
								) : (
									<svg
										xmlns="http://www.w3.org/2000/svg"
										className="w-6 h-6 text-gray-600"
										fill="none"
										viewBox="0 0 24 24"
										stroke="currentColor"
										strokeWidth="2"
									>
										<path
											strokeLinecap="round"
											strokeLinejoin="round"
											d="M7 16a4 4 0 01-.88-7.903A5 5 0 1115.9 6L16 6a5 5 0 011 9.9M15 13l-3-3m0 0l-3 3m3-3v12"
										/>
									</svg>
								)}
								<span className="font-medium text-gray-600">
									{isProcessing ? "Processing..." : "Drop files to Attach, or"}
									{!isProcessing && (
										<span className="text-sky-600 underline ml-1">browse</span>
									)}
								</span>
							</span>
							<input
								id="file-input"
								type="file"
								accept="image/*"
								className="hidden"
								onChange={handleFileChange}
								disabled={isProcessing}
								required
							/>
						</label>
					</div>
				</div>
			</div>

			<div className="flex justify-between mt-8">
				<button
					type="button"
					onClick={onPrevious}
					disabled={isProcessing}
					className="py-2 px-4 bg-gray-600 text-white font-semibold rounded-md hover:bg-gray-700 transition duration-300 disabled:opacity-50"
				>
					Previous
				</button>
				<button
					type="button"
					onClick={handleNext}
					disabled={isProcessing}
					className="py-2 px-4 bg-green-600 text-white font-semibold rounded-md hover:bg-green-700 transition duration-300 disabled:opacity-50"
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
		</div>
	);
};

export default CreateRole;
