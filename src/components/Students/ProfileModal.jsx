import React, { useState, useEffect } from "react";
import Modal from "../popup/Modal";
import ModalDetails from "../popup/ModalDetails";
import axios from "axios";
import API_ENDPOINTS from "../../API/apiEndpoints";

const ProfileModal = ({ isOpen, onClose, profile, onSave }) => {
	const [isEditing, setIsEditing] = useState(false);
	const [editedProfile, setEditedProfile] = useState(profile);
	const [photoLoading, setPhotoLoading] = useState(false);
	const [feesStatus, setFeesStatus] = useState(null);

	useEffect(() => {
		const fetchFeesStatus = async () => {
			try {
				const response = await axios.get(
					API_ENDPOINTS.FETCH_STUDENT_PAYMENT_DETAILS(profile.id)
				);
				setFeesStatus(response.data);
			} catch (error) {
				console.error("Error fetching fees status:", error);
				setFeesStatus(null);
			}
		};

		if (profile.id) {
			fetchFeesStatus();
		}
	}, [profile.id]);

	const handleChange = (e) => {
		const { name, value } = e.target;
		setEditedProfile((prevProfile) => ({
			...prevProfile,
			[name]: value,
		}));
	};

	const handlePhotoChange = async (e) => {
		const file = e.target.files[0];
		if (file) {
			const formData = new FormData();
			formData.append("file", file);
			formData.append(
				"upload_preset",
				import.meta.env.VITE_CLOUDINARY_UPLOAD_PRESET
			);

			setPhotoLoading(true);
			try {
				const response = await axios.post(
					`https://api.cloudinary.com/v1_1/${
						import.meta.env.VITE_CLOUDINARY_CLOUD_NAME
					}/image/upload`,
					formData
				);
				setEditedProfile((prevProfile) => ({
					...prevProfile,
					photo: response.data.secure_url,
				}));
			} catch (error) {
				console.error("Error uploading photo:", error);
			} finally {
				setPhotoLoading(false);
			}
		}
	};

	const handleSave = async () => {
		console.log("Saving profile with ID:", editedProfile.id); // Add this log
		try {
			const response = await fetch(
				API_ENDPOINTS.UPDATE_STUDENTS(editedProfile.id),
				{
					method: "PUT",
					headers: {
						"Content-Type": "application/json",
					},
					body: JSON.stringify(editedProfile),
				}
			);
			if (!response.ok) {
				const errorData = await response.json();
				throw new Error(`Network response was not ok: ${errorData.message}`);
			}
			onSave(editedProfile);
			setIsEditing(false);
			onClose();
		} catch (error) {
			console.error("Error updating student:", error);
		}
	};

	return (
		<Modal
			modalOpen={isOpen}
			setModalOpen={onClose}
			responsiveWidth={"md:w-fit"}
		>
			<div className="flex">
				<div className="mx-4">
					<img
						src={editedProfile.photo}
						alt={editedProfile.name}
						className="w-32 h-32 mx-auto rounded-full"
					/>
					<h3 className="text-xl font-semibold my-4">{editedProfile.name}</h3>
					{isEditing && (
						<div className="my-2">
							<label
								className="block text-gray-700 text-sm font-bold mb-2"
								htmlFor="photo"
							>
								Profile Photo:
							</label>
							<input
								type="file"
								name="photo"
								onChange={handlePhotoChange}
								className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
								disabled={photoLoading}
							/>
							{photoLoading && <p>Uploading...</p>}
						</div>
					)}
				</div>
				<div className="mx-4">
					{isEditing ? (
						<>
							{Object.keys(editedProfile).map(
								(key) =>
									key !== "photo" && (
										<div key={key} className="my-2">
											<label
												className="block text-gray-700 text-sm font-bold mb-2"
												htmlFor={key}
											>
												{key.replace("_", " ")}:
											</label>
											<input
												type="text"
												name={key}
												value={editedProfile[key] || ""}
												onChange={handleChange}
												className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
											/>
										</div>
									)
							)}
							<button
								onClick={handleSave}
								className="bg-linear-green text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
							>
								Save
							</button>
						</>
					) : (
						<>
							{Object.keys(profile).map(
								(key) =>
									key !== "photo" && (
										<ModalDetails
											key={key}
											modalTitle={`${key.replace("_", " ")} : `}
											modalDesc={String(profile[key])}
										/>
									)
							)}
							<button
								onClick={() => setIsEditing(true)}
								className="bg-linear-blue hover:bg-linear-blue text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
							>
								Edit
							</button>
						</>
					)}
					{feesStatus && (
						<div className="mt-4 p-4 bg-gray-100 rounded-lg">
							<h4 className="text-lg font-semibold">Fees Status</h4>
							<p>{feesStatus.paid ? "Paid" : "Not Paid"}</p>
							<p>Amount: {feesStatus.amount}</p>
						</div>
					)}
				</div>
			</div>
		</Modal>
	);
};

export default ProfileModal;
