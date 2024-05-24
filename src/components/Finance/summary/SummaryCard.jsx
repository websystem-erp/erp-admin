import React from "react";
import { Icon } from "@iconify/react";

const SummaryCard = () => {
	return (
		<>
			<div className=" p-4 flex justify-center items-center flex-col bg-white rounded-2xl">
				<div className="px-4 w-full lg:w-fit flex flex-col">
					<button className="px-4 py-2 bg-linear-blue rounded-full my-2 w-full">
						Fees Reminder
					</button>
					<button className="px-4 py-2 bg-linear-blue rounded-full my-2">
						Expenses
					</button>
					<button className="px-4 py-2 bg-linear-blue rounded-full my-2">
						Due Payment
					</button>
				</div>
			</div>
		</>
	);
};

export default SummaryCard;
