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
	// Stores the context for drawing the box as the user is drawing it
	let currentContext;


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

	// Function that converts coordinates( In percentage of video form ) to pixels on canvas for drawing.
	const percentToCanvasPixels = (xPercent, yPercent) => {
		// Convert percentages to pixels.
		const xPixels = canvasWidth*xPercent;
		const yPixels = canvasHeight*yPercent;

		return [xPixels, yPixels];
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

	// Function that gets a new context for our canvas
	const getContext = () => {
		return canvasElement.current.getContext('2d');	
	}

	// Function that runs once mouse is clicked, Used for drawing annotations
	const mouseDown = (e) => {
		// Start drawing new box
		drawingBox = true;
		// Record starting X and Y
		const clientX = e.clientX;
		const clientY = e.clientY;
		// Convert X and Y to percentage
		const [xPercent, yPercent] = coordsToPercent(clientX, clientY);
		// Store starting position
		initialX = xPercent;
		initialY = yPercent;
		const [startX, startY] = percentToCanvasPixels(initialX, initialY);
		console.log(clientX, clientY);
		console.log(startX, startY);
		// Create new context.
		currentContext = getContext();
	}

	const mouseMove = (e) => {
		// Get the current mouse position.
		const clientX = e.clientX;
		const clientY = e.clientY;
		// Convert to percentage of canvas.
		const [xPercent, yPercent] = coordsToPercent(clientX, clientY);
		// Convert to canvas position.
		const [endX, endY] = percentToCanvasPixels(xPercent, yPercent);

		// Check if we are currently drawing a box
		if(drawingBox) {
			// Clear the last frame of drawing.
			currentContext.clearRect(0, 0, 
				canvasElement.current.getBoundingClientRect().width, canvasElement.current.getBoundingClientRect().height);
			// Convert the starting X Y percentages into coordinates for drawing.
			const [startX, startY] = percentToCanvasPixels(initialX, initialY);
			console.log(startX, startY);
			// Draw our current box.
			currentContext.strokeRect(startX, startY, endX-startX, endY-startY);
		}
	}

	return (
		<div className="CanvasComponent">
			<video ref={videoElement} className="video" onLoadedData={() => resizeCanvas()} autoPlay>
				<source src={props.videoSrc} type="video/mp4"/>
			</video>
			<canvas ref={canvasElement} onMouseDown={(e) => mouseDown(e)} onMouseMove={(e) => mouseMove(e)} style={{width: canvasWidth+"px", height: canvasHeight+"px"}} className="canvas"/>
		</div>
	);
}

export default CanvasComponent;
