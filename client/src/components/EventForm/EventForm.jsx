import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { createEvent, updateEvent } from "../../actions/event.actions";
import { useParams } from "react-router-dom";
import { getEvent } from "../../actions/event.actions";
import { Formik, Form, Field, ErrorMessage } from "formik";
import TimeField from "./TimeField";
import WhitelistField from "./WhitelistField";
import LocationField from "./LocationPicker/LocationField";

const EventForm = () => {
	const dispatch = useDispatch();
	const user = useSelector((state) => state.auth.user);
	const currentEvent = useSelector((state) => state.event.currentEvent);
	const { eventId } = useParams();

	const [startValues, setStartValues] = useState({
		title: "",
		description: "",
		location: "",
		time: new Date(),
		author: {
			id: user.id,
			name: user.name,
			title: user.title,
		},
		guestCapacity: "",
		whitelist: [],
	});
	const [firstLoad, setFirstLoad] = useState(true);
	const [showModal, setShowModal] = useState(false);

	useEffect(() => {
		if (eventId) {
			dispatch(getEvent(eventId));
		}
	}, []);

	useEffect(() => {
		if (currentEvent && firstLoad) {
			setStartValues({
				title: currentEvent.title,
				description: currentEvent.description,
				location: currentEvent.location,
				time: currentEvent.time,
				author: {
					id: currentEvent.author.id,
					name: currentEvent.author.name,
					title: currentEvent.author.title,
				},
				guestCapacity: currentEvent.guestCapacity,
			});
			setFirstLoad(false);
		}
	}, [currentEvent, firstLoad]);

	const handleSubmit = (values) => {
		const data = {
			...values,
			whitelist:
				values.whitelist && values.whitelist.length > 0
					? values.whitelist.map((option) => option.value)
					: [],
		};
		if (currentEvent) {
			dispatch(updateEvent(currentEvent._id, data))
				.then((res) => {
					window.location.href = "/dashboard";
				})
				.catch((err) => {
					console.log(err);
				});
		} else {
			dispatch(createEvent(data))
				.then((res) => {
					window.location.href = "/dashboard";
				})
				.catch((err) => {
					console.log(err);
				});
		}
		setShowModal(false);
	};

	const handleValidate = (values) => {
		const errors = {};
		if (!values.title) {
			errors.title = "Title of event is required!";
		}
		if (!values.description) {
			errors.description = "Description of event is required!";
		}
		if (!values.location) {
			errors.location = "Location of event is required!";
		}
		if (!values.time) {
			errors.time = "Date/time of event is required!";
		}
		if (!values.guestCapacity) {
			errors.guestCapacity = "Guest capacity of event is required!";
		}
		return errors;
	};

	return (
		<div className="bg-primary w-full h-screen flex justify-center items-center">
			<Formik
				initialValues={startValues}
				validate={handleValidate}
				onSubmit={handleSubmit}
				enableReinitialize={true}
			>
				<Form className="flex flex-col w-72 bg-gray-light rounded-lg p-5">
					<h1 className="text-xl text-gray-dark font-extrabold">
						{eventId ? "Update Event" : "Create Event"}
					</h1>
					<label htmlFor="title" className="text-gray">
						Title
					</label>
					<Field
						id="title"
						name="title"
						className="my-1 px-1 py-0.5 border border-gray-700 rounded-md"
					/>
					<ErrorMessage
						name="title"
						component="div"
						className="text-red"
					/>

					<label htmlFor="description" className="text-gray">
						Description
					</label>
					<Field
						as="textarea"
						rows="4"
						id="description"
						name="description"
						className="my-1 px-1 py-0.5 border border-gray-700 rounded-md"
					/>
					<ErrorMessage
						name="description"
						component="div"
						className="text-red"
					/>

					<label htmlFor="location" className="text-gray">
						Location
					</label>
					{/* <Field
						id="location"
						name="location"
						className="my-1 px-1 py-0.5 border border-gray-700 rounded-md"
					/> */}
					<LocationField id="location" name="location" />
					<ErrorMessage
						name="location"
						component="div"
						className="text-red"
					/>

					<label htmlFor="time" className="text-gray">
						Date and Time
					</label>
					<div className="my-1 px-1 py-0.5 bg-white border border-gray-700 rounded-md">
						<TimeField id="time" name="time" />
					</div>
					<ErrorMessage
						name="time"
						component="div"
						className="text-red"
					/>

					<label htmlFor="guestCapacity" className="text-gray">
						Guest Capacity
					</label>
					<Field
						id="guestCapacity"
						name="guestCapacity"
						className="my-1 px-1 py-0.5 border border-gray-700 rounded-md"
					/>
					<ErrorMessage
						name="guestCapacity"
						component="div"
						className="text-red"
					/>

					<label htmlFor="guestCapacity" className="text-gray">
						Invite Users
					</label>
					<WhitelistField
						id="whitelist"
						name="whitelist"
						className="border border-gray-dark rounded-md"
					/>
					<ErrorMessage
						name="whitelist"
						component="div"
						className="text-red"
					/>

					<div className="m-auto">
						<button
							type="button"
							onClick={() => setShowModal(true)}
							className="mt-3 px-3 py-1 text-white bg-blue rounded-lg"
						>
							Submit
						</button>
					</div>
					{showModal ? (
						<>
							<div className="justify-center items-center flex overflow-x-hidden overflow-y-auto fixed inset-0 z-50 outline-none focus:outline-none">
								<div className="relative w-auto my-6 mx-auto max-w-3xl">
									{/*content*/}
									<div className="border-0 rounded-lg shadow-lg relative flex flex-col w-full bg-white outline-none focus:outline-none">
										{/*header*/}
										<div className="flex items-start justify-between p-5 border-b border-solid border-slate-200 rounded-t">
											<h3 className="text-3xl font-semibold">
												Confirm Changes?
											</h3>
											<button
												className="p-1 ml-auto bg-transparent border-0 text-black opacity-5 float-right text-3xl leading-none font-semibold outline-none focus:outline-none"
												onClick={() =>
													setShowModal(false)
												}
											>
												<span className="bg-transparent text-black opacity-5 h-6 w-6 text-2xl block outline-none focus:outline-none">
													×
												</span>
											</button>
										</div>
										<div className="flex items-center justify-end p-6 border-t border-solid border-slate-200 rounded-b">
											<button
												className="text-red-500 background-transparent font-bold uppercase px-6 py-2 text-sm outline-none focus:outline-none mr-1 mb-1 ease-linear transition-all duration-150"
												type="button"
												onClick={() =>
													setShowModal(false)
												}
											>
												Close
											</button>
											<button
												className="bg-slate-500 text-white active:bg-slate-600 font-bold uppercase text-sm px-6 py-3 rounded shadow hover:shadow-lg outline-none focus:outline-none mr-1 mb-1 ease-linear transition-all duration-150"
												type="submit"
											>
												Save Changes
											</button>
										</div>
									</div>
								</div>
							</div>
							<div className="opacity-25 fixed inset-0 z-40 bg-black"></div>
						</>
					) : null}
				</Form>
			</Formik>
		</div>
	);
};

export default EventForm;
