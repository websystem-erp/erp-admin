import React, { useState, useEffect } from "react";
import Modal from "../popup/Modal";
import ModalDetails from "../popup/ModalDetails";
import axios from "axios";
import API_ENDPOINTS from "../../API/apiEndpoints";

const AdminProfileModal = ({ isOpen, onClose, adminData, onSave }) => {
	const [isEditing, setIsEditing] = useState(false);
	const [editedProfile, setEditedProfile] = useState(adminData || {});
	const [photoLoading, setPhotoLoading] = useState(false);

	const defaultMalePhoto =
		"https://res.cloudinary.com/duyau9qkl/image/upload/v1717910208/images/w7y88n61dxedxzewwzpn.png";
	const defaultFemalePhoto =
		"https://res.cloudinary.com/duyau9qkl/image/upload/v1717910872/images/dxflhaspx3rm1kcak2is.png";

	const getDefaultPhoto = (gender) => {
		return gender && gender.toLowerCase() === "female"
			? defaultFemalePhoto
			: defaultMalePhoto;
	};

	useEffect(() => {
		if (isOpen) {
			document.body.style.overflow = "hidden";
		} else {
			document.body.style.overflow = "auto";
		}
		return () => {
			document.body.style.overflow = "auto";
		};
	}, [isOpen]);

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

	const handleRemovePhoto = () => {
		setEditedProfile((prevProfile) => ({
			...prevProfile,
			photo: "",
		}));
	};

	const handleSave = async () => {
		try {
			const response = await fetch(API_ENDPOINTS.UPDATE_ADMIN, {
				method: "PUT",
				headers: {
					"Content-Type": "application/json",
				},
				body: JSON.stringify(editedProfile),
			});
			if (!response.ok) {
				const errorData = await response.json();
				throw new Error(`Network response was not ok: ${errorData.message}`);
			}
			onSave(editedProfile);
			setIsEditing(false);
			onClose();
		} catch (error) {
			console.error("Error updating admin:", error);
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
						src={editedProfile.photo || getDefaultPhoto(editedProfile.gender)}
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
							<button
								onClick={handleRemovePhoto}
								className="bg-red-500 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline mt-2"
							>
								Remove Photo
							</button>
						</div>
					)}
				</div>
				<div className="mx-4">
					{isEditing ? (
						<>
							<div className="my-2">
								<label
									className="block text-gray-700 text-sm font-bold mb-2"
									htmlFor="name"
								>
									Name:
								</label>
								<input
									type="text"
									name="name"
									value={editedProfile.name || ""}
									onChange={handleChange}
									className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
								/>
							</div>
							<div className="my-2">
								<label
									className="block text-gray-700 text-sm font-bold mb-2"
									htmlFor="role"
								>
									Role:
								</label>
								<input
									type="text"
									name="role"
									value={editedProfile.role || ""}
									onChange={handleChange}
									className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
								/>
							</div>
							<div className="my-2">
								<label
									className="block text-gray-700 text-sm font-bold mb-2"
									htmlFor="gender"
								>
									Gender:
								</label>
								<input
									type="text"
									name="gender"
									value={editedProfile.gender || ""}
									onChange={handleChange}
									className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
								/>
							</div>
							<div className="my-2">
								<label
									className="block text-gray-700 text-sm font-bold mb-2"
									htmlFor="dob"
								>
									Date Of Birth:
								</label>
								<input
									type="date"
									name="dob"
									value={editedProfile.dob || ""}
									onChange={handleChange}
									className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
								/>
							</div>
							<div className="my-2">
								<label
									className="block text-gray-700 text-sm font-bold mb-2"
									htmlFor="email"
								>
									Email:
								</label>
								<input
									type="email"
									name="email"
									value={editedProfile.email || ""}
									onChange={handleChange}
									className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
								/>
							</div>
							<button
								onClick={handleSave}
								className="bg-linear-green text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
							>
								Save
							</button>
						</>
					) : (
						<>
							<ModalDetails
								modalTitle={"Name : "}
								modalDesc={editedProfile.name}
							/>
							<ModalDetails
								modalTitle={"Role : "}
								modalDesc={editedProfile.role}
							/>
							<ModalDetails
								modalTitle={"Gender : "}
								modalDesc={editedProfile.gender}
							/>
							<ModalDetails
								modalTitle={"Date Of Birth : "}
								modalDesc={editedProfile.dob}
							/>
							<ModalDetails
								modalTitle={"Email : "}
								modalDesc={editedProfile.email}
							/>
							<button
								onClick={() => setIsEditing(true)}
								className="bg-linear-blue hover:bg-linear-blue text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
							>
								Edit
							</button>
						</>
					)}
				</div>
			</div>
		</Modal>
	);
};

export default AdminProfileModal;
