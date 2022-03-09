import React from 'react';
import { useState, useRef } from 'react'
import "./styles/Canvas.css"

class CanvasComponent extends React.Component {
	// currentTool stores which tool is currently being used.
	// 0 == Box, 1 == Polygon, 2 == Freehand
	constructor(props) {
		super(props);
		this.state = {
			currentTool: 0,
		}
	}

	resizeCanvas() {
		console.log(this.refs.video);
	}

	render() {
		return (
			<div className="CanvasComponent">
				<video ref="video" className="video" onLoadedData={() => this.resizeCanvas()} autoPlay controls>
					<source src={this.props.videoSrc} type="video/mp4"/>
				</video>
				<canvas ref="canvas" className="canvas"/>
			</div>
		);
	}
}

export default CanvasComponent;
