import { useContext } from "react";
import { AuthContext } from "../context/AuthContext";

const API_BASE_URL = "https://erp-system-backend.onrender.com/api/v1";
const AUTH_BASE_URL =
	"http://login-applications.eu-north-1.elasticbeanstalk.com/auth";

export const useApiEndpoints = () => {
	const { userData } = useContext(AuthContext);
	const userId = userData?.id;

	return {
		// Auth endpoints - no userId needed
		ADMIN_LOGIN: `${AUTH_BASE_URL}/login`,
		ADMIN_REGISTER: `${AUTH_BASE_URL}/register`,
		CREATE_ADMIN: `${AUTH_BASE_URL}/register`,
		VERIFY_EMAIL: `${API_BASE_URL}/admin/verify-email/1`,
		ADMIN_FORGOT_PASSWORD: `${API_BASE_URL}/admin/forget-password`,
		ADMIN_RESET_PASSWORD: (token) =>
			`${API_BASE_URL}/admin/reset-password/${token}/${userId}`,
		ADMIN_LOGOUT: `${API_BASE_URL}/admin/logout`,

		// Campus endpoints
		CREATE_CAMPUS: `${API_BASE_URL}/campus/reg/campus`,
		CREATE_BRANCH: `${API_BASE_URL}/campus/reg/branch`,
		FECTH_CAMPUS_BY_ID: (campusId) =>
			`${API_BASE_URL}/campus/fetch-campus/${campusId}`,
		UPDATE_CAMPUS: `${API_BASE_URL}/campus/update-campus`,

		// Teacher endpoints
		REGISTER_TEACHER: `${API_BASE_URL}/teacher/${userId}/reg`,
		FETCH_ALL_TEACHERS: `${API_BASE_URL}/teacher/${userId}/fetchAll`,
		FETCH_TEACHERS: (teacherId) =>
			`${API_BASE_URL}/teacher/${userId}/fetch/${teacherId}`,
		UPDATE_TEACHERS: (id) => `${API_BASE_URL}/teacher/${userId}/update/${id}`,
		DELETE_TEACHERS: (id) => `${API_BASE_URL}/teacher/${userId}/delete/${id}`,
		DELETE_ALL_TEACHERS: `${API_BASE_URL}/teacher/${userId}/deleteAllTeacher`,
		LOGIN_TEACHERS: `${API_BASE_URL}/teacher/login`,

		// Student endpoints
		REGISTER_STUDENTS: `${API_BASE_URL}/student/${userId}/reg`,
		FETCH_ALL_STUDENTS: `${API_BASE_URL}/student/${userId}/fetchAll`,
		FETCH_STUDENT: (studentId) =>
			`${API_BASE_URL}/student/${userId}/fetch/${studentId}`,
		UPDATE_STUDENTS: (eventId) =>
			`${API_BASE_URL}/student/${userId}/update/${eventId}`,
		DELETE_STUDENTS: (eventId) =>
			`${API_BASE_URL}/student/${userId}/deleteStudent/${eventId}`,
		DELETE_ALL_STUDENTS: `${API_BASE_URL}/student/${userId}/deleteAllStudent`,
		LOGIN_STUDENTS: `${API_BASE_URL}/student/login`,

		// Attendance endpoints
		MARK_FACULTY_ATTENDANCE: `${API_BASE_URL}/attendance/markFacultyAttendance/${userId}`,
		FETCH_FACULTY_ATTENDANCE: (date) =>
			`${API_BASE_URL}/attendance/fetchFacultyAttendance/${userId}/${date}`,
		UPDATE_ATTENDANCE: `${API_BASE_URL}/attendance/updateFacultyAttendance/${userId}`,
		GET_ATTENDANCE_BY_DATE: `${API_BASE_URL}/attendance/getAttendenceByDate/${userId}`,

		// Department endpoints
		CREATE_DEPARTMENTS: `${API_BASE_URL}/department/${userId}/reg`,
		FETCH_ALL_DEPARTMENTS: `${API_BASE_URL}/department/fetchAll/${userId}`,
		FETCH_DEPARTMENTS: (deptId) => `${API_BASE_URL}/department/fetch/${deptId}`,
		UPDATE_DEPARTMENTS: (deptId) =>
			`${API_BASE_URL}/department/update/${deptId}`,
		DELETE_DEPARTMENT: (deptId) =>
			`${API_BASE_URL}/department/delete/${deptId}`,

		// Subject endpoints
		CREATE_SUBJECT: (deptId) => `${API_BASE_URL}/subject/${deptId}/reg`,
		FETCH_ALL_SUBJECTS: (deptId) =>
			`${API_BASE_URL}/subject/fetchAll/${deptId}`,
		UPDATE_SUBJECT: (subjectId) =>
			`${API_BASE_URL}/subject/update/${subjectId}`,
		DELETE_SUBJECT: (subjectId) =>
			`${API_BASE_URL}/subject/delete-subject/${subjectId}`,

		// Event endpoints
		CREATE_EVENT: `${API_BASE_URL}/event/create`,
		FETCH_ALL_EVENTS: `${API_BASE_URL}/event/fetchAll`,
		UPDATE_EVENT: (eventId) => `${API_BASE_URL}/event/update-event/${eventId}`,
		DELETE_EVENT: (eventId) => `${API_BASE_URL}/event/delete-event/${eventId}`,
		DELETE_ALL_EVENTS: `${API_BASE_URL}/event/deleteAll`,

		// Leave endpoints
		APPLY_LEAVE: `${API_BASE_URL}/Leave/apply-leave`,
		FETCH_ALL_LEAVES: `${API_BASE_URL}/leave/fetch-leaves`,
		FETCH_PENDING_LEAVES: `${API_BASE_URL}/leave/pending-leaves`,
		UPDATE_LEAVE_STATUS: (teacherId, action) =>
			`${API_BASE_URL}/leave/change-status/${teacherId}/${action}`,

		// Payment endpoints
		FETCH_STUDENT_PAYMENT: (studentId) =>
			`${API_BASE_URL}/payment/student/${studentId}`,
		FETCH_PAYMENT_STATUS: (studentId) =>
			`${API_BASE_URL}/payment/status/${studentId}`,
		UPDATE_PAYMENT: (paymentId, studentId) =>
			`${API_BASE_URL}/payment/create/${paymentId}/${studentId}`,

		// Support endpoint
		CREATE_SUPPORT: `${API_BASE_URL}/admin/support`,
	};
};

export default useApiEndpoints;
