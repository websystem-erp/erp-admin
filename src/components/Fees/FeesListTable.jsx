import React, { useState, useEffect } from "react";
import axios from "axios";
import API_ENDPOINTS from "../../API/apiEndpoints";

const FeesListTable = () => {
	const [feesDetails, setFeesDetails] = useState([]);

	// Function to fetch all students
	const fetchStudents = async () => {
		try {
			const response = await axios.get(API_ENDPOINTS.FETCH_ALL_STUDENTS);
			const students = response.data.data; // Adjust based on actual response structure

			// Fetch fees details for each student
			const promises = students.map(async (student) => {
				const feeResponse = await axios.get(
					`https://erp-system-backend-1.onrender.com/api/v1/payment/student/${student.id}`
				);
				return {
					...student,
					feesStatus: feeResponse.data.data.payment
						.map((payment) => payment.title)
						.join(", "),
				};
			});

			const studentsWithFees = await Promise.all(promises);
			setFeesDetails(studentsWithFees);
		} catch (error) {
			console.error("Error fetching student details:", error);
		}
	};

	useEffect(() => {
		fetchStudents();
	}, []);

	return (
		<div className="-mx-4 sm:-mx-8 px-4 sm:px-8 py-4">
			<div className="inline-block min-w-full shadow rounded-lg">
				<table className="min-w-full leading-normal table-auto table-styling">
					<thead>
						<tr>
							<th className="w-fit px-2 py-3 border-b-2 border-gray-200 bg-gray-100 text-center text-sm md:text-base font-semibold text-gray-600 uppercase tracking-wider">
								Student Name
							</th>
							<th className="w-fit px-2 py-3 border-b-2 border-gray-200 bg-gray-100 text-center text-sm md:text-base font-semibold text-gray-600 uppercase tracking-wider">
								Roll Number
							</th>
							<th className="w-fit px-2 py-3 border-b-2 border-gray-200 bg-gray-100 text-center text-sm md:text-base font-semibold text-gray-600 uppercase tracking-wider">
								Department
							</th>
							<th className="w-fit px-2 py-3 border-b-2 border-gray-200 bg-gray-100 text-center text-sm md:text-base font-semibold text-gray-600 uppercase tracking-wider">
								Fees Status
							</th>
						</tr>
					</thead>
					<tbody>
						{feesDetails.map((student) => (
							<tr key={student.id}>
								<td className="px-2 py-5 bg-white text-sm md:text-base">
									<div className="flex justify-start items-center">
										<div className="flex-shrink-0 w-10 h-10 rounded-full overflow-hidden">
											<img
												src={student.profile || "default-image-url"}
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
										{student.department}
									</p>
								</td>
								<td className="px-2 py-5 bg-white text-center text-sm md:text-base">
									{student.feesStatus.status}
								</td>
							</tr>
						))}
					</tbody>
				</table>
			</div>
		</div>
	);
};

export default FeesListTable;
