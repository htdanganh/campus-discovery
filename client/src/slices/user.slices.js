import { createSlice } from "@reduxjs/toolkit";

const initialState = {
	users: [],
};

export const userSlice = createSlice({
	name: "user",
	initialState,
	reducers: {
		SET_USERS: (state, action) => {
			state.users = action.payload;
		},
		CLEAR_USERS: (state) => {
			state.users = [];
		},
	},
});

export const { SET_USERS, CLEAR_USERS } = userSlice.actions;
export default userSlice.reducer;
