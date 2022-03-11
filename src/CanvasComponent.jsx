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

	// Stores the context for displaying existing annotations.
	let displayContext;
	// Stores all of the annotations
	let annotations = [];

	// Create variables used to change canvas size.
	const [canvasWidth, setCanvasWidth] = useState(0);
	const [canvasHeight, setCanvasHeight] = useState(0);

	// Create refs to access video and canvas elements.
	const videoElement = useRef(null);
	// We have two canvases, One for displaying all existing annotations and one for displaying the annotation currently being drawn.
	const drawingCanvas = useRef(null);
	const displayCanvas = useRef(null);

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


		// Resize canvas.
		setCanvasWidth(width);
		setCanvasHeight(height);

		// Get contexts.
		currentContext = drawingCanvas.current.getContext('2d');	
		displayContext = displayCanvas.current.getContext('2d');
	}

	// Function that draws all annotations in array to display canvas.
	const drawAnnotations = () => {
		console.log("DRAWING.");
		// Get context.
		displayContext = displayCanvas.current.getContext('2d');
		// Clear display canvas.
		displayContext.clearRect(0, 0, 
			drawingCanvas.current.getBoundingClientRect().width, drawingCanvas.current.getBoundingClientRect().height);
		// Go over each annotation
		for(const annotation of annotations) {
			console.log("ANNOTATION.");
			console.log(annotation);
			if(annotation.type == "BOX") {
				console.log("BOX");
				// Get the boxes bounds.
				const [startX, startY] = percentToCanvasPixels(annotation.start[0], annotation.start[1]);
				const [endX, endY] = percentToCanvasPixels(annotation.end[0], annotation.end[1]);
				console.log(startX, startY, endX, endY);
				// Draw it on the display canvas.
				displayContext.strokeRect(startX, startY, endX-startX, endY-startY);
			}
		}
	}

	// Function that runs once mouse is clicked, Used for drawing annotations
	const mouseDown = (e) => {
		// NOTE: WHY DOES THIS NEED TO BE HERE??
		currentContext = drawingCanvas.current.getContext('2d');	
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
	}

	const mouseMove = (e) => {
		// Check if we are currently drawing a box
		if(drawingBox) {
			// Get the current mouse position.
			const clientX = e.clientX;
			const clientY = e.clientY;
			// Convert to percentage of canvas.
			const [xPercent, yPercent] = coordsToPercent(clientX, clientY);
			// Convert to canvas position.
			const [endX, endY] = percentToCanvasPixels(xPercent, yPercent);

			// Clear the last frame of drawing.
			currentContext.clearRect(0, 0, 
				drawingCanvas.current.getBoundingClientRect().width, drawingCanvas.current.getBoundingClientRect().height);
			// Convert the starting X Y percentages into coordinates for drawing.
			const [startX, startY] = percentToCanvasPixels(initialX, initialY);
			// Draw our current box.
			currentContext.strokeRect(startX, startY, endX-startX, endY-startY);
		}
	}

	const mouseUp = (e) => {
		// Check if we are currently drawing a box
		if(drawingBox) {
			// Get the current mouse position.
			const clientX = e.clientX;
			const clientY = e.clientY;
			// Convert to percentage of canvas.
			const [xPercent, yPercent] = coordsToPercent(clientX, clientY);
			// Convert to canvas position.
			const [endX, endY] = percentToCanvasPixels(xPercent, yPercent);

			// Clear the last frame of drawing.
			currentContext.clearRect(0, 0, 
				drawingCanvas.current.getBoundingClientRect().width, drawingCanvas.current.getBoundingClientRect().height);
			// Convert the starting X Y percentages into coordinates for drawing.
			const [startX, startY] = percentToCanvasPixels(initialX, initialY);
			// Draw our current box.
			currentContext.strokeRect(startX, startY, endX-startX, endY-startY);

			// Add this to the list of annotations.
			let newAnnotation = {}
			newAnnotation["type"] = "BOX";
			newAnnotation["start"] = [initialX, initialY];
			newAnnotation["end"] = [xPercent, yPercent];
			newAnnotation["context"] = currentContext;

			annotations.push(newAnnotation);

			// We are no longer drawing.
			drawingBox = false;

			// Clear drawing canvas.
			currentContext.clearRect(0, 0, 
				drawingCanvas.current.getBoundingClientRect().width, drawingCanvas.current.getBoundingClientRect().height);
			
			// Redraw display canvas.
			drawAnnotations();
		}
	}

	return (
		<div className="CanvasComponent">
			<video ref={videoElement} className="video" onLoadedData={() => resizeCanvas()} autoPlay>
				<source src={props.videoSrc} type="video/mp4"/>
			</video>
			<canvas 
				ref={drawingCanvas} 
				onMouseDown={(e) => mouseDown(e)} 
				onMouseMove={(e) => mouseMove(e)} 
				onMouseUp  ={(e) => mouseUp(e)}
				width={canvasWidth+"px"} 
				height={canvasHeight+"px"} 
				className="drawingCanvas"/>

			<canvas 
				ref={displayCanvas} 
				onMouseDown={(e) => mouseDown(e)} 
				onMouseMove={(e) => mouseMove(e)} 
				onMouseUp  ={(e) => mouseUp(e)}
				width={canvasWidth+"px"} 
				height={canvasHeight+"px"} 
				className="displayCanvas"/>
		</div>
	);
}

export default CanvasComponent;
