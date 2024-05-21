import React from "react";
import ListTableBtn from "./ListTableBtn";

const ListTable = ({
	pageTitle,
	ListName,
	ListRole,
	ListID,
	ListAction,
	showDataList,
}) => {
	return (
		<>
			<div className="bg-white p-8 rounded-md w-fit sm:w-full">
				<div className="flex items-center justify-between pb-6">
					<div>
						<h2 className="text-gray-600 font-semibold">{pageTitle}</h2>
					</div>
					<div className="flex items-center justify-between">
						<div className="flex flex-col gap-2">
							<ListTableBtn
								text={"Add Data"}
								buttonColor={"bg-linear-green"}
								borderRadius={"rounded"}
							/>
							<ListTableBtn
								text={"Delete"}
								buttonColor={"bg-linear-red"}
								borderRadius={"rounded"}
							/>
						</div>
					</div>
				</div>
				<div>
					<div className="-mx-4 sm:-mx-8 px-4 sm:px-8 py-4 overflow-x-auto">
						<div className="inline-block min-w-full shadow rounded-lg overflow-hidden">
							<table className="min-w-full leading-normal table-auto table-styling">
								<thead>
									<tr>
										<th className="px-2 py-3 border-b-2 border-gray-200 bg-gray-100 text-center text-sm md:text-base font-semibold text-gray-600 uppercase tracking-wider">
											{ListName}
										</th>
										<th className="px-2 py-3 border-b-2 border-gray-200 bg-gray-100 text-center text-sm md:text-base font-semibold text-gray-600 uppercase tracking-wider">
											{ListRole}
										</th>
										<th className="px-2 py-3 border-b-2 border-gray-200 bg-gray-100 text-center text-sm md:text-base font-semibold text-gray-600 uppercase tracking-wider">
											{ListID}
										</th>
										<th className="px-2 py-3 border-b-2 border-gray-200 bg-gray-100 text-center text-sm md:text-base font-semibold text-gray-600 uppercase tracking-wider">
											{ListAction}
										</th>
									</tr>
								</thead>
								<tbody>{showDataList}</tbody>
							</table>
							<div className="px-5 py-5 bg-white border-t flex flex-col xs:flex-row items-center xs:justify-between">
								<span className="text-xs xs:text-sm text-gray-900">
									Showing 1 to 4 of 50 Entries
								</span>
								<div className="inline-flex mt-2 xs:mt-0">
									<ListTableBtn
										text={"prev"}
										buttonColor={"bg-linear-blue"}
										borderRadius={"rounded-l"}
									/>
									<ListTableBtn
										text={"Next"}
										buttonColor={"bg-linear-blue"}
										borderRadius={"rounded-r"}
									/>
								</div>
							</div>
						</div>
					</div>
				</div>
			</div>
		</>
	);
};

export default ListTable;
