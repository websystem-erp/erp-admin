import React from "react";
import ListTableBtn from "./ListTableBtn";

const ListTable = ({
	ListName,
	ListRole,
	ListID,
	ListAction,
	showDataList,
	hide,
}) => {
	return (
		<>
			<div>
				<div>
					<div className="-mx-4 sm:-mx-8 px-4 sm:px-8 py-4 overflow-x-auto">
						<div className="inline-block min-w-full shadow rounded-lg overflow-hidden">
							<table className="min-w-full leading-normal table-auto table-styling">
								<thead>
									<tr>
										<th className="w-fit px-2 py-3 border-b-2 border-gray-200 bg-gray-100 text-center text-sm md:text-base font-semibold text-gray-600 uppercase tracking-wider">
											{ListName}
										</th>
										<th className="w-fit px-2 py-3 border-b-2 border-gray-200 bg-gray-100 text-center text-sm md:text-base font-semibold text-gray-600 uppercase tracking-wider">
											{ListRole}
										</th>
										<th className="w-fit px-2 py-3 border-b-2 border-gray-200 bg-gray-100 text-center text-sm md:text-base font-semibold text-gray-600 uppercase tracking-wider">
											{ListID}
										</th>
										<th className="w-fit px-2 py-3 border-b-2 border-gray-200 bg-gray-100 text-center text-sm md:text-base font-semibold text-gray-600 uppercase tracking-wider">
											{ListAction}
										</th>
									</tr>
								</thead>
								<tbody>{showDataList}</tbody>
							</table>
							<div
								className={`px-5 py-5 bg-white border-t flex flex-col xs:flex-row items-center xs:justify-between ${hide}`}
							>
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
