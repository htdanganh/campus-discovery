import React, { useState } from "react";
import { useDispatch } from "react-redux";
import { deleteEvent } from "../../actions/event.actions";
import menu from "../../assets/menu.svg";
import close from "../../assets/close.svg";

const EventCard = ({ event, conflicts }) => {
	const dispatch = useDispatch();
	const [toggle, setToggle] = useState(false);

	const handleDelete = () => {
		dispatch(deleteEvent(event._id));
	};

	return (
		<div className="w-full flex justify-center items-center ">
			<div className="flex justify-between px-3 py-5 rounded-md  bg-white m-5 shadow-md w-full h-full hover:bg-gray-lighter ">
				<div className="px-6 py-4 flex justify-center items-center z-0">
					<a href={`event/${event._id}`}>
						<div className="w-[5rem] h-[5rem] mr-10 rounded-full bg-gray-default" />
					</a>

					<div>
						<a href={`event/${event._id}`}>
							<h1 className="font-bold text-2xl mb-2 text-gray-dark">
								{event.title}
								{conflicts && conflicts.length > 0 ? (
									<span className="text-sm text-orange">
										{" "}
										conflict with {conflicts}
									</span>
								) : null}
							</h1>
						</a>
						<h6 className="text-gray-default">
							{new Date(event.time).toLocaleString("en-US")} @{" "}
							{event.location.name}
							<br />
							{event.description}
							<br />
							posted by {event.author.name}
						</h6>
					</div>
				</div>

				<div className="relative top-3 right-3 w-[2em] h-[2em] flex flex-col items-center z-30">
					<img
						src={toggle ? close : menu}
						alt="options"
						className="w-[28px] h-[28px] object-contain cursor-pointer"
						onClick={() => setToggle((prev) => !prev)}
					/>
					<div
						className={`${
							toggle ? "flex" : "hidden"
						} p-3 mt-2 relative right-6 bg-white shadow-md shadow-gray-default w-[5rem] rounded-md flex flex-col justify-center items-center cursor-default z-0`}
					>
						<ul>
							<li>
								<button
									className="px-1 rounded-lg border-[0.1em] border-gray-dark text-gray-dark w-full my-1"
									onClick={(e) => {
										e.preventDefault;
										window.location.href = `/event/update/${event._id}`;
									}}
								>
									update
								</button>
							</li>
							<li>
								<button
									className="px-1 rounded-lg border-[0.1em] border-gray-dark text-gray-dark w-full my-1"
									onClick={handleDelete}
								>
									delete
								</button>
							</li>
						</ul>
					</div>
				</div>
			</div>
		</div>
	);
};

export default EventCard;
