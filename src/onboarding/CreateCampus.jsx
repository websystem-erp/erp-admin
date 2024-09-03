import React, { useState, useEffect } from "react";
import axios from "axios";
import Toast from "../components/toast/Toast";

const CreateCampus = ({ onNext }) => {
	const [campusData, setCampusData] = useState({
		campusName: localStorage.getItem("campusName") || "",
		location: localStorage.getItem("campusLocation") || "",
		foundedYear: localStorage.getItem("campusFoundedYear") || "",
		logo: localStorage.getItem("campusLogo") || "",
	});
	const [logoPreview, setLogoPreview] = useState(
		localStorage.getItem("campusLogo") || null
	);
	const [uploading, setUploading] = useState(false);
	const [toast, setToast] = useState(null);

	useEffect(() => {
		const storedLogo = localStorage.getItem("campusLogo");
		if (storedLogo) {
			setCampusData((prevData) => ({ ...prevData, logo: storedLogo }));
			setLogoPreview(storedLogo);
		}
	}, []);

	const handleChange = (e) => {
		const { name, value } = e.target;
		setCampusData((prevData) => ({ ...prevData, [name]: value }));
	};

	const handleFileChange = async (e) => {
		const file = e.target.files[0];
		if (file) {
			setUploading(true);
			const reader = new FileReader();
			reader.onloadend = () => {
				setLogoPreview(reader.result);
			};
			reader.readAsDataURL(file);

			try {
				const formData = new FormData();
				formData.append("file", file);
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

				const logoUrl = uploadResponse.data.secure_url;
				setCampusData((prevData) => ({ ...prevData, logo: logoUrl }));
				localStorage.setItem("campusLogo", logoUrl);
				setToast({ message: "Logo uploaded successfully!", type: "success" });
			} catch (error) {
				console.error("Error uploading logo:", error);
				setToast({
					message: "Failed to upload logo. Please try again.",
					type: "error",
				});
			} finally {
				setUploading(false);
			}
		}
	};

	const handleNext = () => {
		if (!campusData.logo) {
			setToast({
				message: "Please upload a logo before proceeding.",
				type: "error",
			});
			return;
		}

		localStorage.setItem("campusName", campusData.campusName);
		localStorage.setItem("campusLocation", campusData.location);
		localStorage.setItem("campusFoundedYear", campusData.foundedYear);

		onNext();
	};

	return (
		<form>
			<h6 className="text-lg font-semibold mb-4">Create Campus</h6>

			<div className="flex justify-between items-center">
				<div className="mb-4 flex flex-col items-center">
					<div
						className="relative w-36 h-36 p-1 rounded-full border border-gray-300 flex items-center justify-center cursor-pointer overflow-hidden"
						onClick={() => document.getElementById("logoUpload").click()}
					>
						{logoPreview ? (
							<img
								src={logoPreview}
								alt="Logo Preview"
								className="w-fit h-fit object-contain p-4"
							/>
						) : (
							<span className="text-gray-500">Upload Logo</span>
						)}
					</div>
					<input
						id="logoUpload"
						name="logo"
						type="file"
						onChange={handleFileChange}
						className="hidden"
					/>
					{uploading && <p className="text-green-600 mt-2">Uploading...</p>}
				</div>

				<div>
					<div className="mb-4">
						<label
							htmlFor="campusName"
							className="block text-sm font-medium text-gray-700"
						>
							Campus Name
						</label>
						<input
							id="campusName"
							name="campusName"
							type="text"
							value={campusData.campusName}
							onChange={handleChange}
							className="mt-1 block w-full border border-gray-300 rounded-md p-2"
							required
						/>
					</div>

					<div className="mb-4">
						<label
							htmlFor="location"
							className="block text-sm font-medium text-gray-700"
						>
							Location
						</label>
						<input
							id="location"
							name="location"
							type="text"
							value={campusData.location}
							onChange={handleChange}
							className="mt-1 block w-full border border-gray-300 rounded-md p-2"
							required
						/>
					</div>

					<div className="mb-4">
						<label
							htmlFor="foundedYear"
							className="block text-sm font-medium text-gray-700"
						>
							Founded Year
						</label>
						<input
							id="foundedYear"
							name="foundedYear"
							type="number"
							value={campusData.foundedYear}
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
				disabled={uploading}
				className={`py-2 px-4 w-full bg-green-600 text-white font-semibold rounded-md hover:bg-green-700 mt-4 ${
					uploading ? "opacity-50 cursor-not-allowed" : ""
				}`}
			>
				Next
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
		</form>
	);
};

export default CreateCampus;
