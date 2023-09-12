import mongoose from "mongoose";
import User from "./user.model.js";
import Role from "./role.model.js";
import Event from "./event.model.js";

mongoose.Promise = global.Promise;

export const db = {
	mongoose: mongoose,
	user: User,
	role: Role,
	ROLES: ["student", "teacher", "organizer", "admin"],
	event: Event,
};
