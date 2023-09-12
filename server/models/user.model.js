import mongoose from "mongoose";

const userSchema = mongoose.Schema({
	name: String,
	roles: [
		{
			type: mongoose.Schema.Types.ObjectId,
			ref: "Role",
		},
	],
	username: String,
	password: String,
	attendingList: [
		{
			type: mongoose.Schema.Types.ObjectId,
			ref: "Event",
		},
	],
});

const User = mongoose.model("User", userSchema);

export default User;
