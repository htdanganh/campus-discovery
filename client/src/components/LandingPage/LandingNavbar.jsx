import { React, useState } from "react";
import close from "../../assets/close.svg";
import gtlogo from "../../assets/gtlogo.svg";
import menu from "../../assets/menu.svg";

const LandingNavbar = () => {
	const [toggle, setToggle] = useState(false);

	return (
		<section id="h-navbar">
			<nav className="w-full flex py-6 justify-between items-center navbar">
				<img src={gtlogo} alt="logo" className="w-[124px] h-[32px]" />
				<ul className="list-none sm:flex hidden justify-end items-center flex-1">
					<li className="font-sans font-normal cursor-pointer mr-10 text-[16px] text-gray">
						<a href={`/signup`}>Register</a>
					</li>
					<li className="font-sans font-normal cursor-pointer mr-0 text-[16px] text-gray">
						<a href={`/signin`}>Log In</a>
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
						} p-6 bg-black-gradient absolute top-20 right-0 mx-5 my-2 min-w-[140px] rounded-xl sidebar`}
					>
						<ul className="list-none flex flex-col justify-end items-center flex-1">
							<li className="font-sans font-normal cursor-pointer mr-10 text-[16px] text-gray">
								<a href={`/signup`}>Register</a>
							</li>
							<li className="font-sans font-normal cursor-pointer mr-0 text-[16px] text-gray">
								<a href={`/signin`}>Log In</a>
							</li>
						</ul>
					</div>
				</div>
			</nav>
		</section>
	);
};

export default LandingNavbar;
