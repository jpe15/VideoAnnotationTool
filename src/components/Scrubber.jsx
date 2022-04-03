import React, { useEffect, useState } from "react";
import "../styles/Scrubber.css";

const Scrubber = () => {
	return (
		<div className="scrubberContainer">
			<input className="scrubber" type="range" min="0" max="100" step="0.1"></input> 
		</div>
	);
};

export default Scrubber;
