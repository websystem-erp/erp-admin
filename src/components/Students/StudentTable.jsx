import React from "react";
import ListTable from "../List/ListTable";
import AllStudents from "./AllStudents";

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
			ListRole={"Roll Number"}
			ListDepartment={"Department"}
			ListAction={"Actions"}
			showDataList={students.map((student) => (
				<AllStudents
					key={student.id}
					profile={student.photo || getDefaultPhoto(student.gender)}
					name={student.name}
					rollNo={student.rollNo}
					department={student.department ? student.department.name : "N/A"}
					dangerAction={"Remove"}
					action1={"View Profile"}
					buttonHide={"hidden"}
					onViewProfile={() =>
						onViewProfile(
							{
								photo: student.photo || getDefaultPhoto(student.gender),
								name: student.name,
								year: student.year,
								rollNo: student.rollNo,
								email: student.email,
								gender: student.gender,
								dob: student.dob,
								contactNumber: student.contactNumber,
								department: student.department
									? student.department.name
									: "N/A",
								permanent_address: student.permanent_address,
								currentAddress: student.currentAddress,
								fatherName: student.fatherName,
								motherName: student.motherName,
								fatherContactNumber: student.fatherContactNumber,
								paymentStatus:
									student.payment && student.payment.length > 0
										? student.payment[0].status
										: "N/A",
							},
							student.id // Pass the student ID
						)
					}
					onDelete={() => onDeleteProfile(student.id)}
				/>
			))}
		/>
	);
};

export default StudentTable;
