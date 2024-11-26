import React, { useState } from "react";
import { useOnboarding } from "../context/OnboardingContext";
import Toast from "../components/toast/Toast";
import axios from "axios";

const ReviewPage = ({ onPrevious, onSubmit }) => {
	const { onboardingData } = useOnboarding();
	const [isSubmitting, setIsSubmitting] = useState(false);
	const [toast, setToast] = useState(null);

	const API_URL =
		"http://login-applications.eu-north-1.elasticbeanstalk.com/auth/register";

	// Optimized validation with early returns
	const validateFormData = (formData) => {
		const requiredFields = {
			name: "Name",
			campusType: "Campus Type",
			boardType: "Board Type",
			role: "Role",
			email: "Email",
			password: "Password",
			campusname: "Campus Name",
			campuslocation: "Campus Location",
			campusfoundyear: "Founded Year",
			branchname: "Branch Name",
			branchlocation: "Branch Location",
		};

		for (const [field, label] of Object.entries(requiredFields)) {
			if (!formData.get(field)) {
				throw new Error(`${label} is required`);
			}
		}

		if (!formData.get("image")) {
			throw new Error("Campus logo is required");
		}
		if (!formData.get("adminimage")) {
			throw new Error("Admin photo is required");
		}
	};

	// Optimized form data preparation
	const prepareFormData = () => {
		const formData = new FormData();
		const textFields = {
			name: onboardingData.adminName,
			email: onboardingData.adminEmail.toLowerCase(),
			password: onboardingData.adminPassword,
			role: "Admin",
			campusType: onboardingData.educationType.toUpperCase(),
			boardType: onboardingData.boardType.toUpperCase(),
			campusname: onboardingData.campusName,
			campuslocation: onboardingData.campusLocation,
			campusfoundyear: onboardingData.campusFoundedYear,
			branchname: onboardingData.branchName,
			branchlocation: onboardingData.branchLocation,
		};

		// Append all text fields
		Object.entries(textFields).forEach(([key, value]) => {
			formData.append(key, String(value).trim());
		});

		// Append files
		if (onboardingData.adminPhoto) {
			formData.append("adminimage", onboardingData.adminPhoto);
		}
		if (onboardingData.campusLogo) {
			formData.append("image", onboardingData.campusLogo);
		}

		return formData;
	};

	// Optimized submit handler with better error handling
	const handleSubmit = async () => {
		setIsSubmitting(true);
		try {
			const formData = prepareFormData();
			validateFormData(formData);

			// Debug logging
			if (process.env.NODE_ENV === "development") {
				for (let [key, value] of formData.entries()) {
					console.log(
						`${key}:`,
						value instanceof File
							? `File: ${value.name} (${value.size} bytes)`
							: value
					);
				}
			}

			const response = await axios.post(API_URL, formData, {
				headers: {
					Accept: "application/json",
				},
			});

			// Check for successful response
			if (response.status === 200) {
				setToast({
					message: "Registration completed successfully!",
					type: "success",
				});
				setTimeout(onSubmit, 1500);
				return;
			}

			throw new Error("Registration failed. Please try again.");
		} catch (error) {
			console.error("Submission error:", error);

			const errorMessage =
				error.response?.data?.message ||
				error.message ||
				"An error occurred during registration. Please try again.";

			setToast({
				message: errorMessage,
				type: "error",
			});
		} finally {
			setIsSubmitting(false);
		}
	};

	// Render info section helper
	const renderInfoSection = ({ title, imagePreview, imageAlt, details }) => (
		<div className="bg-gray-50 p-4 rounded-lg">
			<h3 className="font-semibold text-xl mb-4">{title}</h3>
			<div className="flex gap-4">
				{imagePreview && (
					<div className="w-24 h-24 rounded-full overflow-hidden flex-shrink-0">
						<img
							src={imagePreview}
							alt={imageAlt}
							className="w-full h-full object-cover"
						/>
					</div>
				)}
				<div className="flex-1 space-y-2">{details}</div>
			</div>
		</div>
	);

	return (
		<div className="max-w-2xl mx-auto p-6">
			<h2 className="text-2xl font-semibold mb-6">Review Details</h2>

			<div className="space-y-8">
				{/* Campus Information */}
				{renderInfoSection({
					title: "Campus Information",
					imagePreview: onboardingData.campusLogoPreview,
					imageAlt: "Campus Logo",
					details: (
						<>
							<p>
								<span className="font-medium">Name:</span>{" "}
								{onboardingData.campusName}
							</p>
							<p>
								<span className="font-medium">Location:</span>{" "}
								{onboardingData.campusLocation}
							</p>
							<p>
								<span className="font-medium">Founded Year:</span>{" "}
								{onboardingData.campusFoundedYear}
							</p>
							<p>
								<span className="font-medium">Type:</span>{" "}
								{onboardingData.educationType}
							</p>
							{onboardingData.boardType && (
								<p>
									<span className="font-medium">Board:</span>{" "}
									{onboardingData.boardType}
								</p>
							)}
						</>
					),
				})}

				{/* Branch Information */}
				<div className="bg-gray-50 p-4 rounded-lg">
					<h3 className="font-semibold text-xl mb-4">Branch Information</h3>
					<div className="space-y-2">
						<p>
							<span className="font-medium">Name:</span>{" "}
							{onboardingData.branchName}
						</p>
						<p>
							<span className="font-medium">Location:</span>{" "}
							{onboardingData.branchLocation}
						</p>
					</div>
				</div>

				{/* Admin Information */}
				{renderInfoSection({
					title: "Admin Information",
					imagePreview: onboardingData.adminPhotoPreview,
					imageAlt: "Admin Photo",
					details: (
						<>
							<p>
								<span className="font-medium">Name:</span>{" "}
								{onboardingData.adminName}
							</p>
							<p>
								<span className="font-medium">Email:</span>{" "}
								{onboardingData.adminEmail}
							</p>
							<p>
								<span className="font-medium">Role:</span> Admin
							</p>
						</>
					),
				})}
			</div>

			{/* Action Buttons */}
			<div className="flex justify-between gap-4 mt-8">
				<button
					onClick={onPrevious}
					disabled={isSubmitting}
					className="py-2 px-4 bg-gray-600 text-white font-semibold rounded-md hover:bg-gray-700 disabled:opacity-50"
				>
					Previous
				</button>
				<button
					onClick={handleSubmit}
					disabled={isSubmitting}
					className="flex-1 py-2 px-4 bg-green-600 text-white font-semibold rounded-md hover:bg-green-700 disabled:opacity-50"
				>
					{isSubmitting ? (
						<div className="flex items-center justify-center gap-2">
							<svg
								className="animate-spin h-5 w-5 text-white"
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
								/>
								<path
									className="opacity-75"
									fill="currentColor"
									d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
								/>
							</svg>
							Submitting...
						</div>
					) : (
						"Submit"
					)}
				</button>
			</div>

			{/* Toast Notification */}
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

export default ReviewPage;
