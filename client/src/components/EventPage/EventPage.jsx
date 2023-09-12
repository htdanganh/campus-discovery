import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getEvent } from "../../actions/event.actions";
import { useEffect } from "react";
import { useParams } from "react-router-dom";
import Navbar from "../Navbar/Navbar";
import styles from "../../styles";
import { addAttendee, removeAttendee } from "../../actions/event.actions";
import { getUserList } from "../../actions/user.actions";
import times from "../../assets/times.svg";
import EventMap from "../EventMap/EventMap";

const EventPage = () => {
	const dispatch = useDispatch();
	const currentEvent = useSelector((state) => state.event.currentEvent);
	const user = useSelector((state) => state.auth.user);
	const userList = useSelector((state) => state.user.users);
	const { eventId } = useParams();
	const [showModal, setShowModal] = useState(false);

	useEffect(() => {
		dispatch(getEvent(eventId));
	}, []);

	useEffect(() => {
		if (currentEvent) {
			dispatch(getUserList(currentEvent.attendeeList));
		}
	}, [currentEvent]);

	const handleRsvp = () => {
		dispatch(addAttendee(eventId, user.id));
	};
	const handleUnRsvp = () => {
		dispatch(removeAttendee(eventId, user.id));
	};
	const handleRemove = (userId) => {
		if (currentEvent.author.id === user.id) {
			dispatch(removeAttendee(eventId, userId));
		}
	};

	const render = () => {
		if (currentEvent) {
			return (
				<div className="bg-primary w-full h-screen flex justify-center">
					<div className={`${styles.boxWidth}`}>
						<div className="tdark-gray flex flex-col justify-center items-center">
							<h1 className="text-blue text-2xl font-bold">
								{currentEvent.title}
							</h1>
							<p>{currentEvent.author.name}</p>
							<p>{currentEvent.description}</p>
							<p>{currentEvent.location.name}</p>
							<p>
								{new Date(currentEvent.time).toLocaleString(
									"en-US"
								)}
							</p>
							<p>
								<>{`Guest Capacity: ${currentEvent.guestCapacity}`}</>
							</p>
							<p>
								{currentEvent.attendeeList.length == 1 ? (
									<>{`${currentEvent.attendeeList.length} Attendee`}</>
								) : (
									<>{`${currentEvent.attendeeList.length} Attendees`}</>
								)}
							</p>
							{!currentEvent.attendeeList.includes(user.id) ? (
								<button
									className="px-2 py-1 min-h-2 rounded-lg bg-blue text-white border-none"
									onClick={handleRsvp}
								>
									RSVP
								</button>
							) : (
								<>
									<p>Attending!</p>
									<button
										className="px-2 py-1 min-h-2 rounded-lg bg-red text-white border-none"
										onClick={handleUnRsvp}
									>
										Un-RSVP
									</button>
								</>
							)}
							<div className="m-auto">
								<button
									type="button"
									onClick={() => setShowModal(true)}
									className="px-3 py-1 text-white bg-blue rounded-lg"
								>
									View Attendee List
								</button>
							</div>
							<div className="w-[30rem] h-[30rem]">
								{currentEvent ? (
									<EventMap
										events={[currentEvent]}
										zoom={17}
									/>
								) : (
									"Loading"
								)}
							</div>
							{showModal ? (
								<>
									<div className="justify-center items-center flex overflow-x-hidden overflow-y-auto fixed inset-0 z-50 outline-none focus:outline-none">
										<div className="relative w-auto my-6 mx-auto max-w-3xl">
											<div className="border-0 rounded-lg shadow-lg relative flex flex-col w-full bg-white outline-none focus:outline-none">
												<div className="flex items-start bg-blue/40 justify-between p-5 rounded-t">
													<h3 className="text-xl text-black font-semibold">
														Attendee List
													</h3>
												</div>
												<div className="modal-body text-gray-dark bg-blue/40 relative p-4">
													<ul>
														{userList &&
														userList.length > 0 ? (
															userList.map(
																(userData) => (
																	<div
																		key={
																			userData._id
																		}
																		className="flex justify-center items-center"
																	>
																		<li>
																			{
																				userData.name
																			}
																		</li>
																		{currentEvent
																			.author
																			.id ==
																		user.id ? (
																			<img
																				src={
																					times
																				}
																				className="h-5 w-5 cursor-pointer"
																				onClick={() => {
																					handleRemove(
																						userData._id
																					);
																				}}
																			/>
																		) : (
																			<div className="h-5 w-5 text-black" />
																		)}
																	</div>
																)
															)
														) : (
															<div className="flex justify-center">
																no attendees
																{" :( "}
															</div>
														)}
													</ul>
												</div>
												<div className="flex items-center bg-blue/40 justify-end p-1 rounded-b text-red">
													<button
														className="text-red-500 background-blue font-bold uppercase px-6 py-2 text-sm outline-none focus:outline-none mr-1 mb-1 ease-linear transition-all duration-150"
														type="button"
														onClick={() =>
															setShowModal(false)
														}
													>
														Close
													</button>
												</div>
											</div>
										</div>
									</div>
									<div className="opacity-25 fixed inset-0 z-40 bg-black"></div>
								</>
							) : null}
						</div>
					</div>
				</div>
			);
		} else {
			return <div>Loading.</div>;
		}
	};

	return (
		<>
			<Navbar />
			{render()}
		</>
	);
};

export default EventPage;
