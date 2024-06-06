const API_BASE_URL = "https://erp-system-backend.onrender.com/api/v1";

const getUserIdFromLocalStorage = () => {
	const userData = JSON.parse(localStorage.getItem("userData"));
	return userData && userData.id ? userData.id : null;
};

const userId = getUserIdFromLocalStorage();
console.log("User ID:", userId); // Add this line

if (!userId) {
	console.error("User ID not found in localStorage");
}

const API_ENDPOINTS = {
	// admin
	CREATE_ADMIN: `${API_BASE_URL}/admin/reg`,
	VERIFY_EMAIL: `${API_BASE_URL}/admin/verify-email/1`,
	ADMIN_LOGIN: `${API_BASE_URL}/admin/login`,
	UPDATE_ADMIN: `${API_BASE_URL}/admin/${userId}`,
	FETCH_ALL_ADMIN: `${API_BASE_URL}/admin`,
	ADMIN_FORGOT_PASSWORD: `${API_BASE_URL}/admin/forget-password`,
	ADMIN_RESET_PASSWORD: `${API_BASE_URL}/admin/reset-password/(token-value)`,
	ADMIN_LOGOUT: `${API_BASE_URL}/admin/logout`,
	DELETE_ADMIN: `${API_BASE_URL}/admin/${userId}`,
	// EMPLOYEE/TEACHERS
	REGISTER_TEACHER: `${API_BASE_URL}/teacher/${userId}/reg`,
	FETCH_ALL_TEACHERS: `${API_BASE_URL}/teacher/${userId}/fetchAll`,
	UPDATE_TEACHERS: `${API_BASE_URL}/teacher/${userId}/update/:id`,
	DELETE_TEACHERS: `${API_BASE_URL}/teacher/${userId}/delete/:id`,
	DELETE_ALL_TEACHERS: `${API_BASE_URL}/teacher/${userId}/deleteAllTeacher`,
	LOGIN_TEACHERS: `${API_BASE_URL}/teacher/login`,
	// ATTENDANCE
	MARK_FACULTY_TEACHERS: `${API_BASE_URL}/attendance/markFacultyAttendance`,
	ALL_FACULTY_ATTENDANCE_DATE: (date) =>
		`${API_BASE_URL}/attendance/fetchFacultyAttendance/${date}`,
	UPDATE_ATTENDANCE: `${API_BASE_URL}/attendance/updateFacultyAttendance`,
	// STUDENTS
	REGISTER_STUDENTS: `${API_BASE_URL}/student/${userId}/reg`,
	FETCH_ALL_STUDENTS: `${API_BASE_URL}/student/${userId}/fetchAll`,
	UPDATE_STUDENTS: (eventId) =>
		`${API_BASE_URL}/student/${userId}/update/${eventId}`,
	DELETE_STUDENTS: (eventId) =>
		`${API_BASE_URL}/student/${userId}/deleteStudent/${eventId}`,
	DELETE_ALL_STUDENTSS: `${API_BASE_URL}/student/${userId}/deleteAllStudent`,
	LOGIN_STUDENTS: `${API_BASE_URL}/student/login`,
	// SUBJECTS
	CREATE_SUBJECT: `${API_BASE_URL}/subject/${userId}/reg`,
	// EVENT
	CREATE_EVENT: `${API_BASE_URL}/event/create`,
	FETCH_ALL_EVENTS: `${API_BASE_URL}/event/fetchAll`,
	UPDATE_EVENT: (eventId) => `${API_BASE_URL}/event/update-event/${eventId}`,
	DELETE_ALL_EVENT: `${API_BASE_URL}/event/deleteAll`,
	DELETE_EVENT: (eventId) => `${API_BASE_URL}/event/delete-event/${eventId}`,
	// LEAVE
	APPLY_LEAVE: `${API_BASE_URL}/Leave/apply-leave`,
	FETCH_ALL_LEAVES_TEACHER_ID: `${API_BASE_URL}/leave/fetch-leaves/`,
	FETCH_ALL_PENDING_LEAVES: `${API_BASE_URL}/leave/pending-leaves`,
	UPDATE_LEAVES: (action) =>
		`${API_BASE_URL}/leave/change-status/${userId}/${action}`,
	// DEPARTMENT
	CREATE_DEPARTMENTS: `${API_BASE_URL}/department/${userId}/reg`,
	UPDATE_DEPARTMENTS: (eventId) =>
		`${API_BASE_URL}/department/update/${eventId}`,
	DELETE_DEPARTMENT: (eventId) =>
		`${API_BASE_URL}/department/delete/${eventId}`,
	FETCH_ALL_DEPARTMENTS: `${API_BASE_URL}/department/fetchAll`,
};

export default API_ENDPOINTS;
