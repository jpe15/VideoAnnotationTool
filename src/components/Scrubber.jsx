import React, { useEffect, useState } from "react";
import "../styles/Scrubber.css";

const Scrubber = ({ videoTime }) => {
	return (
		<div className="scrubberContainer">
			<input className="scrubber" type="range" min="0" max="100" step="0.1" defaultValue={videoTime}></input> 
		</div>
	);
};

export default Scrubber;
