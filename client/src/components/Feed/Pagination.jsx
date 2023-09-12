import React from "react";
export default function Pagination({
	postsPerPage,
	totalPosts,
	paginateFront,
	paginateBack,
	currentPage,
}) {
	return (
		<div className={`py-2 flex flex-col mb-1`}>
			<div className="w-full mb-1">
				<p className="text-sm text-gray-default">
					Showing{" "}
					<span className="font-bold">
						{currentPage * postsPerPage - (postsPerPage - 1)}
					</span>{" "}
					to{" "}
					<span className="font-bold">
						{" "}
						{currentPage * postsPerPage > totalPosts
							? totalPosts
							: currentPage * postsPerPage}{" "}
					</span>{" "}
					of <span className="font-bold"> {totalPosts} </span>
					results
				</p>
			</div>
			<div className="w-full mt-1 flex justify-center items-center">
				<nav
					className="relative z-0 inline-flex rounded-md shadow-sm -space-x-px"
					aria-label="Pagination"
				>
					<a
						onClick={() => {
							if (currentPage != 1) {
								paginateBack();
							}
						}}
						href="#"
						className="relative inline-flex items-center px-2 py-2 mx-0.5 rounded-l-md bg-gray-light text-sm font-medium text-gray-default hover:border-2 hover:border-gray-default"
					>
						<span>Previous</span>
					</a>

					<a
						onClick={() => {
							if (currentPage * postsPerPage < totalPosts) {
								paginateFront();
							}
						}}
						href="#"
						className="relative inline-flex items-center px-2 py-2 rounded-r-md bg-gray-light text-sm font-medium text-gray-default hover:border-2 hover:border-gray-default"
					>
						<span>Next</span>
					</a>
				</nav>
			</div>
		</div>
	);
}
