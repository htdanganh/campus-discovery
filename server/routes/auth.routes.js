import { verifySignUp } from "../middlewares/index.js";
import * as controller from "../controllers/auth.controller.js";

export default (app) => {
	app.use(function (req, res, next) {
		res.header(
			"Access-Control-Allow-Headers",
			"x-access-token, Origin, Content-Type, Accept"
		);
		next();
	});

	app.post(
		"/api/auth/signup",
		[verifySignUp.checkUsernameExists, verifySignUp.checkRolesExists],
		controller.signUp
	);

	app.post("/api/auth/signin", controller.signIn);
};
