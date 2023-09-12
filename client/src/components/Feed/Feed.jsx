import React, { useState, useEffect } from "react";
import EventCard from "./EventCard";
import Pagination from "./Pagination";
import { useSelector, useDispatch } from "react-redux";
import { getAllEvents } from "../../actions/event.actions";

const Feed = ({ filter, isProfile }) => {
	const dispatch = useDispatch();
	const events = useSelector((state) => state.event.events);
	const [currentPage, setCurrentPage] = useState(1);
	const [conflicts, setConflicts] = useState({});
	const postsPerPage = 10;

	useEffect(() => {
		dispatch(getAllEvents());
	}, []);

	useEffect(() => {
		if (currentPosts && isProfile) {
			const temp = {};
			for (let i = 0; i < currentPosts.length; i++) {
				temp[currentPosts[i]._id] = [];
			}
			for (let i = 0; i < currentPosts.length; i++) {
				for (let j = 0; j < currentPosts.length; j++) {
					if (
						i != j &&
						new Date(currentPosts[i].time).toLocaleString() ===
							new Date(currentPosts[j].time).toLocaleString()
					) {
						temp[currentPosts[i]._id].push(currentPosts[j].title);
					}
				}
			}
			setConflicts(temp);
		}
	}, [events]);

	// Get current posts
	const indexOfLastPost = currentPage * postsPerPage;
	const indexOfFirstPost = indexOfLastPost - postsPerPage;
	const currentPosts = (filter ? events.filter(filter) : events).slice(
		indexOfFirstPost,
		indexOfLastPost
	);

	// Change page
	const paginateFront = () => setCurrentPage(currentPage + 1);
	const paginateBack = () => setCurrentPage(currentPage - 1);

	return (
		<div className="flex flex-col justify-center items-center">
			<div className="w-full h-screen bg-gray-lighter">
				{currentPosts
					? currentPosts.map((event) => (
							<EventCard
								event={event}
								key={event._id}
								conflicts={conflicts[event._id]}
							/>
					  ))
					: "Loading Events"}
				<div className={`flex justify-center`}>
					<Pagination
						postsPerPage={postsPerPage}
						totalPosts={
							(filter ? events.filter(filter) : events).length
						}
						paginateBack={paginateBack}
						paginateFront={paginateFront}
						currentPage={currentPage}
					/>
				</div>
			</div>
		</div>
	);
};

Feed.defaultProps = {
	filter: null,
	isProfile: false,
};

export default Feed;
