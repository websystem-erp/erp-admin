import React from "react";
import Navbar from "../FeesDepartment/Navbar";
import StudentList from "../Students/StudentList";

const FeesDashboard = ({ userData, logout }) => {
	return (
		<>
			<Navbar logout={logout} userData={userData} />
			<p>Welcome to the Finance Dashboard!</p>
			<StudentList />
		</>
	);
};

export default FeesDashboard;
