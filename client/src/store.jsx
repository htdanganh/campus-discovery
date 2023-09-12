import { configureStore } from "@reduxjs/toolkit";

import authReducer from "./slices/auth.slices";
import messageReducer from "./slices/message.slices";
import eventReducer from "./slices/event.slices";
import userReducer from "./slices/user.slices";

export const store = configureStore({
	reducer: {
		auth: authReducer,
		message: messageReducer,
		event: eventReducer,
		user: userReducer,
	},
});
