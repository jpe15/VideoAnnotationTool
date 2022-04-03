import React, { useEffect, useState } from "react";
import "../styles/Scrubber.css";

const Scrubber = ({ currentPercent }) => {
	const [progressStyle, setProgressStyle] = useState({"width": "0%"});

	useEffect(() => {
		setProgressStyle({"width": currentPercent+"%"});
	}, [currentPercent]);

	return (
		<div className="scrubberContainer">
			<div style={progressStyle} className="progressBar"></div>
		</div>
	);
};

export default Scrubber;
