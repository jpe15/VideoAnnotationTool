import React from "react";
import styled from "styled-components";
import { useExportModal, useProjectName, useScreenshots } from "./AppContext";
import { useStartUpModal, useVideoPath, useProjPath } from "./AppContext";
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
	constructor(imageName, timestamp, comment, annotations) {
		this.metadata = {
			imageName,
			timestamp,
			comment
		};
		this.annotations = annotations;
	}
}

const TopButtons = () => {

	const [videoPath, setVideoPath] = useVideoPath();
	const [annotations] = useAnnotations();
	const [screenshots, setScreenshots] = useScreenshots();
	const [, setIsStartUpModal] = useStartUpModal();
	const [projName] = useProjectName();
	const [, setProjPath] = useProjPath();
	const [, setIsExportModal] = useExportModal();

	// Handle video upload.
	async function uploadVideo(e) {
		const file = e.target.files[0];
		setVideoPath(file.path);
	}

	// Load metadata, annotations, and screenshots into zip file then download.
	function sendExport() {
		// addAnnotationsToOutput();

		let annotatedFrames = [];

		// Get keys of screenshots array, then add Blob of each screenshot to images folder.
		let keys = Object.keys(screenshots);

		for(let i = 0; i < keys.length; i++) {
			let timestr = keys[i];
			
			// Parse float from timestamp string, and use the time for the image name.
			let timestamp = parseFloat(timestr);
			let imageName = `${projName}_${timestamp}.png`;

			// Filter annotations to only include annotations for this timestamp.
			let frameAnnotations = annotations.filter(annotation => annotation.timestamp === timestamp);
			let comment = 'Placeholder comment';
			
			// Push new annotatedFrame object to array of frames to be added to zip file.
			let frame = new AnnotatedFrame(imageName, timestamp, comment, frameAnnotations);
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
		electron.ipcRenderer.once("exported", (e, ret) => {
			let newScreenshots = screenshots;
						
			for(let i = 0; i < ret.images.length; i++) {
				newScreenshots[ret.images[i].timestamp]["imageName"] = ret.images[i].name;
			}

			setProjPath(ret.folder);
			setScreenshots(newScreenshots);
		});
	}


	return (
		<>
			<Button onClick={() => {setIsStartUpModal(true);}}>Open Project</Button>
			<Button onClick={() => {setIsExportModal(true);}}>Export Project</Button>
			<input id="selectFile" type={"file"} style={{ display: "none" }} onChange={(e) => uploadVideo(e)}></input>
		</>
	);
};
export default TopButtons;
