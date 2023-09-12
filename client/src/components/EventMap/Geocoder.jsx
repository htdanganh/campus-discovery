import React, { useState } from "react";
import { useControl, Marker } from "react-map-gl";
import MapboxGeocoder, { GeocoderOptions } from "@mapbox/mapbox-gl-geocoder";

const Geocoder = (props) => {
	const [marker, setMarker] = useState(
		props.location ? (
			<Marker
				longitude={props.location.coord[0]}
				latitude={props.location.coord[1]}
			/>
		) : null
	);

	const noop = () => {};

	const geocoder = useControl(
		() => {
			const ctrl = new MapboxGeocoder({
				...props,
				marker: false,
				accessToken: props.mapboxAccessToken,
			});
			ctrl.on("loading", noop);
			ctrl.on("results", noop);
			ctrl.on("result", (evt) => {
				const { result } = evt;
				const location =
					result &&
					(result.center ||
						(result.geometry?.type === "Point" &&
							result.geometry.coordinates));
				if (location) {
					props.setLocation({ name: result.text, coord: location });
					setMarker(
						<Marker
							longitude={location[0]}
							latitude={location[1]}
						/>
					);
				} else {
					setMarker(null);
				}
			});
			ctrl.on("error", noop);
			return ctrl;
		},
		{
			position: props.position,
		}
	);

	return marker;
};

export default Geocoder;
