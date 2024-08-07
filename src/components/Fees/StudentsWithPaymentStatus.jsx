import React, { useState, useEffect } from "react";
import axios from "axios";
import API_ENDPOINTS from "../../API/apiEndpoints";
import { Icon } from "@iconify/react";
import Card from "../main/dashboard/Card";
import PaymentModal from "./PaymentModal";

const StudentsWithPaymentStatus = () => {
	const [students, setStudents] = useState([]);
	const [filteredStudents, setFilteredStudents] = useState([]);
	const [paymentStatus, setPaymentStatus] = useState({});
	const [loading, setLoading] = useState(true);
	const [error, setError] = useState("");
	const [searchTerm, setSearchTerm] = useState("");
	const [departmentFilter, setDepartmentFilter] = useState("");
	const [termFeesFilter, setTermFeesFilter] = useState("");
	const [semesterFeesFilter, setSemesterFeesFilter] = useState("");
	const [feesPaid, setFeesPaid] = useState(0);
	const [showModal, setShowModal] = useState(false);
	const [selectedPayment, setSelectedPayment] = useState({
		studentId: null,
		paymentId: null,
	});

	useEffect(() => {
		const fetchStudents = async () => {
			try {
				const response = await axios.get(API_ENDPOINTS.FETCH_ALL_STUDENTS);
				const studentData = response.data.data;
				setStudents(studentData);
				setFilteredStudents(studentData);
				fetchPaymentStatuses(studentData);
			} catch (err) {
				setError("Error fetching students");
				console.error(err);
			}
		};

		const fetchPaymentStatuses = async (students) => {
			try {
				let totalFeesPaid = 0;
				const statusPromises = students.map((student) =>
					axios
						.get(API_ENDPOINTS.FETCH_STUDENT_PAYMENT_DETAILS(student.id))
						.then((response) => {
							const payments = response.data.data.payment;
							const termFeeStatus =
								payments.find((payment) => payment.title === "Term Fees")
									?.status || "Pending";
							const semesterFeeStatus =
								payments.find((payment) => payment.title === "Semester Fees")
									?.status || "Pending";

							// Calculate total fees paid
							payments.forEach((payment) => {
								if (payment.status === "paid") {
									totalFeesPaid += payment.amount;
								}
							});

							return {
								id: student.id,
								termFeeStatus: termFeeStatus === "paid" ? "Paid" : "Pending",
								semesterFeeStatus:
									semesterFeeStatus === "paid" ? "Paid" : "Pending",
							};
						})
						.catch((error) => {
							if (error.response && error.response.status === 404) {
								return {
									id: student.id,
									termFeeStatus: "Pending",
									semesterFeeStatus: "Pending",
								};
							} else {
								throw error;
							}
						})
				);
				const statuses = await Promise.all(statusPromises);
				const statusMap = {};
				statuses.forEach(({ id, termFeeStatus, semesterFeeStatus }) => {
					statusMap[id] = { termFeeStatus, semesterFeeStatus };
				});
				setPaymentStatus(statusMap);
				setFeesPaid(totalFeesPaid);
			} catch (err) {
				setError("Error fetching payment statuses");
				console.error(err);
			} finally {
				setLoading(false);
			}
		};

		fetchStudents();
	}, []);

	const handleSearch = () => {
		let filtered = students;

		if (searchTerm) {
			filtered = filtered.filter((student) =>
				student.name.toLowerCase().includes(searchTerm.toLowerCase())
			);
		}

		if (departmentFilter) {
			filtered = filtered.filter(
				(student) => student.department?.name === departmentFilter
			);
		}

		if (termFeesFilter) {
			filtered = filtered.filter(
				(student) => paymentStatus[student.id]?.termFeeStatus === termFeesFilter
			);
		}

		if (semesterFeesFilter) {
			filtered = filtered.filter(
				(student) =>
					paymentStatus[student.id]?.semesterFeeStatus === semesterFeesFilter
			);
		}

		setFilteredStudents(filtered);
	};

	useEffect(() => {
		handleSearch();
	}, [searchTerm, departmentFilter, termFeesFilter, semesterFeesFilter]);

	const handleEditClick = (studentId, paymentId) => {
		setSelectedPayment({ studentId, paymentId });
		setShowModal(true);
	};

	const handleUpdate = () => {
		setLoading(true);
		setShowModal(false);
		// Refetch students and payment statuses after update
		const fetchStudents = async () => {
			try {
				const response = await axios.get(API_ENDPOINTS.FETCH_ALL_STUDENTS);
				const studentData = response.data.data;
				setStudents(studentData);
				setFilteredStudents(studentData);
				fetchPaymentStatuses(studentData);
			} catch (err) {
				setError("Error fetching students");
				console.error(err);
			}
		};

		const fetchPaymentStatuses = async (students) => {
			try {
				let totalFeesPaid = 0;
				const statusPromises = students.map((student) =>
					axios
						.get(API_ENDPOINTS.FETCH_STUDENT_PAYMENT_DETAILS(student.id))
						.then((response) => {
							const payments = response.data.data.payment;
							const termFeeStatus =
								payments.find((payment) => payment.title === "Term Fees")
									?.status || "Pending";
							const semesterFeeStatus =
								payments.find((payment) => payment.title === "Semester Fees")
									?.status || "Pending";

							// Calculate total fees paid
							payments.forEach((payment) => {
								if (payment.status === "paid") {
									totalFeesPaid += payment.amount;
								}
							});

							return {
								id: student.id,
								termFeeStatus: termFeeStatus === "paid" ? "Paid" : "Pending",
								semesterFeeStatus:
									semesterFeeStatus === "paid" ? "Paid" : "Pending",
							};
						})
						.catch((error) => {
							if (error.response && error.response.status === 404) {
								return {
									id: student.id,
									termFeeStatus: "Pending",
									semesterFeeStatus: "Pending",
								};
							} else {
								throw error;
							}
						})
				);
				const statuses = await Promise.all(statusPromises);
				const statusMap = {};
				statuses.forEach(({ id, termFeeStatus, semesterFeeStatus }) => {
					statusMap[id] = { termFeeStatus, semesterFeeStatus };
				});
				setPaymentStatus(statusMap);
				setFeesPaid(totalFeesPaid);
			} catch (err) {
				setError("Error fetching payment statuses");
				console.error(err);
			} finally {
				setLoading(false);
			}
		};

		fetchStudents();
	};

	if (loading) return <p>Loading...</p>;
	if (error) return <p>{error}</p>;

	return (
		<div className="px-8">
			{showModal && (
				<PaymentModal
					studentId={selectedPayment.studentId}
					paymentId={selectedPayment.paymentId}
					onClose={() => setShowModal(false)}
					onUpdate={handleUpdate}
				/>
			)}
			<div className="flex justify-center items-center my-20">
				<Card
					icon={"clarity:employee-group-solid"}
					title={"Total Students"}
					number={students.length}
					iconClass={"salary-icon"}
					iconColor={"bg-linear-blue"}
				/>
				<Card
					icon={"ri:money-rupee-circle-line"}
					title={"Due Fees"}
					number={"-"}
					iconClass={"salary-icon"}
					iconColor={"bg-linear-red"}
				/>
				<Card
					icon={"ri:money-rupee-circle-line"}
					title={"Fees Paid"}
					number={`₹${feesPaid}`}
					iconClass={"salary-icon"}
					iconColor={"bg-linear-green"}
				/>
			</div>
			<div className="flex justify-between items-center">
				<h2 className="text-2xl font-bold">Student Fees Details</h2>

				<div className="mb-4 flex flex-wrap justify-end">
					<div className="mx-2">
						<select
							value={departmentFilter}
							onChange={(e) => setDepartmentFilter(e.target.value)}
							className="w-full rounded-lg border-gray-300 text-gray-700 sm:text-sm py-2.5 pe-10 shadow-sm"
						>
							<option value="">All Departments</option>
							{[
								...new Set(students.map((student) => student.department?.name)),
							].map((dept) => (
								<option key={dept || "default"} value={dept}>
									{dept}
								</option>
							))}
						</select>
					</div>
					<div className="mx-2">
						<select
							value={termFeesFilter}
							onChange={(e) => setTermFeesFilter(e.target.value)}
							className="w-full rounded-lg border-gray-300 text-gray-700 sm:text-sm py-2.5 pe-10 shadow-sm"
						>
							<option value="">All Term Fees</option>
							<option value="Paid">Paid</option>
							<option value="Pending">Pending</option>
						</select>
					</div>
					<div className="mx-2">
						<select
							value={semesterFeesFilter}
							onChange={(e) => setSemesterFeesFilter(e.target.value)}
							className="w-full rounded-lg border-gray-300 text-gray-700 sm:text-sm py-2.5 pe-10 shadow-sm"
						>
							<option value="">All Semester Fees</option>
							<option value="Paid">Paid</option>
							<option value="Pending">Pending</option>
						</select>
					</div>
					<div className="relative">
						<label htmlFor="Search" className="sr-only">
							{" "}
							Search{" "}
						</label>

						<input
							type="text"
							id="Search"
							value={searchTerm}
							onChange={(e) => setSearchTerm(e.target.value)}
							placeholder="Search for..."
							className="w-full rounded-md border-gray-200 py-2.5 pe-10 shadow-sm sm:text-sm"
						/>

						<span className="absolute inset-y-0 end-0 grid w-10 place-content-center">
							<button
								type="button"
								className="text-gray-600 hover:text-gray-700"
							>
								<span className="sr-only">Search</span>

								<svg
									xmlns="http://www.w3.org/2000/svg"
									fill="none"
									viewBox="0 0 24 24"
									strokeWidth="1.5"
									stroke="currentColor"
									className="h-4 w-4"
								>
									<path
										strokeLinecap="round"
										strokeLinejoin="round"
										d="M21 21l-5.197-5.197m0 0A7.5 7.5 0 105.196 5.196a7.5 7.5 0 0010.607 10.607z"
									/>
								</svg>
							</button>
						</span>
					</div>
				</div>
			</div>
			<div>
				<div className="-mx-4 sm:-mx-8 px-4 sm:px-8 py-4 ">
					<div className="inline-block min-w-full shadow rounded-lg ">
						<table className="min-w-full leading-normal table-auto">
							<thead>
								<tr>
									<th className="w-fit px-2 py-3 border-b-2 border-gray-200 bg-gray-100 text-center text-sm md:text-base font-semibold text-gray-600 uppercase tracking-wider">
										Name
									</th>
									<th className="w-fit px-2 py-3 border-b-2 border-gray-200 bg-gray-100 text-center text-sm md:text-base font-semibold text-gray-600 uppercase tracking-wider">
										Roll Number
									</th>
									<th className="w-fit px-2 py-3 border-b-2 border-gray-200 bg-gray-100 text-center text-sm md:text-base font-semibold text-gray-600 uppercase tracking-wider">
										Email
									</th>
									<th className="w-fit px-2 py-3 border-b-2 border-gray-200 bg-gray-100 text-center text-sm md:text-base font-semibold text-gray-600 uppercase tracking-wider">
										Department
									</th>
									<th className="w-fit px-2 py-3 border-b-2 border-gray-200 bg-gray-100 text-center text-sm md:text-base font-semibold text-gray-600 uppercase tracking-wider">
										Term Fees
									</th>
									<th className="w-fit px-2 py-3 border-b-2 border-gray-200 bg-gray-100 text-center text-sm md:text-base font-semibold text-gray-600 uppercase tracking-wider">
										Semester Fees
									</th>
									<th className="w-fit px-2 py-3 border-b-2 border-gray-200 bg-gray-100 text-center text-sm md:text-base font-semibold text-gray-600 uppercase tracking-wider"></th>
								</tr>
							</thead>
							<tbody className="divide-y divide-gray-200 text-center">
								{filteredStudents.map((student) => (
									<tr key={student.id}>
										<td className="px-2 py-5 bg-white text-sm md:text-base">
											<div className="flex justify-start items-center">
												<div className="flex-shrink-0 w-10 h-10 rounded-full overflow-hidden">
													<img
														src={student.photo}
														className="w-full h-full object-cover"
														alt={`${student.name}'s profile`}
														onError={(e) => {
															e.target.src = "default-image-url";
														}}
													/>
												</div>
												<div className="ml-3">
													<p className="text-gray-900 whitespace-no-wrap">
														{student.name}
													</p>
												</div>
											</div>
										</td>
										<td className="px-2 py-5 bg-white text-center text-sm md:text-base">
											<p className="text-gray-900 whitespace-no-wrap">
												{student.rollNo}
											</p>
										</td>
										<td className="px-2 py-5 bg-white text-center text-sm md:text-base">
											<p className="text-gray-900 whitespace-no-wrap">
												{student.email}
											</p>
										</td>
										<td className="px-2 py-5 bg-white text-center text-sm md:text-base">
											<p className="text-gray-900 whitespace-no-wrap">
												{student.department?.name || "-"}
											</p>
										</td>
										<td className="px-2 py-5 bg-white text-center text-sm md:text-base">
											<p className="text-gray-900 whitespace-no-wrap">
												{paymentStatus[student.id]?.termFeeStatus}
											</p>
										</td>
										<td className="px-2 py-5 bg-white text-center text-sm md:text-base">
											<p className="text-gray-900 whitespace-no-wrap">
												{paymentStatus[student.id]?.semesterFeeStatus}
											</p>
										</td>
										<td className="px-2 py-5 bg-white text-center text-sm md:text-base">
											<button
												onClick={() => handleEditClick(student.id, paymentId)} // Ensure paymentId is available for each student
												className="bg-linear-red whitespace-no-wrap w-fit p-2 rounded-md"
											>
												<Icon
													icon="flowbite:edit-solid"
													className="h-6 w-6 flex-shrink-0 text-white"
												/>
											</button>
										</td>
									</tr>
								))}
							</tbody>
						</table>
					</div>
				</div>
			</div>
		</div>
	);
};

export default StudentsWithPaymentStatus;
