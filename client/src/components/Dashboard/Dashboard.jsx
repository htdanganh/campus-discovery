import React, { useState } from "react";
import ReactSelect from "react-select";
import Feed from "../Feed/Feed";
import Navbar from "../Navbar/Navbar";
import Sidebar from "./Sidebar";

const Dashboard = () => {
	const [filter, setFilter] = useState(null);

	const withinDays = (date, daysWithin) => {
		const now = new Date();
		return (
			Math.abs(date.getTime() - now.getTime()) / (24 * 60 * 60 * 1000) <
			daysWithin
		);
	};

	const options = [
		{ value: null, label: "No Filter" },
		{
			value: (event) => withinDays(new Date(event.time), 1),
			label: "Today",
		},
		{
			value: (event) => withinDays(new Date(event.time), 7),
			label: "This Week",
		},
		{
			value: (event) => withinDays(new Date(event.time), 30),
			label: "This Month",
		},
		{
			value: (event) =>
				event.location.name ===
				"Klaus Advanced Computing Building (KACB)",
			label: "At Klaus",
		},
	];

	return (
		<section id="dashboard">
			<div className={`w-full flex  flex-wrap justify-center`}>
				<div className="w-full mb-0.5 shadow-md bg-white">
					<Navbar />
				</div>
				<div className="w-2/12 h-screen bg-white">
					<Sidebar />
				</div>
				<div className={`w-10/12 h-screen p-10`}>
					<div className="flex justify-between ml-5">
						<div>
							<h1 className="font-bold text-3xl text-gray-dark">
								Events Around Campus
							</h1>
							<hr className="bg-gray-black" />
						</div>
						<ReactSelect
							className="z-40 w-[10rem]"
							value={filter}
							onChange={(val) => {
								setFilter(() => val);
							}}
							options={options}
							isMulti={false}
							placeholder="filter ..."
						/>
					</div>
					<Feed filter={filter ? filter.value : null} />
				</div>
			</div>
		</section>
	);
};

export default Dashboard;
