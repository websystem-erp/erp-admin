import React, { useState, useEffect } from "react";
import API_ENDPOINTS from "../../API/apiEndpoints";
import StudentForm from "./StudentForm";
import ProfileModal from "./ProfileModal";
import StudentTable from "./StudentTable";
import ListTableBtn from "../List/ListTableBtn";

const StudentList = () => {
	const [students, setStudents] = useState([]);
	const [isLoading, setIsLoading] = useState(true);
	const [formModalOpen, setFormModalOpen] = useState(false);
	const [profileModalOpen, setProfileModalOpen] = useState(false);
	const [selectedProfile, setSelectedProfile] = useState(null);
	const [selectedStudentId, setSelectedStudentId] = useState(null); // Store the selected student ID

	useEffect(() => {
		const fetchStudents = async () => {
			try {
				const response = await fetch(API_ENDPOINTS.FETCH_ALL_STUDENTS);
				if (!response.ok) {
					throw new Error("Network response was not ok");
				}
				const data = await response.json();
				if (Array.isArray(data.data)) {
					setStudents(data.data);
				} else {
					console.error("Unexpected data format:", data);
				}
			} catch (error) {
				console.error("Error: ", error);
			} finally {
				setIsLoading(false);
			}
		};

		fetchStudents();
	}, []);

	const handleFormModal = () => {
		setFormModalOpen(true);
	};

	const handleViewProfile = (profile, studentId) => {
		setSelectedProfile(profile);
		setSelectedStudentId(studentId); // Store the selected student ID
		setProfileModalOpen(true);
	};

	const handleDeleteProfile = async (id) => {
		try {
			const response = await fetch(API_ENDPOINTS.DELETE_STUDENTS(id), {
				method: "DELETE",
			});
			if (!response.ok) throw new Error("Network response was not ok");
			setStudents(students.filter((student) => student.id !== id));
		} catch (error) {
			console.error("Error deleting student:", error);
		}
	};

	const handleStudentAdd = (newStudent) => {
		setStudents((prevState) => [...prevState, newStudent]);
	};

	const handleSaveProfile = (updatedStudent) => {
		setStudents((prevState) =>
			prevState.map((student) =>
				student.id === updatedStudent.id ? updatedStudent : student
			)
		);
	};

	return (
		<>
			{isLoading ? (
				<p>Loading...</p>
			) : (
				<div className="bg-white p-8 rounded-md w-fit sm:w-full">
					<div className="flex items-center justify-between pb-6">
						<div>
							<h2 className="text-gray-600 font-semibold">Student Details</h2>
						</div>
						<div className="flex items-center justify-between">
							<div className="flex flex-col gap-2">
								<ListTableBtn
									onClick={handleFormModal}
									text={"Add Student"}
									buttonColor={"bg-linear-green"}
									borderRadius={"rounded"}
								/>
							</div>
						</div>
						<StudentForm
							isOpen={formModalOpen}
							onClose={() => setFormModalOpen(false)}
							onStudentAdd={handleStudentAdd}
						/>
					</div>
					<StudentTable
						students={students}
						onViewProfile={handleViewProfile}
						onDeleteProfile={handleDeleteProfile}
					/>
					{selectedProfile && (
						<ProfileModal
							isOpen={profileModalOpen}
							onClose={() => setProfileModalOpen(false)}
							profile={selectedProfile}
							studentId={selectedStudentId} // Pass the selected student ID
							onSave={handleSaveProfile}
						/>
					)}
				</div>
			)}
		</>
	);
};

export default StudentList;
