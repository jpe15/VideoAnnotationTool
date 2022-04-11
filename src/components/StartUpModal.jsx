import React, {useState} from "react";
import Modal from "react-modal/lib/components/Modal";
import "../styles/Modals.css";
import { useProjectName, useStartUpModal, useVideoPath, useProjPath, useScreenshots, useAnnotations, useFrameComments } from "./AppContext";


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
		width: "50vw",
		height: "50vh",
		boxShadow: "1px 1px 6px 0px #0008",
		backgroundColor: "#f2f4f8"
	},
};

Modal.setAppElement("#root");

const uploadFile = () => {
	document.getElementById("selectFileN").click();
}

const importProj = () => {
	document.getElementById("selectJSON").click();
}

const StartUpModal = ({ isOpen, createNewProject }) => {

	const [isNewProj, setIsNewProj] = useState(false);
	const [newProjName, setNewProjName] = useState("");
	const [, setProjectName] = useProjectName();
	const [videoPath, setVideoPath] = useVideoPath();
	const [, setIsStartUpModal] = useStartUpModal();
	const [, setProjPath] = useProjPath();
	const [, setScreenshots] = useScreenshots();
	const [, setAnnotations] = useAnnotations();
	const [, setFrameComments] = useFrameComments();

	const uploadJSON = (e) => {
		const file = e.target.files[0];
		const reader = new FileReader();
		reader.onload = (e) => {
			const data = JSON.parse(e.target.result);
			setProjectName(data.projectName);
			setProjPath(data.projectPath);
			setVideoPath(data.videoPath);

			let newAnnotations = [];
			let newScreenshots = {};
			let comments = {};
			for(let frame of data.annotatedFrames) {
				let timestamp = frame.metadata.timestamp;
				if (frame.comment != null) {
					
					comments.timestamp = frame.comment;
				} else {
					comments.timestamp = "";
				}
				let temp = [];

				for(let anno of frame.annotations) {
					// adding back in the neccessary additional info
					anno.timestamp = timestamp;
					anno.selected = false;

					if (anno.label == null) {
						anno.label = "";
					}

					if (anno.comment == null) {
						anno.comment = "";
					}

					temp.push(anno);
				}

				for(let xyz of temp){
					newAnnotations.push(xyz);
				}
				
				newScreenshots[timestamp] = {
					"imageName": frame.metadata.imageName
				}
			}

			setAnnotations(newAnnotations);
			setScreenshots(newScreenshots);
			setFrameComments(comments);
		};
		reader.readAsText(file);
	}
	
	return (
		<Modal style={customStyles} contentLabel="Start Modal" isOpen={isOpen}>
			<div className="modal__title">
				Create a New Project or Open an Existing One
			</div>
			<div className="modal__body">
					{videoPath !== "" && <button onClick={() => {setIsStartUpModal(false); setIsNewProj(false);}}>Current Project</button>}
				<div className="modal__body--newproj">
					{!isNewProj && <button onClick={() => {setIsNewProj(true);}}>Create Project</button>}
					{isNewProj && <input placeholder="Name your project" onChange={(e) => {setNewProjName(e.target.value)}}></input>}
					{newProjName !== "" && isNewProj && <button onClick={() => {uploadFile();}}>Select Video</button>}
					<input id="selectFileN" type={"file"} style={{ display: "none" }} onChange={(e) => {createNewProject(e.target.files[0].path, newProjName);}}></input>
				</div>
				<button onClick={() => {setIsNewProj(false); importProj();}}>Import Project</button>
			</div>
			{!isNewProj && <div className="modal__footer">
				<p>If importing an existing project, make sure to select your 'json' metadata file that was previously exported</p>
			</div>}
			<input id="selectJSON" type={"file"} style={{ display: "none" }} onChange={(e) => uploadJSON(e)}></input>
		</Modal>
	);
};

export default StartUpModal;
