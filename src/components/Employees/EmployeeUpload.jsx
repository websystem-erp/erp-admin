import React from "react";
import * as XLSX from "xlsx";

const EmployeeUpload = ({ onEmployeesUpload }) => {
	const handleFileUpload = (event) => {
		const file = event.target.files[0];
		const reader = new FileReader();

		reader.onload = (e) => {
			const data = new Uint8Array(e.target.result);
			const workbook = XLSX.read(data, { type: "array" });
			const sheetName = workbook.SheetNames[0];
			const worksheet = workbook.Sheets[sheetName];
			const json = XLSX.utils.sheet_to_json(worksheet);

			console.log("Uploaded Data:", json);

			if (onEmployeesUpload) {
				onEmployeesUpload(json);
			}
		};

		reader.readAsArrayBuffer(file);
	};

	return (
		<div>
			<h3>Upload Employees</h3>
			<input type="file" onChange={handleFileUpload} accept=".xlsx, .xls" />
		</div>
	);
};

export default EmployeeUpload;
