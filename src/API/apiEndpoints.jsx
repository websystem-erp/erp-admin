const API_BASE_URL = "https://erp-system-backend.onrender.com/api/v1";

const getUserIdFromLocalStorage = () => {
	const userData = JSON.parse(localStorage.getItem("userData"));
	return userData && userData.id ? userData.id : null;
};

const userId = getUserIdFromLocalStorage();

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
	UPDATE_TEACHERS: `${API_BASE_URL}/teacher/${userId}/update/`,
	DELETE_TEACHERS: `${API_BASE_URL}/teacher/${userId}/delete/`,
	DELETE_ALL_TEACHERS: `${API_BASE_URL}/teacher/${userId}/deleteAllTeacher`,
	LOGIN_TEACHERS: `${API_BASE_URL}/teacher/login`,
	//ATTENDANCE

	// STUDENTS
	REGISTER_STUDENTS: `${API_BASE_URL}/student/${userId}/reg`,
	FETCH_ALL_STUDENTS: `${API_BASE_URL}/student/${userId}/fetchAll`,
	UPDATE_STUDENTS: `${API_BASE_URL}/student/${userId}/update/`,
	DELETE_STUDENTS: `${API_BASE_URL}/student/${userId}/deleteStudent/`,
	DELETE_ALL_STUDENTSS: `${API_BASE_URL}/student/${userId}/deleteAllStudent`,
	LOGIN_STUDENTS: `${API_BASE_URL}/student/login`,
	// EVENT
	CREATE_EVENT: `${API_BASE_URL}/event/create`,
	FETCH_ALL_EVENTS: `${API_BASE_URL}/event/fetchAll`,
	UPDATE_EVENT: `${API_BASE_URL}/event/update-event/1`,
	DELETE_ALL_EVENT: `${API_BASE_URL}/event/deleteAll`,

	// LEAVE
	APPLY_LEAVE: `${API_BASE_URL}/Leave/apply-leave`,
	FETCH_ALL_LEAVES_TEACHER_ID: `${API_BASE_URL}/leave/fetch-leaves/`,
	FETCH_ALL_PENDING_LEAVES: `${API_BASE_URL}/leave/pending-leaves`,

	FETCH_ALL_DEPARTMENTS: `${API_BASE_URL}/department/fetchAll`,
	DELETE_EVENT: (eventId) => `${API_BASE_URL}/event/delete-event/${eventId}`,
	// Add other endpoints as needed
};

export default API_ENDPOINTS;
