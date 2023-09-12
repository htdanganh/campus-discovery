import dotenv from "dotenv";
import jwt from "jsonwebtoken";
import bcrypt from "bcryptjs";
import User from "../models/user.model.js";
import Role from "../models/role.model.js";
// import { db } from "../models/index.js";

dotenv.config();
const JWT_SECRET = process.env.JWT_SECRET;

export const signUp = (req, res) => {
	const user = new User({
		name: req.body.name,
		username: req.body.username,
		password: bcrypt.hashSync(req.body.password, 8),
	});

	user.save((err, user) => {
		if (err) {
			res.status(500).send({ message: err });
			return;
		}

		if (req.body.roles) {
			Role.find(
				{
					name: { $in: req.body.roles },
				},
				(err, roles) => {
					if (err) {
						res.status(500).send({ message: err });
						return;
					}

					user.roles = roles.map((role) => role._id);
					user.save((err) => {
						if (err) {
							res.status(500).send({ message: err });
						}

						res.send({ message: "User registration success." });
					});
				}
			);
		} else {
			Role.findOne({ name: "student" }, (err, role) => {
				if (err) {
					res.status(500).send({ message: err });
					return;
				}

				user.roles = [role._id];
				user.save((err) => {
					if (err) {
						res.status(500).send({ message: err });
					}

					res.send({ message: "User registration success." });
				});
			});
		}
	});
};

export const signIn = (req, res) => {
	User.findOne({
		username: req.body.username,
	})
		.populate("roles", "-__v")
		.exec((err, user) => {
			if (err) {
				res.status(500).send({ message: err });
				return;
			}

			if (!user) {
				res.status(404).send({ message: "User not found." });
				return;
			}

			var passwordIsValid = bcrypt.compareSync(
				req.body.password,
				user.password
			);

			if (!passwordIsValid) {
				return res.status(401).send({
					accessToken: null,
					message: "Invalid Password.",
				});
			}

			var token = jwt.sign({ id: user.id }, JWT_SECRET, {
				expiresIn: 86400, // 24 Hours
			});

			var authorities = [];

			for (let i = 0; i < user.roles.length; i++) {
				authorities.push(user.roles[i].name);
			}

			res.status(200).send({
				id: user._id,
				name: user.name,
				username: user.username,
				roles: authorities,
				accessToken: token,
			});
		});
};
