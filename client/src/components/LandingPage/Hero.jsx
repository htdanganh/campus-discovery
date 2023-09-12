import React from "react";
import styles from "../../styles";
import connectbuzz from "../../assets/connectbuzz.png";

const Hero = () => (
	<section
		id="h-hero"
		className={`flex md:flex-row flex-col ${styles.paddingY}`}
	>
		<div
			className={`flex-1 ${styles.flexStart} flex-col xl:px-50 sm:px-16 px-6`}
		>
			<div className="flex flex-row justify-between items-center w-full">
				<h1 className="flex-1 font-sans font-semibold ss:text-[72px] text-[52px] text-black">
					Campus Connect at Georgia Tech.
				</h1>
			</div>
			<p className={`${styles.paragraph} max-w-[470px] mt-5 text-gray-dark font-bold`}>
				Easily connect with GT organizations in one hub.
				<button
					className=" flex flex-row text-white bg-blue rounded-lg font-bold border border-blue rounded mt-3 px-2 py-1 "
				>
					<a href ={'/signup'}>Get Started</a>
				</button>
				<button
					className=" flex flex-row ss:text-[16px] text-gray-dark"
				>
					<a href ={'/signin'}>or sign in</a>
				</button>
			</p>
		</div>
		<div
			className={`flex-1 flex ${styles.flexCenter} md:my-0 my-10 relative`}
		>
			<img
				src={connectbuzz}
				alt="billing"
				className="w-[100%] h-[100%] relative z-[5]"
			/>
			<div className="absolute z-[0] w-[40%] h-[35%] top-0 gray-light__gradient" />
			<div className="absolute z-[1] w-[80%] h-[80%] rounded-full gray__gradient bottom-40" />
			<div className="absolute z-[0] w-[50%] h-[50%]right-20 bottom-20 gray-light__gradient" />
		</div>
	</section>
);

export default Hero;
