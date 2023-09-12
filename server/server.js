import express from "express";
import cors from "cors";
import dotenv from "dotenv";
import { db } from "./models/index.js";

import user from "./routes/user.routes.js";
import auth from "./routes/auth.routes.js";
import event from "./routes/event.routes.js";

dotenv.config();
const Role = db.role;
const CONNECTION_URL = process.env.CONNECTION_URL;
const PORT = process.env.PORT || 8080;
const app = express();

// Express setup
var corsOptions = {
	origin: ["http://127.0.0.1:3000", "http://localhost:3000"],
};
app.use(cors(corsOptions));

app.use(express.json({ limit: "30mb", extended: true }));
app.use(express.urlencoded({ limit: "30mb", extended: true }));

app.get("/", (req, res) => {
	res.status(200).send(`Server running on port ${PORT}`);
});

user(app);
auth(app);
event(app);

// Database setup
db.mongoose
	.connect(CONNECTION_URL, {
		useNewUrlParser: true,
		useUnifiedTopology: true,
	})
	.then(() => {
		console.log("Successfully connect to MongoDB.");
		initial();
	})
	.catch((err) => {
		console.error("Connection error", err);
		process.exit();
	});

const initial = () => {
	Role.estimatedDocumentCount((err, count) => {
		if (!err && count === 0) {
			new Role({
				name: "student",
			}).save((err) => {
				if (err) {
					console.log("error", err);
				}
				console.log("added 'student' to roles collection");
			});

			new Role({
				name: "teacher",
			}).save((err) => {
				if (err) {
					console.log("error", err);
				}
				console.log("added 'teacher' to roles collection");
			});

			new Role({
				name: "organizer",
			}).save((err) => {
				if (err) {
					console.log("error", err);
				}
				console.log("added 'organizer' to roles collection");
			});

			new Role({
				name: "admin",
			}).save((err) => {
				if (err) {
					console.log("error", err);
				}
				console.log("added 'admin' to roles collection");
			});
		}
	});
};

// Begin listening for requests
app.listen(PORT, () => console.log(`Server running on port: ${PORT}`));
