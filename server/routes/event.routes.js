import { auth } from "../middlewares/index.js";
import * as controller from "../controllers/event.controller.js";

export default (app) => {
	app.use(function (req, res, next) {
		res.header(
			"Access-Control-Allow-Headers",
			"x-access-token, Origin, Content-Type, Accept"
		);
		next();
	});

	app.get("/api/event/all", [auth.verifyToken], controller.getAllEvents);
	app.get("/api/event/:eventId", [auth.verifyToken], controller.getEvent);
	app.get("/api/event/:userId", [auth.verifyToken], controller.getUserEvents);
	app.get(
		"/api/event/tags",
		[auth.verifyToken],
		controller.getEventsWithTags
	);

	app.post("/api/event/create", [auth.verifyToken], controller.createEvent);
	app.patch(
		"/api/event/:eventId",
		[auth.verifyToken, auth.isUserEvent],
		controller.updateEvent
	);
	app.delete(
		"/api/event/:eventId",
		[auth.verifyToken, auth.isUserEvent],
		controller.deleteEvent
	);
	app.patch(
		"/api/event/rsvp/:eventId",
		[auth.verifyToken, auth.checkGuestCapacity, auth.checkWhitelist],
		controller.addAttendee
	);
	app.patch(
		"/api/event/unrsvp/:eventId",
		[auth.verifyToken, auth.isUserRsvpOrHost],
		controller.removeAttendee
	);
};
