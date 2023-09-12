import mongoose from "mongoose";

const eventSchema = mongoose.Schema({
	title: String,
	description: String,
	location: {
		name: { type: String },
		coord: [{ type: Number }],
	},
	time: Date,
	tags: [
		{
			type: mongoose.Schema.Types.ObjectId,
			ref: "Role",
		},
	],
	author: {
		id: {
			type: mongoose.Schema.Types.ObjectId,
			ref: "User",
		},
		name: String,
		username: String,
	},
	createdAt: {
		type: Date,
		default: new Date(),
	},
	attendeeList: [
		{
			type: mongoose.Schema.Types.ObjectId,
			ref: "User",
		},
	],
	whitelist: [
		{
			type: mongoose.Schema.Types.ObjectId,
			ref: "User",
		},
	],
	guestCapacity: Number,
});

const Event = mongoose.model("Event", eventSchema);

export default Event;
