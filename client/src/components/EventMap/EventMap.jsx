import React, { useEffect, useState } from "react";
import Map, { Marker, Popup } from "react-map-gl";
import Geocoder from "./Geocoder";

const EventMap = ({ events, useGeocode, zoom, filter, useFilter }) => {
	const MAPBOX_API = import.meta.env.VITE_MAPBOX_API;
	const [popupInfo, setPopupInfo] = useState(null);

	const initalViewState =
		events && events.length === 1
			? {
					longitude: events[0].location.coord[0],
					latitude: events[0].location.coord[1],
					zoom,
			  }
			: {
					longitude: -84.3963,
					latitude: 33.7756,
					zoom,
			  };

	const renderMarkers = () => {
		if (events && events.length > 0) {
			if (useFilter) {
				return events.filter(filter).map((event, index) => (
					<Marker
						key={index}
						longitude={event.location.coord[0]}
						latitude={event.location.coord[1]}
						color={"#f66464"}
						onClick={(e) => {
							e.originalEvent.stopPropagation();
							setPopupInfo(event);
						}}
					/>
				));
			}
			return events.map((event, index) => (
				<Marker
					key={index}
					longitude={event.location.coord[0]}
					latitude={event.location.coord[1]}
					color={"#f66464"}
					onClick={(e) => {
						e.originalEvent.stopPropagation();
						setPopupInfo(event);
					}}
				/>
			));
		}

		return null;
	};

	return (
		<Map
			initialViewState={initalViewState}
			mapStyle="mapbox://styles/mapbox/streets-v9"
			mapboxAccessToken={MAPBOX_API}
		>
			{useGeocode ? (
				<Geocoder
					mapboxAccessToken={MAPBOX_API}
					position="top-left"
					marker={true}
				/>
			) : null}
			{renderMarkers()}
			{popupInfo ? (
				<Popup
					className="w-[45rem]"
					anchor="top"
					longitude={Number(popupInfo.location.coord[0])}
					latitude={Number(popupInfo.location.coord[1])}
					onClose={() => setPopupInfo(null)}
				>
					<div className="mt-2">
						<h2 className="font-bold text-lg text-gray-dark">
							{popupInfo.title}
						</h2>
						<h6 className="text-gray-default">
							{new Date(popupInfo.time).toLocaleString("en-US")}
							<br />@ {popupInfo.location.name}
							<br />
							{popupInfo.description}
							<br />
							posted by {popupInfo.author.name}
							<br />
							<a href={`${popupInfo._id}`} className="text-blue">
								Go to Event Page
							</a>
						</h6>
					</div>
				</Popup>
			) : null}
		</Map>
	);
};

EventMap.defaultProps = {
	locations: null,
	useGeocode: false,
	zoom: 15,
	filter: (event) => event.title === "Event1",
	useFilter: true,
};

export default EventMap;
