import jwt from "jsonwebtoken";
import dotenv from "dotenv";
import { db } from "../models/index.js";
import mongoose from "mongoose";

dotenv.config();
const JWT_SECRET = process.env.JWT_SECRET;

const User = db.user;
const Role = db.role;
const Event = db.event;

const verifyToken = (req, res, next) => {
	let token = req.headers["x-access-token"];

	if (!token) {
		return res.status(403).send({
			message: "Request did not contain a token for authentication.",
		});
	}

	jwt.verify(token, JWT_SECRET, (err, decoded) => {
		if (err) {
			return res.status(401).send({ message: "Authentication failed." });
		}
		req.userId = decoded.id;
		next();
	});
};

const isAdmin = (req, res, next) => {
	User.findById(req.userId, (err, user) => {
		if (err) {
			res.status(500).send({ message: err });
			return;
		}

		Role.find(
			{
				_id: { $in: user.roles },
			},
			(err, roles) => {
				if (err) {
					res.status(500).send({ message: err });
					return;
				}

				for (let i = 0; i < roles.length; i++) {
					if (roles[i].name === "admin") {
						next();
						return;
					}
				}

				res.status(403).send({
					message: "Request requires admin role.",
				});
				return;
			}
		);
	});
};

const isUserEvent = (req, res, next) => {
	const { eventId } = req.params;

	User.findById(req.userId, (err, user) => {
		if (err) {
			res.status(500).send({ message: err });
			return;
		}

		Role.find(
			{
				_id: { $in: user.roles },
			},
			(err, roles) => {
				if (err) {
					res.status(500).send({ message: err });
					return;
				}
				for (let i = 0; i < roles.length; i++) {
					if (roles[i].name == "admin") {
						next();
						return;
					}
				}
				Event.findById(eventId, (err, event) => {
					if (err) {
						res.status(500).send({ message: err });
						return;
					}

					if (event.author.id == req.userId) {
						next();
						return;
					} else {
						res.status(403).send({
							message: "You do not have access to this event.",
						});
						return;
					}
				});
			}
		);
	});
};

const isUserRsvpOrHost = (req, res, next) => {
	const { eventId } = req.params;

	if (req.userId == req.body) {
		next();
		return;
	}

	User.findById(req.userId, (err, user) => {
		if (err) {
			res.status(500).send({ message: err });
			return;
		}

		Role.find(
			{
				_id: { $in: user.roles },
			},
			(err, roles) => {
				if (err) {
					res.status(500).send({ message: err });
					return;
				}
				for (let i = 0; i < roles.length; i++) {
					if (roles[i].name == "admin") {
						next();
						return;
					}
				}
				Event.findById(eventId, (err, event) => {
					if (err) {
						res.status(500).send({ message: err });
						return;
					}

					if (
						event.author.id == req.userId ||
						event.attendeeList.includes(req.userId)
					) {
						next();
						return;
					} else {
						res.status(403).send({
							message: "You do not have access to this event.",
						});
						return;
					}
				});
			}
		);
	});
};

const checkGuestCapacity = (req, res, next) => {
	const { eventId } = req.params;
	Event.findById(eventId, (err, event) => {
		if (err) {
			res.status(500).send({ message: err });
			return;
		}

		if (event.attendeeList.length < event.guestCapacity) {
			next();
			return;
		} else {
			res.status(403).send({
				message: "Event is at capacity.",
			});
			return;
		}
	});
};

const checkWhitelist = (req, res, next) => {
	const { eventId } = req.params;

	Event.findById(eventId, (err, event) => {
		if (err) {
			res.status(500).send({ message: err });
			return;
		}

		if (event.whitelist.length === 0) {
			next();
			return;
		} else {
			if (event.whitelist.includes(req.userId)) {
				next();
				return;
			} else {
				res.status(403).send({
					message:
						"Event is whitelisted and user is not on whitelist.",
				});
				return;
			}
		}
	});
};

export const auth = {
	verifyToken,
	isAdmin,
	isUserEvent,
	isUserRsvpOrHost,
	checkGuestCapacity,
	checkWhitelist,
};
