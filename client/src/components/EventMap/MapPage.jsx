import React, { useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import ReactSelect from "react-select";
import Navbar from "../Navbar/Navbar";
import EventMap from "./EventMap";
import { getAllEvents } from "../../actions/event.actions";

const MapPage = () => {
	const dispatch = useDispatch();
	const events = useSelector((state) => state.event.events);

	useEffect(() => {
		dispatch(getAllEvents());
	}, []);

	const [filter, setFilter] = useState(null);

	const withinDays = (date, daysWithin) => {
		const now = new Date();
		return (
			Math.abs(date.getTime() - now.getTime()) / (24 * 60 * 60 * 1000) <
			daysWithin
		);
	};

	const options = [
		{ value: (event) => event, label: "No Filter" },
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
		<div>
			<Navbar />
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
			<hr className="mb-3" />
			<div className="w-full h-[100vh]">
				{events && events.length > 0 ? (
					<EventMap
						events={events}
						useGeocode={true}
						filter={filter ? filter.value : null}
						useFilter={filter ? true : false}
					/>
				) : (
					"Loading"
				)}
			</div>
		</div>
	);
};

export default MapPage;
