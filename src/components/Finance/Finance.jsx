import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import Summary from "./Summary";
import Transactions from "./Transactions";
import StudentFees from "./StudentFees";
import Payroll from "./Payroll";

const Finance = () => {
	const tabs = ["Summary", "Transactions", "student-fees", "Payroll"];
	const [activeTab, setActiveTab] = useState("Summary");

	const handleTabClick = (tab) => {
		setActiveTab(tab);
	};

	// Set "Summary" as active tab when Finance component mounts
	useEffect(() => {
		handleTabClick("Summary");
	}, []); // Empty dependency array ensures the effect runs only once when component mounts

	return (
		<>
			<h3 className="font-bold text-2xl">Finance</h3>
			<div className="flex my-8">
				{tabs.map((tab, ind) => {
					return (
						<Link
							key={ind}
							to={`/Finance/${tab.toLowerCase()}`}
							onClick={() => handleTabClick(tab)}
							className={`border-2 rounded-full cursor-pointer px-4 py-2 mx-2 ${
								activeTab === tab ? "active" : ""
							}`}
						>
							{tab}
						</Link>
					);
				})}
			</div>
			<div>
				{/* Render content based on activeTab */}
				{activeTab === "Summary" && <Summary />}
				{activeTab === "Transactions" && <Transactions />}
				{activeTab === "student-fees" && <StudentFees />}
				{activeTab === "Payroll" && <Payroll />}
			</div>
		</>
	);
};

export default Finance;
