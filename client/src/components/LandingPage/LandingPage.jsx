import React from "react";
import LandingNavbar from "./LandingNavbar";
import Hero from "./Hero";
import styles from "../../styles";

const LandingPage = () => (
	<section id="h-landing">
		<div className="bg-primary w-full">
			<div className={`${styles.paddingX} ${styles.flexCenter}`}>
				<div className={`${styles.boxWidth}`}>
					<LandingNavbar />
				</div>
			</div>
			<div className={`bg-primary h-screen ${styles.flexStart}`}>
				<div className={`${styles.boxWidth}`}>
					<Hero />
				</div>
			</div>
		</div>
	</section>
);

export default LandingPage;
