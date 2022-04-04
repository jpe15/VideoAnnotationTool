import React, { useEffect, useState, useRef } from "react";
import "../styles/Scrubber.css";

const Scrubber = ({ currentPercent, gotoPercent }) => {
	const [progressStyle, setProgressStyle] = useState({"width": "0%"});
	const [tempStyle, setTempStyle] = useState({"width": "0%"});
	const divElement = useRef(null);

	useEffect(() => {
		setProgressStyle({"width": currentPercent+"%"});
	}, [currentPercent]);

	// Function to convert x coordinate to percent.
	const coordToPercent = (x) => {
		const barWidth = divElement.current.getBoundingClientRect().width;
		const barStart = divElement.current.getBoundingClientRect().left;
		return ((x-barStart)/(barWidth))*100;
	}

	const mouseMove = (e) => {
		const currentPercent = coordToPercent(e.clientX);
		setTempStyle({"width": currentPercent+"%"});
	}

	const mouseLeave = (e) => {
		setTempStyle({"width": "0%"});
	}

	const mouseDown = (e) => {
		const currentPercent = coordToPercent(e.clientX);
		console.log(currentPercent);
		gotoPercent(currentPercent);
	}

	return (
		<div onMouseMove={mouseMove} onMouseLeave={mouseLeave} onMouseDown={mouseDown} ref={divElement} className="scrubberContainer">
			<div style={progressStyle} className="progressBar"></div>
			<div style={tempStyle} className="potentialBar"></div>
		</div>
	);
};

export default Scrubber;
