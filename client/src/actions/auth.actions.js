import {
	REGISTER_SUCCESS,
	REGISTER_FAIL,
	LOGIN_SUCCESS,
	LOGIN_FAIL,
	LOGOUT,
} from "../slices/auth.slices";
import { SET_MESSAGE } from "../slices/message.slices";
import * as AuthService from "../services/auth.service";

export const signup = (name, username, password, role) => (dispatch) => {
	return AuthService.signup(name, username, password, role).then(
		(res) => {
			dispatch(REGISTER_SUCCESS());
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

			dispatch(REGISTER_FAIL());
			dispatch(SET_MESSAGE(message));

			return Promise.reject();
		}
	);
};

export const signin = (username, password) => (dispatch) => {
	return AuthService.signin(username, password).then(
		(res) => {
			dispatch(LOGIN_SUCCESS({ user: res }));
			return Promise.resolve();
		},
		(err) => {
			const message =
				(err.response &&
					err.response.data &&
					err.response.data.message) ||
				err.message ||
				err.toString();

			dispatch(LOGIN_FAIL());
			dispatch(SET_MESSAGE(message));

			return Promise.reject();
		}
	);
};

export const logout = () => (dispatch) => {
	AuthService.signout();

	dispatch(LOGOUT());
};
