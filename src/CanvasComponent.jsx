import React from 'react';
import { useState, useRef } from 'react'
import "./styles/Canvas.css"

function CanvasComponent(props) {

	// Stores which tool is currently being used.
	// 0 == Box, 1 == Polygon, 2 == Freehand
	const currentTool = 0;

	// Stores if we are currently drawing a bounding box
	let drawingBox = false;
	// Stores the initial coordinate of bounding box
	let initialX, initialY;


	// Create variables used to change canvas size.
	const [canvasWidth, setCanvasWidth] = useState(0);
	const [canvasHeight, setCanvasHeight] = useState(0);

	// Create refs to access video and canvas elements.
	const videoElement = useRef(null);
	const canvasElement = useRef(null);

	// Function that converts client( Relative to viewpoint ) coordinates to percentage of the video.
	const coordsToPercent = (x, y) => {
		// Get top left position of video
		const videoTop = videoElement.current.getBoundingClientRect().top;
		const videoLeft = videoElement.current.getBoundingClientRect().left;

		// Get video element size
		const videoElementWidth = videoElement.current.getBoundingClientRect().width;
		const videoElementHeight = videoElement.current.getBoundingClientRect().height;

		// Subtract video position from coords to get position inside video element
		const videoX = x-videoLeft;
		const videoY = y-videoTop;

		// Get X Y as percentage of video
		const xPercentage = videoX/videoElementWidth;
		const yPercentage = videoY/videoElementHeight;

		return [xPercentage, yPercentage];
	}

	// Function that will run once the video is loaded and resize the canvas to match.
	const resizeCanvas = () => {
		// Get video dimensions.
		const width = videoElement.current.getBoundingClientRect().width;
		const height = videoElement.current.getBoundingClientRect().height;

		console.log(width, height);

		// Resize canvas.
		setCanvasWidth(width);
		setCanvasHeight(height);
	}

	// Function that runs once mouse is clicked, Used for drawing annotations
	const mouseDown = (e) => {
		drawingBox = true;
		const clientX = e.clientX;
		const clientY = e.clientY;
		console.log(clientX, clientY);	
		const [xPercent, yPercent] = coordsToPercent(clientX, clientY);
		console.log(xPercent, yPercent);
	}

	return (
		<div className="CanvasComponent">
			<video ref={videoElement} className="video" onLoadedData={() => resizeCanvas()} autoPlay>
				<source ref={canvasElement} src={props.videoSrc} type="video/mp4"/>
			</video>
			<canvas onMouseDown={(e) => mouseDown(e)} style={{width: canvasWidth+"px", height: canvasHeight+"px"}} className="canvas"/>
		</div>
	);
}

export default CanvasComponent;
