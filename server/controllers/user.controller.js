import User from "../models/user.model.js";
import mongoose from "mongoose";

export const getUser = (req, res) => {
	const { userId } = req.params;

	User.findById(userId, (err, user) => {
		if (err) {
			res.status(500).send({ message: err });
			return;
		} else {
			res.status(200).send({
				message: "Get all users success.",
				user,
			});
		}
	});
};

export const getUserList = (req, res) => {
	const userList = req.body;

	User.find(
		{
			_id: {
				$in: userList.map((userId) => mongoose.Types.ObjectId(userId)),
			},
		},
		(err, users) => {
			if (err) {
				res.status(500).send({ message: err });
				return;
			} else {
				res.status(200).send({
					message: "Get user list success.",
					users: Array.isArray(users) ? users : [users],
				});
			}
		}
	);
};

export const getAllUsers = (req, res) => {
	User.find({}, (err, users) => {
		if (err) {
			res.status(500).send({ message: err });
			return;
		} else {
			res.status(200).send({
				message: "Get all users success.",
				users,
			});
		}
	});
};
