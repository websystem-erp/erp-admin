import React from "react";
import ListTableBtn from "./ListTableBtn";

const CommonTable = ({ profile, name, role, id }) => {
	return (
		<>
			<tr>
				<td className="px-2 py-5 bg-white text-sm md:text-base">
					<div className="flex justify-center items-center">
						<div className="flex-shrink-0 w-10 h-10 rounded-full overflow-hidden">
							<img className="" src={profile} alt="" />
						</div>
						<div className="ml-3">
							<p className="text-gray-900 whitespace-no-wrap">{name}</p>
						</div>
					</div>
				</td>
				<td className="px-2 py-5 bg-white text-center text-sm md:text-base">
					<p className="text-gray-900 whitespace-no-wrap">{role}</p>
				</td>
				<td className="px-2 py-5 bg-white text-center text-sm md:text-base">
					<p className="text-gray-900 whitespace-no-wrap">{id}</p>
				</td>
				<td className="px-2 py-5 bg-white text-center text-sm md:text-base">
					<ListTableBtn
						text={"Action"}
						buttonColor={"bg-linear-green"}
						borderRadius={"rounded"}
					/>
				</td>
			</tr>
		</>
	);
};

export default CommonTable;
