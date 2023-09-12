import { SET_MESSAGE, CLEAR_MESSAGE } from "../slices/message.slices";

export const setMessage = (message) => (dispatch) => {
	dispatch(SET_MESSAGE(message));
};

export const clearMessage = () => (dispatch) => {
	dispatch(CLEAR_MESSAGE);
};
