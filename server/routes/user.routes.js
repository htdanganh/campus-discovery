import { auth } from "../middlewares/index.js";
import * as controller from "../controllers/user.controller.js";

export default (app) => {
	app.use(function (req, res, next) {
		res.header(
			"Access-Control-Allow-Headers",
			"x-access-token, Origin, Content-Type, Accept"
		);
		next();
	});

	app.get("/api/user/all", [auth.verifyToken], controller.getAllUsers);
	app.patch("/api/user/list", [auth.verifyToken], controller.getUserList);
	app.get("/api/user/id/:userId", [auth.verifyToken], controller.getUser);
};
