import React from 'react';
import { useState, useRef } from 'react'
import "./styles/Canvas.css"

function CanvasComponent(props) {

	// At what radius to the beginning of a polygon to close it.
	// NOTE: This is in proportion to video size. E.g. 1 = whole video, 0 = none
	const polygonCloseRadius = 0.03;

	// Stores which tool is currently being used.
	// 0 == Box, 1 == Polygon, 2 == Freehand
	let currentTool = 1;

	// Stores if we are currently drawing a Polygon.
	let drawingPolygon = false;
	// Stores current points in polygon.
	let currentPoints = [];

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

	// Function to pause video.
	const pauseVideo = () => {
		videoElement.current.pause();
	}

	// Function to play video.
	const playVideo = () => {
		videoElement.current.play();
	}

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
		// Get context.
		displayContext = displayCanvas.current.getContext('2d');
		displayContext.strokeStyle = 'red';
		displayContext.fillStyle = 'red';
		// Clear display canvas.
		displayContext.clearRect(0, 0, 
			drawingCanvas.current.getBoundingClientRect().width, drawingCanvas.current.getBoundingClientRect().height);
		// Go over each annotation
		for(const annotation of annotations) {
			if(annotation.type == "BOX") {
				// Get the boxes bounds.
				const [startX, startY] = percentToCanvasPixels(annotation.start[0], annotation.start[1]);
				const [endX, endY] = percentToCanvasPixels(annotation.end[0], annotation.end[1]);
				console.log(startX, startY, endX, endY);
				// Draw it on the display canvas.
				displayContext.strokeRect(startX, startY, endX-startX, endY-startY);
			}
			if(annotation.type == "POLYGON") {
				// Get the first point.
				const [startX, startY] = percentToCanvasPixels(annotation.points[0][0], annotation.points[0][1]);
				// Draw first point.
				displayContext.beginPath();
				displayContext.arc(startX, startY, 5, 0, 2*Math.PI);
				displayContext.stroke();
				displayContext.fill();
				// Store last point coordinates.
				let lastX, lastY;
				lastX = startX;
				lastY = startY;
				for(const point of annotation.points.slice(1)) {
					// Get coordinates of current point.
					const [currentX, currentY] = percentToCanvasPixels(point[0], point[1]);
					// Draw point.
					displayContext.beginPath();
					displayContext.arc(currentX, currentY, 5, 0, 2*Math.PI);
					displayContext.stroke();
					displayContext.fill();
					// Join point to last point.
					displayContext.beginPath();
					displayContext.moveTo(lastX, lastY);
					displayContext.lineTo(currentX, currentY);
					displayContext.stroke();
					// Update last coordinates.
					lastX = currentX;
					lastY = currentY;
				}
				// Close polygon.
				displayContext.beginPath();
				displayContext.moveTo(lastX, lastY);
				displayContext.lineTo(startX, startY);
				displayContext.stroke();
			}
		}
	}

	const closePolygon = () => {
		currentContext = drawingCanvas.current.getContext('2d');
		// Draw a line from the last point to the starting point.
		// Get last point.
		const lastPoint = currentPoints[currentPoints.length-1];
		// Convert coords to canvas pixels.
		const [lastX, lastY] = percentToCanvasPixels(lastPoint[0], lastPoint[1]);
		// Get first point.
		const firstPoint = currentPoints[0];
		// Convert coords to canvas pixels.
		const [startX, startY] = percentToCanvasPixels(firstPoint[0], firstPoint[1]);
		// Draw line.
		currentContext.beginPath();
		currentContext.moveTo(lastX, lastY);
		currentContext.lineTo(startX, startY);
		currentContext.stroke();
		// Add this to the list of annotations.
		let newAnnotation = {}
		newAnnotation["type"] = "POLYGON";
		newAnnotation["points"] = currentPoints;

		annotations.push(newAnnotation);

		// We are no longer drawing.
		drawingPolygon = false;

		// Clear points array.
		currentPoints = [];

		// Clear drawing canvas.
		currentContext.clearRect(0, 0, 
			drawingCanvas.current.getBoundingClientRect().width, drawingCanvas.current.getBoundingClientRect().height);
		
		// Redraw display canvas.
		drawAnnotations();
	}

	// Function that runs once mouse is clicked, Used for drawing annotations
	const mouseDown = (e) => {
		// NOTE: WHY DOES THIS NEED TO BE HERE??
		currentContext = drawingCanvas.current.getContext('2d');	
		currentContext.strokeStyle = 'green';
		currentContext.fillStyle = 'green';
		// Get current location.
		const clientX = e.clientX;
		const clientY = e.clientY;
		// Convert X and Y to percentage
		const [xPercent, yPercent] = coordsToPercent(clientX, clientY);
		// Check if we are meant to be drawing a bounding box.
		if(currentTool == 0) {
			// Start drawing new box
			drawingBox = true;
			// Store starting position
			initialX = xPercent;
			initialY = yPercent;
			const [startX, startY] = percentToCanvasPixels(initialX, initialY);
		}
		// Check if we are meant to be drawing a polygon.
		else if(currentTool == 1) {
			// Convert the starting X Y percentages into coordinates for drawing.
			const [startX, startY] = percentToCanvasPixels(xPercent, yPercent);
			// Check if we are starting a new polygon.
			if(drawingPolygon == false) {
				// Set that we are starting a new polygon.
				drawingPolygon = true;
			}
			// If we are already drawing a polygon join the last point to this one.
			else {
				// Check if they have clicked near the starting point, If so close the polygon.
				const distanceToBeginning = Math.sqrt((xPercent-currentPoints[0][0])**2 + (yPercent-currentPoints[0][1])**2);
				if(distanceToBeginning <= polygonCloseRadius) {
					closePolygon();
					return;
				}
				// Get last point.
				const lastPoint = currentPoints[currentPoints.length-1];
				// Convert coords to canvas pixels.
				const [lastX, lastY] = percentToCanvasPixels(lastPoint[0], lastPoint[1]);
				// Draw line.
				currentContext.beginPath();
				currentContext.moveTo(lastX, lastY);
				currentContext.lineTo(startX, startY);
				currentContext.stroke();
			}
			// Draw first point in polygon.
			currentContext.beginPath();
			currentContext.arc(startX, startY, 5, 0, 2*Math.PI);
			currentContext.stroke();
			currentContext.fill();
			// Add point to path.
			currentPoints.push([xPercent, yPercent]);
		}
	}

	const mouseMove = (e) => {
		// Check if we are currently drawing a box
		if(drawingBox) {
			console.log("DRAWING BOX.");
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
		<div>
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
			<button onClick={() => pauseVideo()}>Pause</button>
			<button onClick={() => playVideo()}>Play</button>
			<button onClick={() => {currentTool = 0;}}>Draw bounding box</button>
			<button onClick={() => {currentTool = 1;}}>Draw polygon.</button>
		</div>
	);
}

export default CanvasComponent;
