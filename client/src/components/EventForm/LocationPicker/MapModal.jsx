import React, { useEffect, useState } from "react";
import Map from "react-map-gl";
import Geocoder from "../../EventMap/Geocoder";
import close from "../../../assets/close.svg";

const MapModal = ({ onChange, name }) => {
	const MAPBOX_API = import.meta.env.VITE_MAPBOX_API;
	const [showModal, setShowModal] = useState(false);
	const [location, setLocation] = useState(null);

	useEffect(() => {
		onChange(name, location);
	}, [location]);

	return (
		<div className="flex justify-center items-center">
			<div className="m-auto">
				<button
					type="button"
					onClick={() => setShowModal(true)}
					className="px-3 py-1 text-white bg-blue rounded-lg"
				>
					Select Location
				</button>
			</div>
			{showModal ? (
				<>
					<div className="flex justify-center items-center overflow-x-hidden overflow-y-auto fixed inset-0 z-50 outline-none focus:outline-none">
						<div className="relative w-auto my-6 mx-auto max-w-5xl">
							{/*content*/}
							<div className="border-0 rounded-3xl shadow-lg relative flex flex-col w-full bg-white outline-none focus:outline-none">
								<div className="flex items-center justify-between py-5 px-7 border-b border-solid border-slate-200 rounded-t">
									<h3 className="text-3xl font-semibold">
										Select Location
									</h3>
								</div>
								<div className="border border-gray-light py-1">
									<div className="w-[55rem] h-[45rem]">
										<Map
											initialViewState={{
												longitude: -84.3963,
												latitude: 33.7756,
												zoom: 15,
											}}
											mapStyle="mapbox://styles/mapbox/streets-v9"
											mapboxAccessToken={MAPBOX_API}
										>
											<Geocoder
												location={location}
												setLocation={setLocation}
												mapboxAccessToken={MAPBOX_API}
												position="top-left"
												marker={true}
											/>
										</Map>
									</div>
								</div>
								<div className="flex items-center justify-end p-6 border-t border-solid border-slate-200 rounded-b">
									<button
										className="text-red-500 background-transparent font-bold uppercase px-6 py-2 text-sm outline-none focus:outline-none mr-1 mb-1 ease-linear transition-all duration-150"
										type="button"
										onClick={() => setShowModal(false)}
									>
										Close
									</button>
									<button
										className="bg-slate-500 text-white active:bg-slate-600 font-bold uppercase text-sm px-6 py-3 rounded shadow hover:shadow-lg outline-none focus:outline-none mr-1 mb-1 ease-linear transition-all duration-150"
										type="button"
										onClick={() => setShowModal(false)}
									>
										Save Changes
									</button>
								</div>
							</div>
						</div>
					</div>
					<div className="opacity-25 fixed inset-0 z-40 bg-black"></div>
				</>
			) : null}
		</div>
	);
};

export default MapModal;
