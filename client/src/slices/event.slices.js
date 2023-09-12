import { createSlice } from "@reduxjs/toolkit";

const initialState = {
	currentEvent: null,
	events: [],
};

export const eventSlice = createSlice({
	name: "event",
	initialState,
	reducers: {
		SET_CURRENT_EVENT: (state, action) => {
			state.currentEvent = {
				...action.payload,
				time: new Date(action.payload.time).toISOString(),
				createdAt: new Date(action.payload.createdAt).toISOString(),
			};
		},
		SET_EVENTS: (state, action) => {
			state.events = action.payload;
		},
		CLEAR_CURRENT_EVENT: (state) => {
			state.currentEvent = null;
		},
		CLEAR_EVENTS: (state) => {
			state.events = [];
		},
	},
});

export const {
	SET_CURRENT_EVENT,
	SET_EVENTS,
	CLEAR_CURRENT_EVENT,
	CLEAR_EVENTS,
} = eventSlice.actions;
export default eventSlice.reducer;
