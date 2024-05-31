import React, { useState } from "react";
import { Icon } from "@iconify/react";
import EditableField from "./EditableField";
import IconDropDown from "../List/IconDropDown";

const DepartmentCourseCard = ({
	courseName,
	courseCode,
	price,
	duration,
	subjectName,
	subjectCode,
	totalLecture,
}) => {
	const [currentSubjectName, setCurrentSubjectName] = useState(subjectName);
	const [currentSubjectCode, setCurrentSubjectCode] = useState(subjectCode);
	const [currentTotalLecture, setCurrentTotalLecture] = useState(totalLecture);

	return (
		<div className="w-full md:w-1/2 p-4">
			<div className="flex">
				<div className="flex flex-col justify-between bg-linear-blue p-4 rounded-s-2xl">
					<div className="mb-8">
						<h6 className="text-white text-xs tracking-widest">COURSE</h6>
						<h2 className="text-white font-bold text-2xl max-w-52 w-[8vw]">
							{courseName}
						</h2>
						<h5>{courseCode}</h5>
					</div>
					<div className="flex space-x-4 text-white">
						<p className="text-sm w-fit">{price}</p>
						<p className="text-sm w-fit">{duration}</p>
					</div>
				</div>
				<div className="p-4 w-full bg-linear-black rounded-e-lg relative">
					<IconDropDown
						items={
							<>
								<a
									className="flex items-center gap-x-3.5 py-2 px-3 rounded-lg text-sm text-gray-800 hover:bg-lime-600 focus:outline-none focus:bg-gray-100 w-full"
									href="#"
								>
									Edit
								</a>
								<a
									className="flex items-center gap-x-3.5 py-2 px-3 rounded-lg text-sm text-red-800 hover:bg-red-300 focus:outline-none focus:bg-gray-100 w-full"
									href="#"
								>
									Delete
								</a>
							</>
						}
					/>
					<h4 className="text-center text-lg font-bold text-white p-2">
						Subjects
					</h4>
					<div className="flex flex-col flex-wrap border w-fit p-4">
						<EditableField
							label="Subject Name"
							value={currentSubjectName}
							onSave={setCurrentSubjectName}
						/>
						<EditableField
							label="Subject Code"
							value={currentSubjectCode}
							onSave={setCurrentSubjectCode}
						/>
						<EditableField
							label="Total Lectures"
							value={currentTotalLecture}
							onSave={setCurrentTotalLecture}
							type="number"
						/>
					</div>
				</div>
			</div>
		</div>
	);
};

export default DepartmentCourseCard;
