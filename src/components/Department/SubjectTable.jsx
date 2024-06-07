import React from "react";
import SubjectRow from "./SubjectRow";

const SubjectTable = ({
	subjects,
	editingSubjectId,
	subjectFormValues,
	onEditClick,
	onSave,
	onInputChange,
}) => {
	return (
		<div className="">
			<table className="min-w-full divide-y-2 divide-gray-200 bg-white text-sm overflow-hidden rounded-md">
				<thead className="ltr:text-left rtl:text-right bg-linear-blue text-white ">
					<tr>
						<th className="whitespace-nowrap px-4 py-2 font-medium ">
							Subject
						</th>
						<th className="whitespace-nowrap px-4 py-2 font-medium ">Code</th>
						<th className="whitespace-nowrap px-4 py-2 font-medium ">
							Total Lectures
						</th>
						<th className="px-4 py-2"></th>
					</tr>
				</thead>
				<tbody className="divide-y divide-gray-200 text-center">
					{subjects.map((subject) => (
						<SubjectRow
							key={subject.id}
							subject={subject}
							isEditing={editingSubjectId === subject.id}
							subjectFormValues={subjectFormValues}
							onEditClick={onEditClick}
							onSave={onSave}
							onInputChange={onInputChange}
						/>
					))}
				</tbody>
			</table>
		</div>
	);
};

export default SubjectTable;
