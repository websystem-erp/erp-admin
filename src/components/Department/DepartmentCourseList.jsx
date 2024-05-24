import React, { useState } from "react";

const DepartmentCourseList = ({ programs }) => {
	const [selected, setSelected] = useState(null);

	const handleClick = (index) => {
		setSelected(selected !== index ? index : null);
	};

	return (
		<div className="mb-12 w-full py-10 flex justify-center items-center">
			<div className="container">
				<div className="flex justify-center items-center px-6 py-3 border-b-2 border-gray-200 bg-gray-100 text-center text-sm md:text-base font-semibold text-gray-600 uppercase">
					<h5 className="w-full text-center">Course</h5>
					<h5 className="w-full text-center">Course Code</h5>
					<h5 className="w-full text-center">Duration</h5>
					<h5 className="w-full text-center">Fees</h5>
					<h5 className="w-5 text-center"></h5>
				</div>
				{programs.map((program, index) => (
					<div
						key={program.id}
						className="bg-white w-full border border-gray-200"
					>
						<ul className="shadow-box">
							<li className="relative border-b border-gray-200">
								<button
									type="button"
									className="w-full px-6 py-6 text-left"
									onClick={() => handleClick(index)}
								>
									<div className="flex items-center justify-between">
										<p className="w-full text-center">{program.name}</p>
										<p className="w-full text-center">{program.code}</p>
										<p className="w-full text-center">3 Months</p>
										<p className="w-full text-center">₹ 14,000</p>
										<div className="w-5">
											<svg
												className={`w-5 h-5 text-gray-500 transition-transform duration-300 ${
													selected === index ? "transform rotate-180" : ""
												}`}
												fill="none"
												strokeLinecap="round"
												strokeLinejoin="round"
												strokeWidth={2}
												viewBox="0 0 24 24"
												stroke="currentColor"
											>
												<path d="M19 9l-7 7-7-7" />
											</svg>
										</div>
									</div>
								</button>
								<div
									className="relative overflow-hidden transition-all duration-700"
									style={{
										maxHeight: selected === index ? "none" : "0",
									}}
								>
									<div className="px-6 pb-6">
										<p>Subjects:</p>
										<ul>
											{program.subjects.map((subject) => (
												<li key={subject.id}>{subject.subjectName}</li>
											))}
										</ul>
									</div>
								</div>
							</li>
						</ul>
					</div>
				))}
			</div>
		</div>
	);
};

export default DepartmentCourseList;
