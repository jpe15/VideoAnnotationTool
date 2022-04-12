// SPDX-License-Identifier: Apache-2.0

import React, { useRef, useState } from "react";
import Modal from "react-modal/lib/components/Modal";
import "../styles/Modals.css";
import { useProjectName, useExportModal, useVideoPath, useProjPath, useScreenshots, useAnnotations, useFrameComments } from "./AppContext";
const electron = window.require("electron");

class AnnotatedFrame {
	constructor(imageName, timestamp, comment, annotations) {
		this.metadata = {
			imageName,
			timestamp,
			comment,
		};
		this.annotations = annotations;
	}
}

const customStyles = {
	overlay: {
		zIndex: "17",
	},
	content: {
		top: "50%",
		left: "50%",
		right: "auto",
		bottom: "auto",
		marginRight: "-50%",
		transform: "translate(-50%, -50%)",
		borderLeft: "0.5em solid #0f62fe",
		padding: "0",
		margin: "0",
		width: "75vw",
		height: "75vh",
		boxShadow: "1px 1px 6px 0px #0008",
		backgroundColor: "#f2f4f8",
	},
};

Modal.setAppElement("#root");

const ExportModal = ({ isOpen, createNewProject }) => {
	const [isNewProj, setIsNewProj] = useState(false);
	const [newProjName, setNewProjName] = useState("");
	const [projName, setProjectName] = useProjectName();
	const [projPath] = useProjPath();
	const [videoPath, setVideoPath] = useVideoPath();
	const [, setIsExportModal] = useExportModal();
	const [, setProjPath] = useProjPath();
	const [screenshots, setScreenshots] = useScreenshots();
	const [annotations, setAnnotations] = useAnnotations();
	const [currentScreenshotIndex, setCurrentScreenshotIndex] = useState(0);
	const [frameComments, setFrameComments] = useFrameComments();
	const [currentFrameComments, setCurrentFrameComments] = useState({});

	const inputRef = useRef();

	// Load metadata, annotations, and screenshots into zip file then download.
	function sendExport() {
		// addAnnotationsToOutput();

		let annotatedFrames = [];

		// Get keys of screenshots array, then add Blob of each screenshot to images folder.
		let keys = Object.keys(screenshots);

		for (let i = 0; i < keys.length; i++) {
			let timestr = keys[i];

			// Parse float from timestamp string, and use the time for the image name.
			let timestamp = parseFloat(timestr);
			let imageName = `${projName}_${timestamp}.png`;

			// Filter annotations to only include annotations for this timestamp.
			let frameAnnotations = annotations.filter((annotation) => annotation.timestamp === timestamp);

			// get rid of timestamp and selected
			for (let key in frameAnnotations) {
				delete frameAnnotations[key].selected;
				delete frameAnnotations[key].timestamp;
				if (frameAnnotations[key].comment == "") {
					frameAnnotations[key].comment = null;
				}

				if (frameAnnotations[key].label == "") {
					frameAnnotations[key].label = null;
				}
			}

			let newcomment = null;
			if (frameComments[timestr]) {
				newcomment = frameComments[timestr];
			}


			// Push new annotatedFrame object to array of frames to be added to zip file.
			let frame = new AnnotatedFrame(imageName, timestamp, newcomment, frameAnnotations);
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
			if (ret.value != 1) {	
				let newScreenshots = {};
				console.log(ret);
				for (let i = 0; i < ret.images.length; i++) {
					newScreenshots[ret.images[i].timestamp] = {"imageName":ret.images[i].name};
					//console.log(newScreenshots[ret.imageNames[i].timestamp]);
				}
	
				setProjPath(ret.folder);
				setScreenshots(newScreenshots);
			}
		});

		setIsExportModal();
	}

	const advanceScreenshot = (num, len) => {
		if (num == 1) {
			if (currentScreenshotIndex < len - 1) {
				if (frameComments[Object.keys(frameComments)[currentScreenshotIndex+ 1]] != null || frameComments[Object.keys(frameComments)[currentScreenshotIndex+ 1]] != "") {
					inputRef.current.value = frameComments[Object.keys(frameComments)[currentScreenshotIndex+ 1]];
				} else {
					inputRef.current.value = "";
				}
				setCurrentScreenshotIndex(currentScreenshotIndex + 1);
			}
		} else {
			if (currentScreenshotIndex > 0) {
				if (frameComments[Object.keys(frameComments)[currentScreenshotIndex- 1]] != null || frameComments[Object.keys(frameComments)[currentScreenshotIndex- 1]] != "") {
					inputRef.current.value = frameComments[Object.keys(frameComments)[currentScreenshotIndex- 1]];
				} else {
					inputRef.current.value = "";
				}
				setCurrentScreenshotIndex(currentScreenshotIndex - 1);
			}
		}
		
	};

	const updateComment = (comment) => {
		let keys = Object.keys(screenshots);
		let currKey = keys[currentScreenshotIndex];
		console.log("updating comment: ", comment);
		let curr = frameComments;
		curr[currKey] = comment;
		setFrameComments(curr);
	}

	const getImages = () => {
		let keys = Object.keys(screenshots);
		for (let idx in screenshots) {
			if (currentScreenshotIndex == keys.indexOf(idx)) {
				if (screenshots[idx].imageName === "") {
					return <img src={screenshots[idx].screenshot}></img>;
				} else {
					return <img src={`File://${projPath}/${screenshots[idx].imageName}`}></img>;
				}
			}
		}
	};

	return (
		<Modal style={customStyles} contentLabel="Start Modal" isOpen={isOpen}>
			<div className="modal__title">Optionally add comments to each of the frames</div>
			<div className="modal__body--images">
				{getImages()}
				<input ref={inputRef} type="text" className="modal__body--images--textarea" placeholder="Comment here..." onBlur={(e) => updateComment(e.target.value)}></input>
				{/* {frameComments[Object.keys(frameComments)[currentScreenshotIndex]] && <div className="modal__body--p"><b>Existing comment: </b><p> {frameComments[Object.keys(frameComments)[currentScreenshotIndex]]}</p></div>} */}
			</div>
			<div className="export-modal__footer">
				<button className="modal__button" onClick={() => advanceScreenshot(-1, Object.keys(screenshots).length)}>Previous Image</button>
				<button className="modal__button" onClick={() => advanceScreenshot(1, Object.keys(screenshots).length)}>Next Image</button>
				<button className="modal__button" onClick={() => {sendExport();}}>Export</button>
			</div>
		</Modal>
	);
};

export default ExportModal;
