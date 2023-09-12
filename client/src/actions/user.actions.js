import { SET_USERS, CLEAR_USERS } from "../slices/user.slices";
import { SET_MESSAGE } from "../slices/message.slices";
import * as UserService from "../services/user.service";

export const getUser = (userId) => (dispatch) => {
	return UserService.getUser(userId).then(
		(res) => {
			dispatch(SET_USERS([res.data.user]));
			dispatch(SET_MESSAGE(res.data.message));

			return Promise.resolve();
		},
		(err) => {
			const message =
				(err.response &&
					err.resonse.data &&
					err.response.data.message) ||
				err.message ||
				err.toString();

			// Some sort of fail behavior. Will be handled by RTX Query in future refactor.
			// Not using RTK Query as of sprint 2 due to time budget reasons.
			// For now fail behavior relies on whatever the past state is.
			dispatch(SET_MESSAGE(message));

			return Promise.reject();
		}
	);
};

export const getUserList = (userList) => (dispatch) => {
	if (userList.length <= 0) {
		dispatch(CLEAR_USERS([]));
		return;
	}
	return UserService.getUserList(userList).then(
		(res) => {
			dispatch(SET_USERS(res.data.users));
			dispatch(SET_MESSAGE(res.data.message));

			return Promise.resolve();
		},
		(err) => {
			const message =
				(err.response &&
					err.resonse.data &&
					err.response.data.message) ||
				err.message ||
				err.toString();

			// Some sort of fail behavior. Will be handled by RTX Query in future refactor.
			// Not using RTK Query as of sprint 2 due to time budget reasons.
			// For now fail behavior relies on whatever the past state is.
			dispatch(SET_MESSAGE(message));

			return Promise.reject();
		}
	);
};

export const getAllUsers = () => (dispatch) => {
	return UserService.getAllUsers().then(
		(res) => {
			dispatch(SET_USERS(res.data.users));
			dispatch(SET_MESSAGE(res.data.message));

			return Promise.resolve();
		},
		(err) => {
			const message =
				(err.response &&
					err.resonse.data &&
					err.response.data.message) ||
				err.message ||
				err.toString();

			// Some sort of fail behavior. Will be handled by RTX Query in future refactor.
			// Not using RTK Query as of sprint 2 due to time budget reasons.
			// For now fail behavior relies on whatever the past state is.
			dispatch(SET_MESSAGE(message));

			return Promise.reject();
		}
	);
};
