import { createSlice } from "@reduxjs/toolkit";

const user = JSON.parse(localStorage.getItem("user"));
const initialState = user
	? { isLoggedIn: true, user }
	: { isLoggedIn: false, user: null };

export const authSlice = createSlice({
	name: "auth",
	initialState,
	reducers: {
		REGISTER_SUCCESS: (state) => {
			state.isLoggedIn = false;
		},
		REGISTER_FAIL: (state) => {
			state.isLoggedIn = false;
		},
		LOGIN_SUCCESS: (state, action) => {
			state.isLoggedIn = true;
			state.user = action.payload.user;
		},
		LOGIN_FAIL: (state) => {
			state.isLoggedIn = false;
			state.user = null;
		},
		LOGOUT: (state) => {
			state.isLoggedIn = false;
			state.user = null;
		},
	},
});

export const {
	REGISTER_SUCCESS,
	REGISTER_FAIL,
	LOGIN_SUCCESS,
	LOGIN_FAIL,
	LOGOUT,
} = authSlice.actions;
export default authSlice.reducer;
