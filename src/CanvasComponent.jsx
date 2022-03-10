import React from 'react';
import { useState, useRef } from 'react'
import "./styles/Canvas.css"

function CanvasComponent(props) {
	// currentTool stores which tool is currently being used.
	// 0 == Box, 1 == Polygon, 2 == Freehand
	const [currentTool, setCurrentTool] = useState("");

	const resizeCanvas = () => {
		console.log("RESIZE");
	}

	return (
		<div className="CanvasComponent">
			<video className="video" onLoadedData={() => resizeCanvas()} autoPlay controls>
				<source src={props.videoSrc} type="video/mp4"/>
			</video>
			<canvas className="canvas"/>
		</div>
	);
}

export default CanvasComponent;
