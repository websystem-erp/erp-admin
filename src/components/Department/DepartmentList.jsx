import React from "react";
import DepartmentCourseCard from "./DepartmentCourseCard";
import { Icon } from "@iconify/react";
import DepartmentForm from "./DepartmentForm"; // Import DepartmentForm

const DepartmentList = ({
	programs,
	handleForm,
	openForm,
	formValues,
	onClose,
	handleInputChange,
	handleSubmit,
	errorMessage,
}) => {
	return (
		<>
			<div className="bg-white p-8 rounded-md w-fit sm:w-full">
				<div className="flex items-center justify-between pb-6">
					<h2 className="text-gray-600 font-semibold">Department</h2>
				</div>
				<div className="">
					<div className="p-4 w-fit text-gray-400 hover:bg-gray-800 rounded-lg m-4">
						<div
							className="border-dashed border-2 w-fit p-4 rounded-lg flex justify-center items-center flex-col cursor-pointer"
							onClick={handleForm}
						>
							<Icon icon="mingcute:add-fill" height={36} />
							<h5 className="font-semibold w-full text-start">
								Add New Course
							</h5>
						</div>
					</div>
					<div className="flex flex-wrap">
						{programs.map((program, index) => (
							<DepartmentCourseCard
								key={index}
								courseName={program.name}
								courseCode={program.code}
								price={"₹ 1,00,000/-"}
								duration={"3 Months"}
								subjects={program.subjects}
								onClick={() =>
									console.log(`Clicked on department ${program.id}`)
								}
							/>
						))}
					</div>
				</div>
			</div>

			{openForm && (
				<DepartmentForm
					formValues={formValues}
					onClose={onClose}
					handleInputChange={handleInputChange}
					handleSubmit={handleSubmit}
					errorMessage={errorMessage}
				/>
			)}
		</>
	);
};

export default DepartmentList;
