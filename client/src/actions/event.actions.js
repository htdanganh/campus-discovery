import {
	SET_CURRENT_EVENT,
	SET_EVENTS,
	CLEAR_CURRENT_EVENT,
	CLEAR_EVENTS,
} from "../slices/event.slices";
import { SET_MESSAGE } from "../slices/message.slices";
import * as EventService from "../services/event.service";

export const getAllEvents = () => (dispatch) => {
	return EventService.getAllEvents().then(
		(res) => {
			dispatch(
				SET_EVENTS(
					res.data.events.map((event) => {
						return {
							...event,
							time: new Date(event.time).toISOString(),
							createdAt: new Date(event.createdAt).toISOString(),
						};
					})
				)
			);
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

export const getEvent = (eventId) => (dispatch) => {
	return EventService.getEvent(eventId).then(
		(res) => {
			const event = {
				...res.data.event,
				time: new Date(res.data.event.time).toISOString(),
				createdAt: new Date(res.data.event.createdAt).toISOString(),
			};
			dispatch(SET_CURRENT_EVENT(event));
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
export const getUserEvent = (userId) => (dispatch) => {
	return EventService.getUserEvent(userId).then(
		(res) => {
			dispatch(SET_EVENTS(res.data.events));
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
export const getEventsWithTags = (tags) => (dispatch) => {
	return EventService.getEventsWithTags(tags).then(
		(res) => {
			dispatch(SET_EVENTS(res.data.events));
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
export const createEvent = (eventData) => (dispatch) => {
	return EventService.createEvent(eventData).then(
		(res) => {
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
export const updateEvent = (eventId, newEventData) => (dispatch) => {
	console.log(eventId);
	console.log(newEventData);
	return EventService.updateEvent(eventId, newEventData).then(
		(res) => {
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
export const deleteEvent = (eventId) => (dispatch) => {
	return EventService.deleteEvent(eventId).then(
		(res) => {
			dispatch(SET_MESSAGE(res.data.message));
			dispatch(getAllEvents());
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

export const addAttendee = (eventId, userId) => (dispatch) => {
	return EventService.addAttendee(eventId, userId).then(
		(res) => {
			dispatch(SET_MESSAGE(res.data.message));
			dispatch(getEvent(eventId));
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

export const removeAttendee = (eventId, userId) => (dispatch) => {
	return EventService.removeAttendee(eventId, userId).then(
		(res) => {
			dispatch(getEvent(eventId));
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
