import React from "react";
import Modal from "../popup/Modal";
import ModalDetails from "../popup/ModalDetails";

const ProfileModal = ({ isOpen, onClose, profile }) => {
	return (
		<Modal
			modalOpen={isOpen}
			setModalOpen={onClose}
			responsiveWidth={"md:w-fit"}
		>
			<div className="flex">
				<div className="mx-4">
					<img
						src={profile.photo}
						alt={profile.name}
						className="w-32 h-32 mx-auto rounded-full"
					/>
					<h3 className="text-xl font-semibold my-4">{profile.name}</h3>
				</div>
				<div className="mx-4">
					<ModalDetails
						modalTitle={"Department Id : "}
						modalDesc={profile.departmentId}
					/>
					<ModalDetails modalTitle={"ID : "} modalDesc={profile.id} />
					<ModalDetails modalTitle={"Gender : "} modalDesc={profile.gender} />
					<ModalDetails modalTitle={"Role : "} modalDesc={profile.role} />
					<ModalDetails
						modalTitle={"Date of Birth : "}
						modalDesc={profile.dob}
					/>
					<ModalDetails
						modalTitle={"Contact Number : "}
						modalDesc={profile.contactNumber}
					/>
					<ModalDetails
						modalTitle={"Father's Name : "}
						modalDesc={profile.fatherName}
					/>
					<ModalDetails
						modalTitle={"Mother's Name : "}
						modalDesc={profile.motherName}
					/>
					<ModalDetails
						modalTitle={"Father's Contact Number : "}
						modalDesc={profile.fatherContactNumber}
					/>
					<ModalDetails
						modalTitle={"Permanent Address : "}
						modalDesc={profile.permanent_address}
					/>
					<ModalDetails
						modalTitle={"Current Address : "}
						modalDesc={profile.currentAddress}
					/>
				</div>
			</div>
		</Modal>
	);
};

export default ProfileModal;
