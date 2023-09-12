import { createSlice } from "@reduxjs/toolkit";

const initialState = {
	message: "",
};

export const messageSlice = createSlice({
	name: "message",
	initialState,
	reducers: {
		SET_MESSAGE: (state, action) => {
			state.message = action.payload;
		},
		CLEAR_MESSAGE: (state) => {
			state.message = "";
		},
	},
});

export const { SET_MESSAGE, CLEAR_MESSAGE } = messageSlice.actions;
export default messageSlice.reducer;
