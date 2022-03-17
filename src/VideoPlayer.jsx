import React from 'react';
import { useState } from 'react'

const VideoPlayer = (props) => {
	return (
		<video style={{"objectFit": "contain"}} controls>
			<source src={props.videoSrc} type="video/mp4"/>
		</video>
	);
};

export default VideoPlayer;
