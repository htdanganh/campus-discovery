import { React, useState } from "react";
import close from "../../assets/close.svg";
import gtlogo from "../../assets/gtlogo.svg";
import menu from "../../assets/menu.svg";
import styles from "../../styles";

const Navbar = () => {
	const [toggle, setToggle] = useState(false);

	return (
		<>
			<section id="d-navbar">
				<div className={`w-full ${styles.flexCenter}`}>
					<div className={`${styles.boxWidth}`}>
						<nav className="w-full flex py-6 justify-between items-center navbar text-gray-dark">
							<a href="/">
								<img
									src={gtlogo}
									alt="logo"
									className="w-[124px] h-[32px]"
								/>
							</a>
							<ul className="list-none sm:flex hidden justify-end items-center flex-1">
								<li className="font-sans font-normal cursor-pointer mr-10 text-[16px] text-gray-dark">
									<a href="/dashboard">Home</a>
								</li>
								<li className="font-sans font-normal cursor-pointer mr-10 text-[16px] text-gray-dark">
									<a href="/event/map">Map</a>
								</li>
								<li className="font-sans font-normal cursor-pointer mr-10 text-[16px] text-gray-dark">
									<a href="/profile">Profile</a>
								</li>
								<li className="font-sans font-normal cursor-pointer mr-5 text-[16px] text-gray-dark">
									<a href="/event/create">Create Event</a>
								</li>
							</ul>
							<div className="sm:hidden flex flex-1 justify-end items-center">
								<img
									src={toggle ? close : menu}
									alt="menu"
									className="w-[28px] h-[28px] object-contain cursor-pointer"
									onClick={() => setToggle((prev) => !prev)}
								/>

								<div
									className={`${
										toggle ? "flex" : "hidden"
									} p-6 bg-gray-light absolute top-20 right-0 mx-5 my-2 min-w-[140px] z-50 rounded-xl sidebar`}
								>
									<ul className="list-none flex flex-col justify-end items-center flex-1">
										<li className="font-sans font-normal cursor-pointer text-[16px] text-gray-dark">
											<a href="/dashboard">Home</a>
										</li>
										<li className="font-sans font-normal cursor-pointer text-[16px] text-gray-dark">
											<a href="/event/map">Map</a>
										</li>
										<li className="font-sans font-normal cursor-pointer text-[16px] text-gray-dark">
											<a href="/profile">Profile</a>
										</li>
										<li className="font-sans font-normal cursor-pointer text-[16px] text-gray-dark">
											<a href="/event/create">
												Create Event
											</a>
										</li>
									</ul>
								</div>
							</div>
						</nav>
					</div>
				</div>
			</section>
		</>
	);
};

export default Navbar;
