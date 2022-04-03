import React, {useEffect, useState} from "react";
import Modal from "react-modal/lib/components/Modal";
import "../styles/Modals.css";
import { useProjectName, useVideoPath } from "./AppContext";

const customStyles = {
	overlay: {
		zIndex: "11",
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

const StartUpModal = ({ isOpen, createNewProject }) => {

	const [isNewProj, setIsNewProj] = useState(false);
	const [newProjName, setNewProjName] = useState("");
	const [projectName, setProjectName] = useProjectName();
	const [videoPath, setVideoPath] = useVideoPath();
	
	return (
		<Modal style={customStyles} contentLabel="Start Modal" isOpen={isOpen}>
			<div className="modal__title">
				Create a New Project or Open an Existing One
			</div>
			<div className="modal__body">
				<div className="modal__body--newproj">
					{!isNewProj && <button onClick={() => {setIsNewProj(true);}}>Create Project</button>}
					{isNewProj && <input placeholder="Name your project" onChange={(e) => {setNewProjName(e.target.value)}}></input>}
					{newProjName !== "" && isNewProj && <button onClick={() => {uploadFile();}}>Select Video</button>}
					<input id="selectFileN" type={"file"} style={{ display: "none" }} onChange={(e) => {setProjectName(newProjName); setVideoPath(e.target.files[0].path);}}></input>
				</div>
				<button onClick={() => {setIsNewProj(false);}}>Import Project</button>
			</div>
			{!isNewProj && <div className="modal__footer">
				<p>If importing an existing project, make sure to select your 'json' metadata file that was previously exported</p>
			</div>}
		</Modal>
	);
};

export default StartUpModal;
