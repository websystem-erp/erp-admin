import React, { useState } from "react";
import axios from "axios";
import API_ENDPOINTS from "../API/apiEndpoints";

const ReviewPage = ({ onPrevious, onSubmit }) => {
	const [showOtpPopup, setShowOtpPopup] = useState(false);
	const [otp, setOtp] = useState("");
	const [roleId, setRoleId] = useState(null);

	const campusLogo = localStorage.getItem("campusLogo");
	const campusName = localStorage.getItem("campusName");
	const campusLocation = localStorage.getItem("campusLocation");
	const campusFoundedYear = localStorage.getItem("campusFoundedYear");

	const branchName = localStorage.getItem("branchName");
	const branchLocation = localStorage.getItem("branchLocation");

	const adminName = localStorage.getItem("adminName");
	const adminEmail = localStorage.getItem("adminEmail");
	const adminRole = localStorage.getItem("adminRole");
	let adminPhoto = localStorage.getItem("adminPhoto"); // This should eventually be a Cloudinary URL
	const adminPassword = localStorage.getItem("adminPassword"); // Retrieve the stored password

	const handleSubmit = async () => {
		try {
			// Submit campus data
			const campusResponse = await axios.post(API_ENDPOINTS.CREATE_CAMPUS, {
				name: campusName,
				location: campusLocation,
				foundedYear: parseInt(campusFoundedYear, 10),
				logo: localStorage.getItem("campusLogo"),
			});

			const campusId = campusResponse.data?.data?.id;
			if (campusId) {
				localStorage.setItem("campusId", campusId);
			}

			// Submit branch data
			const branchResponse = await axios.post(API_ENDPOINTS.CREATE_BRANCH, {
				campusId: Number(localStorage.getItem("campusId")),
				location: branchLocation,
				BranchName: branchName,
			});

			const branchId = branchResponse.data?.data?.id;
			if (branchId) {
				localStorage.setItem("branchId", branchId);
			}

			// Upload the admin photo to Cloudinary if it's a File
			if (adminPhoto && adminPhoto.startsWith("data:")) {
				const formData = new FormData();
				formData.append("file", adminPhoto);
				formData.append(
					"upload_preset",
					import.meta.env.VITE_CLOUDINARY_UPLOAD_PRESET
				);

				const uploadResponse = await axios.post(
					`https://api.cloudinary.com/v1_1/${
						import.meta.env.VITE_CLOUDINARY_CLOUD_NAME
					}/image/upload`,
					formData
				);

				adminPhoto = uploadResponse.data.secure_url;
				localStorage.setItem("adminPhoto", adminPhoto); // Store the Cloudinary URL
			}

			// Submit admin data
			const roleResponse = await axios.post(API_ENDPOINTS.CREATE_ROLE, {
				name: adminName,
				email: adminEmail,
				password: adminPassword, // Include password in the final submission
				branchId: Number(localStorage.getItem("branchId")),
				role: adminRole,
				photo: adminPhoto, // Use Cloudinary URL
			});

			const roleId = roleResponse.data?.data?.id;
			if (roleId) {
				setRoleId(roleId); // Store the roleId for OTP verification
				setShowOtpPopup(true); // Show the OTP input popup
				localStorage.setItem(`${adminRole.toLowerCase()}Id`, roleId);
			}
		} catch (error) {
			console.error("Error submitting data:", error);
		}
	};

	const handleVerifyOtp = async () => {
		try {
			const response = await axios.post(API_ENDPOINTS.VERIFY_OTP(roleId), {
				otp,
			});

			if (response.data?.success) {
				alert("OTP verified successfully!");
				localStorage.setItem("otpVerified", "true");
				setShowOtpPopup(false);
				onSubmit(); // Move to the next step (e.g., EmployeeUpload)
			} else {
				alert("Invalid OTP. Please try again.");
			}
		} catch (error) {
			console.error("Error verifying OTP:", error);
			alert("Error verifying OTP.");
		}
	};

	return (
		<div className="">
			<h2 className="text-2xl font-semibold mb-4 ">Review Details</h2>
			<div className="mb-4">
				<h3 className="font-semibold my-4 text-center text-xl">
					Campus Information
				</h3>
				<div className="flex justify-between items-start gap-4">
					<div>
						{adminPhoto && (
							<img
								src={campusLogo}
								alt="Logo"
								className="w-24 h-24 object-contain rounded-full mt-4"
							/>
						)}
					</div>
					<div>
						<div>
							<p>Campus: {campusName}</p>
							<p>Location: {campusLocation}</p>
							<p>Founded Year: {campusFoundedYear}</p>
						</div>

						<div className="my-4">
							<h3 className="font-semibold">Branch Information</h3>
							<p>Branch: {branchName}</p>
							<p>Location: {branchLocation}</p>
						</div>
					</div>
				</div>
			</div>

			<div>
				<h3 className="font-semibold my-4 text-center text-xl">
					Admin Information
				</h3>
				<div className="flex justify-between items-start gap-4">
					<div>
						{adminPhoto && (
							<img
								src={adminPhoto}
								alt="Admin Photo"
								className="w-24 h-24 object-contain rounded-full mt-4"
							/>
						)}
					</div>
					<div>
						<p>Admin: {adminName}</p>
						<p>Email: {adminEmail}</p>
						<p>Role: {adminRole}</p>
					</div>
				</div>
			</div>

			<div className="flex justify-between mt-6">
				<button
					type="button"
					onClick={onPrevious}
					className="py-2 px-4 bg-gray-600 text-white font-semibold rounded-md hover:bg-gray-700"
				>
					Previous
				</button>
				<button
					type="button"
					onClick={handleSubmit}
					className="py-2 px-4 bg-green-600 text-white font-semibold rounded-md hover:bg-green-700"
				>
					Verify & Submit
				</button>
			</div>

			{showOtpPopup && (
				<div className="fixed inset-0 flex items-center justify-center bg-gray-500 bg-opacity-75">
					<div className="bg-white p-4 rounded shadow-md">
						<h2 className="text-xl font-semibold mb-4">Enter OTP</h2>
						<input
							type="text"
							value={otp}
							onChange={(e) => setOtp(e.target.value)}
							className="border border-gray-300 rounded-md p-2 mb-4 w-full"
							placeholder="Enter OTP"
						/>
						<button
							onClick={handleVerifyOtp}
							className="py-2 px-4 bg-green-600 text-white font-semibold rounded-md hover:bg-green-700"
						>
							Verify OTP
						</button>
					</div>
				</div>
			)}
		</div>
	);
};

export default ReviewPage;
