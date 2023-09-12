import Event from "../models/event.model.js";
import User from "../models/user.model.js";
import mongoose from "mongoose";

// Get Requests
export const getEvent = (req, res) => {
	const { eventId } = req.params;

	// Check if event exists
	if (!mongoose.Types.ObjectId.isValid(eventId)) {
		res.status(404).send({ message: `No event with id: ${eventId}` });
		return;
	}

	Event.findById(eventId, (err, event) => {
		if (err) {
			res.status(500).send({ message: err });
			return;
		} else {
			res.status(200).send({ message: "Get event success.", event });
			return;
		}
	});
};

export const getAllEvents = (req, res) => {
	Event.find({}, (err, events) => {
		if (err) {
			res.status(500).send({ message: err });
			return;
		} else {
			res.status(200).send({
				message: "Get all events success.",
				events: Array.isArray(events) ? events : [events],
			});
		}
	});
};

export const getUserEvents = (req, res) => {
	// Check for user exists to be implmented in the future as time budget for sprint 2 is tight
	const { userId } = req.params;
	const author = {};

	User.findById(userId, (err, user) => {
		if (err) {
			res.status(500).send({ message: err });
			return;
		} else {
			author = {
				id: user._id,
				name: user.name,
				username: user.usrname,
			};
		}
	});

	Event.find({ author: author }, (err, events) => {
		if (err) {
			res.status(500).send({ message: err });
			return;
		} else {
			res.status(200).send({
				message: `Get events for user ${req.body.auther.id} success.`,
				events,
			});
		}
	});
};

export const getEventsWithTags = (req, res) => {
	// Check for tag validity to be implmented in the future as time budget for sprint 2 is tight

	Event.find({ tags: req.body.tags }, (err, events) => {
		if (err) {
			res.status(500).send({ message: err });
			return;
		} else {
			res.status(200).send({
				message: `Get events for user ${req.body.auther.id} success.`,
				events,
			});
		}
	});
};

// Post Requests
export const createEvent = (req, res) => {
	// Create new document
	const event = new Event({
		title: req.body.title,
		description: req.body.description,
		location: req.body.location,
		time: req.body.time,
		guestCapacity: req.body.guestCapacity,
		tags: req.body.tags,
		author: req.body.author,
		createdAt: req.body.createdAt,
		whitelist: req.body.whitelist,
	});

	// Save document to database
	event.save((err, event) => {
		if (err) {
			res.status(500).send({ message: err });
			return;
		} else {
			res.status(201).send({
				message: "Event creation success.",
				_id: event._id,
			});
		}

		// Checks to be implmented in the future as time budget for sprint 2 is tight
		if (req.body.author) {
			// Check if author is valid
		}

		if (req.body.tags) {
			// Check if tags are valid
		}

		if (req.body.location) {
			// check if location is valid
		}

		if (req.body.guestCapacity) {
			//check if guest capacity is valid
		}

		if (req.body.time || req.body.createAt) {
			// Check if times are valid
		}
	});
};

// Patch Requests
export const updateEvent = (req, res) => {
	const { eventId } = req.params;

	// Check if event exists
	if (!mongoose.Types.ObjectId.isValid(eventId)) {
		res.status(404).send({ message: `No event with id: ${eventId}` });
		return;
	}
	Event.findByIdAndUpdate(eventId, req.body, (err, event) => {
		if (err) {
			res.status(500).send({ message: err });
		} else {
			res.status(204).send({
				message: "Event update success.",
				_id: event._id,
			});
		}

		// Checks to be implmented in the future as time budget for sprint 2 is tight
	});
};

// Delete Requests
export const deleteEvent = (req, res) => {
	const { eventId } = req.params;

	// Check if event exists
	if (!mongoose.Types.ObjectId.isValid(eventId)) {
		res.status(404).send({ message: `No event with id: ${eventId}` });
		return;
	}

	Event.findByIdAndDelete(eventId, (err, event) => {
		if (err) {
			res.status(500).send({ message: err });
			return;
		} else {
			res.status(200).send({
				message: "Event deletion successful.",
				event,
			});
		}
	});
};

export const addAttendee = (req, res) => {
	const { eventId } = req.params;

	// Check if event exists
	if (!mongoose.Types.ObjectId.isValid(eventId)) {
		res.status(404).send({ message: `No event with id: ${eventId}` });
		return;
	}

	Event.findByIdAndUpdate(
		eventId,
		{ $push: { attendeeList: req.body.userId } },
		(err, event) => {
			if (err) {
				res.status(500).send({ message: err });
				return;
			} else {
				User.findByIdAndUpdate(
					req.body.userId,
					{
						$push: { attendingList: event._id },
					},
					(err, user) => {
						if (err) {
							res.status(500).send({ message: err });
							return;
						} else {
							res.status(204).send({
								message: `Attendee ${user._id} added succesfully.`,
							});
							return;
						}
					}
				);
				return;
			}
		}
	);
};

export const removeAttendee = (req, res) => {
	const { eventId } = req.params;

	// Check if event exists
	if (!mongoose.Types.ObjectId.isValid(eventId)) {
		res.status(404).send({ message: `No event with id: ${eventId}` });
		return;
	}

	Event.findByIdAndUpdate(
		eventId,
		{ $pull: { attendeeList: req.body.userId } },
		(err, event) => {
			if (err) {
				res.status(500).send({ message: err });
				return;
			} else {
				User.findByIdAndUpdate(
					req.body.userId,
					{
						$pull: { attendingList: event._id },
					},
					(err, user) => {
						if (err) {
							res.status(500).send({ message: err });
							return;
						} else {
							res.status(204).send({
								message: `Attendee ${user._id} added succesfully.`,
							});
							return;
						}
					}
				);
				return;
			}
		}
	);
};
