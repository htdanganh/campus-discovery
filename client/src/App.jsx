import { BrowserRouter as Router, Routes, Route } from "react-router-dom";

import {
	Signin,
	Signup,
	LandingPage,
	Dashboard,
	Profile,
	EventPage,
	EventForm,
	MapPage,
} from "./components";

function App() {
	return (
		<Router>
			<Routes>
				<Route path="/" element={<LandingPage />} />
				<Route path="signup" element={<Signup />} />
				<Route path="signin" element={<Signin />} />
				<Route path="dashboard" element={<Dashboard />} />
				<Route path="profile" element={<Profile />} />
				<Route path="event/:eventId" element={<EventPage />} />
				<Route path="event/create" element={<EventForm />} />
				<Route path="event/update/:eventId" element={<EventForm />} />
				<Route path="event/map" element={<MapPage />} />
			</Routes>
		</Router>
	);
}

export default App;
