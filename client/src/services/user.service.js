import axios from "axios";
import authHeader from "./auth-header";

const API_URL = "http://localhost:8080/api/user/";

export const getUser = (userId) => {
	return axios.get(API_URL + "id" + userId, { headers: authHeader() });
};

export const getUserList = (userList) => {
	return axios.patch(API_URL + "list", userList, {
		headers: authHeader(),
	});
};

export const getAllUsers = () => {
	return axios.get(API_URL + "all", { headers: authHeader() });
};
