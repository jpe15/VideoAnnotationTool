import React from 'react';
import { useState } from 'react'
import VideoPlayer from "./VideoPlayer.jsx"

const CanvasComponent = (props) => {
	return (
		<div className="CanvasComponent">
			<VideoPlayer videoSrc={props.videoSrc}></VideoPlayer>
		</div>
	);
}

export default CanvasComponent;
