import React from "react";
import ListTable from "../List/ListTable";
import CommonTable from "../List/CommonTable";

const StudentTable = ({ students, onViewProfile, onDeleteProfile }) => {
	const getDefaultPhoto = (gender) => {
		const defaultMalePhoto =
			"https://res.cloudinary.com/duyau9qkl/image/upload/v1717910208/images/w7y88n61dxedxzewwzpn.png";
		const defaultFemalePhoto =
			"https://res.cloudinary.com/duyau9qkl/image/upload/v1717910872/images/dxflhaspx3rm1kcak2is.png";
		return gender && gender.toLowerCase() === "female"
			? defaultFemalePhoto
			: defaultMalePhoto;
	};

	return (
		<ListTable
			pageTitle={"Student Details"}
			ListName={"Name"}
			ListRole={"Role"}
			ListID={"ID"}
			ListAction={"Actions"}
			showDataList={students.map((student) => (
				<CommonTable
					key={student.id}
					profile={student.photo || getDefaultPhoto(student.gender)}
					name={student.name}
					role={student.role}
					id={student.id}
					dangerAction={"Remove"}
					action1={"View Profile"}
					buttonHide={"hidden"}
					onViewProfile={() =>
						onViewProfile({
							photo: student.photo || getDefaultPhoto(student.gender),
							name: student.name,
							role: student.role,
							id: student.id,
							gender: student.gender,
							dob: student.dob,
							contactNumber: student.contactNumber,
							departmentId: student.departmentId,
							permanent_address: student.permanent_address,
							currentAddress: student.currentAddress,
							fatherName: student.fatherName,
							motherName: student.motherName,
							fatherContactNumber: student.fatherContactNumber,
						})
					}
					onDelete={() => onDeleteProfile(student.id)}
				/>
			))}
		/>
	);
};

export default StudentTable;
