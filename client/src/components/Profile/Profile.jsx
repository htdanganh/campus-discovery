import React from "react";
import { useSelector } from "react-redux";
import Navbar from "../Navbar/Navbar";
import Feed from "../Feed/Feed";
import Sidebar from "../Dashboard/Sidebar";

const Profile = () => {
	const user = useSelector((state) => state.auth.user);

	return (
		<section id="dashboard">
			<div className={`w-full flex  flex-wrap justify-center`}>
				<div className="w-full mb-0.5 shadow-md bg-white">
					<Navbar />
				</div>
				<div className="w-2/12 h-screen bg-white">
					<div className="flex justify-start">
						<div className="m-5 font-bold">
							<span className="text-2xl text-gray-dark">
								{user.name}
							</span>
							<span className="text-lg text-blue text-center">
								{" "}
								<span className="text-gray-default">
									({user.roles})
								</span>
								<br />@{user.username}
							</span>
						</div>
					</div>
					<Sidebar />
				</div>
				<div className={`w-10/12 h-screen p-10`}>
					<div className="ml-5">
						<h1 className="font-bold text-3xl text-gray-dark">
							My Events
						</h1>
						<hr className="bg-gray-black" />
					</div>
					<Feed
						filter={(event) => event.attendeeList.includes(user.id)}
						isProfile={true}
					/>
				</div>
			</div>
		</section>
	);
};

export default Profile;
