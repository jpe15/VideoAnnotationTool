import React from 'react';
import { useState, useRef } from 'react'
import "./styles/Canvas.css"

function CanvasComponent(props) {
	// currentTool stores which tool is currently being used.
	// 0 == Box, 1 == Polygon, 2 == Freehand
	const [currentTool, setCurrentTool] = useState("");

	// Create refs to access video and canvas elements.
	const videoElement = useRef(null);
	const canvasElement = useRef(null);

	// Create variables used to change canvas size.
	const [canvasWidth, setCanvasWidth] = useState(0);
	const [canvasHeight, setCanvasHeight] = useState(0);

	// Function that will run once the video is loaded and resize the canvas to match.
	const resizeCanvas = () => {
		// Get video dimensions.
		const width = videoElement.current.videoWidth;
		const height = videoElement.current.videoHeight;

		console.log(width, height);

		// Resize canvas.
		setCanvasWidth(width);
		setCanvasHeight(height);
		
		console.log(canvasWidth, canvasHeight);
	}

	return (
		<div className="CanvasComponent">
			<video ref={videoElement} className="video" onLoadedData={() => resizeCanvas()} autoPlay>
				<source ref={canvasElement} src={props.videoSrc} type="video/mp4"/>
			</video>
			<canvas style={{width: canvasWidth+"px", height: canvasHeight+"px"}} className="canvas"/>
		</div>
	);
}

export default CanvasComponent;
