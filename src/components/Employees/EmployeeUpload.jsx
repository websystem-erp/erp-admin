import React, { useState } from "react";
import * as XLSX from "xlsx";

const EmployeeUpload = ({ onEmployeesUpload }) => {
	const [file, setFile] = useState(null);

	const handleFileUpload = (event) => {
		setFile(event.target.files[0]);
	};

	const handleSubmit = async () => {
		if (!file) {
			alert("Please upload a file before submitting.");
			return;
		}

		const reader = new FileReader();

		reader.onload = async (e) => {
			try {
				const data = new Uint8Array(e.target.result);
				const workbook = XLSX.read(data, { type: "array" });
				const sheetName = workbook.SheetNames[0];
				const worksheet = workbook.Sheets[sheetName];
				const json = XLSX.utils.sheet_to_json(worksheet, { raw: false });

				const formattedData = json.map((employee) => ({
					...employee,
					password: String(employee.password), // Ensure password is a string
					dob: employee.dob, // Ensure dob remains in the original format
					departmentId: Number(employee.departmentId),
				}));

				await onEmployeesUpload(formattedData); // Call the function passed via props

				alert(`Success: Employees uploaded successfully!`);
			} catch (error) {
				handleUploadError(error);
			} finally {
				setFile(null); // Clear file selection after processing
			}
		};

		reader.readAsArrayBuffer(file);
	};

	const handleUploadError = (error) => {
		if (error.response) {
			switch (error.response.status) {
				case 409:
					alert(
						"Conflict Error: The employee data you're trying to upload may already exist."
					);
					break;
				case 500:
					alert(
						"Server Error: There might be an issue with the server. Please try again later."
					);
					break;
				default:
					alert(
						`Error: ${
							error.response.data.message || "Failed to register employee."
						}`
					);
			}
		} else if (error.request) {
			alert("No response from server: Please try again later.");
		} else if (error.code === "ERR_NETWORK") {
			alert("Network Error: Please check your connection or try again later.");
		} else {
			alert(`Error: ${error.message}`);
		}
	};

	return (
		<div>
			<h3>Upload Employees</h3>
			<input type="file" onChange={handleFileUpload} accept=".xlsx, .xls" />
			<button
				onClick={handleSubmit}
				disabled={!file}
				className="bg-linear-blue py-2 px-6 rounded-md"
			>
				Submit
			</button>
		</div>
	);
};

export default EmployeeUpload;
