import React from "react";
import { Icon } from "@iconify/react";

const SummaryCard = () => {
	return (
		<>
			<div className=" p-4 flex justify-center items-center flex-col bg-white rounded-2xl">
				<div className="bg-linear-black p-4 rounded-2xl mb-4 w-full lg:w-fit">
					<div className="w-full ld:w-fit">
						<h4>Bank Account</h4>
						<h6>Yes Bank</h6>
						<p>5294 5195 2317 8840</p>
					</div>
					<button className="flex w-full lg:w-fit justify-center items-center bg-linear-blue px-4 py-2 rounded-full my-4">
						<Icon icon="flowbite:download-solid" height={32} className="me-2" />
						Download Statement
					</button>
				</div>
				<div className="px-4 w-full lg:w-fit flex flex-col">
					<button className="px-4 py-2 bg-linear-blue rounded-full my-2">
						Send Fees Reminder
					</button>
					<button className="px-4 py-2 bg-linear-blue rounded-full my-2">
						Check Expenses
					</button>
					<button className="px-4 py-2 bg-linear-blue rounded-full my-2">
						Pay Due Payment
					</button>
				</div>
			</div>
		</>
	);
};

export default SummaryCard;
