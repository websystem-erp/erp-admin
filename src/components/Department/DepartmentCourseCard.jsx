import React from "react";

const DepartmentCourseCard = ({
	courseName,
	courseCode,
	price,
	duration,
	subjects,
}) => {
	return (
		<div className="w-1/2 px-2">
			<div className="flex bg-linear-black w-full rounded-lg my-2">
				<div className="bg-linear-blue w-fit min-w-[200px] p-4 rounded-lg flex justify-between items-center flex-col">
					<div>
						<h6 className="text-[10px] mt-2 tracking-widest">COURSE</h6>
						<h2 className="font-bold text-xl max-w-52">{courseName}</h2>
						<h6 className="text-[10px] mb-2 tracking-widest">{courseCode}</h6>
					</div>
					<div className="flex mt-8 w-full justify-between items-center">
						<h5 className="font-semibold w-full text-start max-w-20">
							{price}
						</h5>
						<h5 className="font-semibold w-full text-end max-w-20">
							{duration}
						</h5>
					</div>
				</div>
				<div className="flex w-full justify-center items-center">
					<div className="px-5 w-full flex flex-col justify-center items-center">
						<h3 className="mb-4 text-center font-bold text-md">Subjects</h3>
						<div className="flex flex-wrap w-full text-center">
							{subjects.map((subject, index) => (
								<p key={index} className="w-1/2">
									{subject.subjectName}
								</p>
							))}
						</div>
					</div>
				</div>
			</div>
		</div>
	);
};

export default DepartmentCourseCard;
