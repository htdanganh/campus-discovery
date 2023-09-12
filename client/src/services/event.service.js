import axios from "axios";
import authHeader from "./auth-header";

const API_URL = "http://localhost:8080/api/event/";

export const getAllEvents = () => {
	return axios.get(API_URL + "all", { headers: authHeader() });
};

export const getEvent = (eventId) => {
	return axios.get(API_URL + eventId, { headers: authHeader() });
};

export const getUserEvent = (userId) => {
	return axios.get(API_URL + userId, { headers: authHeader() });
};

export const getEventsWithTags = (tags) => {
	return axios.get(API_URL + "tags", tags, { headers: authHeader() });
};

export const createEvent = (eventData) => {
	return axios.post(API_URL + "create", eventData, { headers: authHeader() });
};

export const updateEvent = (eventId, newEventData) => {
	return axios.patch(API_URL + eventId, newEventData, {
		headers: authHeader(),
	});
};

export const deleteEvent = (eventId) => {
	return axios.delete(API_URL + eventId, { headers: authHeader() });
};

export const addAttendee = (eventId, userId) => {
	return axios.patch(
		API_URL + "rsvp/" + eventId,
		{ userId },
		{
			headers: authHeader(),
		}
	);
};

export const removeAttendee = (eventId, userId) => {
	return axios.patch(
		API_URL + "unrsvp/" + eventId,
		{ userId },
		{
			headers: authHeader(),
		}
	);
};
