import React from "react";
import styled from "styled-components";
import { useProjectName, useScreenshots } from "./AppContext";
import { useStartUpModal, useVideoPath } from "./AppContext";
import { useAnnotations } from "./AppContext";
const electron = window.require("electron");

const Button = styled.button`
	background-color: #0f62fe;
	font-size: 1.25rem;
	color: white;
	padding: 5px 15px;
	border: none;
	text-align: left;
	height: 60px;
	width: fit-content;
	min-width: 15rem;
	white-space: nowrap;
	height: 4rem;
	cursor: pointer;
	outline: 0;
	transition: ease background-color 250ms;
	&:hover {
		background-color: #283593;
	}
`;

class AnnotatedFrame {
	constructor(imageName, timeStamp, comment, annotations) {
		this.metadata = {
			imageName,
			timeStamp,
			comment
		};
		this.annotations = annotations;
	}
}

const TopButtons = () => {

	const [videoPath, setVideoPath] = useVideoPath();
	const [annotations] = useAnnotations();
	const [screenshots] = useScreenshots();
	const [isStartUpModal, setIsStartUpModal] = useStartUpModal();
	const [projName] = useProjectName();

	// Handle video upload.
	async function uploadVideo(e) {
		const file = e.target.files[0];
		setVideoPath(file.path);
	}

	// Load metadata, annotations, and screenshots into zip file then download.
	function sendExport() {
		// addAnnotationsToOutput();

		let annotatedFrames = [];
		console.log('Screenshots: ', screenshots);

		// Get keys of screenshots array, then add Blob of each screenshot to images folder.
		let keys = Object.keys(screenshots);
		for(let i = 0; i < keys.length; i++) {
			let timestr = keys[i];
			
			// Parse float from timestamp string, and use the time for the image name.
			let timestamp = parseFloat(timestr);
			let imageName = `time_${timestamp}.png`;

			// Filter annotations to only include annotations for this timestamp.
			let frameAnnotations = annotations.filter(annotation => annotation.timestamp === timestamp);
			let comment = 'Placeholder comment';
			
			// Push new annotatedFrame object to array of frames to be added to zip file.
			let frame = new AnnotatedFrame(imageName, timestamp, comment, frameAnnotations);
			console.log(frame);
			annotatedFrames.push(frame);
		}

		// Data to pass to backend.
		const args = {
			projName: projName,
			videoPath: videoPath,
			annotatedFrames: annotatedFrames,
			images: screenshots
		};

		// Send to backend
		electron.ipcRenderer.send("export", args);
		electron.ipcRenderer.once("exported", (e, ret) => {});
	}


	return (
		<>
			<Button onClick={() => {setIsStartUpModal(true);}}>New Project</Button>
			<Button>Import Project</Button>
			<Button onClick={sendExport}>Export Project</Button>
			<input id="selectFile" type={"file"} style={{ display: "none" }} onChange={(e) => uploadVideo(e)}></input>
		</>
	);
};
export default TopButtons;
