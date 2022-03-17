import React from "react";
import styled from "styled-components";
import { useVideoPath } from "./AppContext";
import { useAnnotations } from "./AppContext";
const electron = window.require("electron");

const Button = styled.button`
	background-color: #3949ab;
	color: white;
	padding: 5px 15px;
	border-radius: 5px;
	height: 60px;
	width: 280px;
	text-transform: uppercase;
	cursor: pointer;
	outline: 0;
	transition: ease background-color 250ms;
	margin: 20px 70px;
	&:hover {
		background-color: #283593;
	}
`;

function uploadFile() {
	document.getElementById("selectFile").click();
}

const TopButtons = ({ projName }) => {

	const [, setVideoPath] = useVideoPath();
	const [annotations] = useAnnotations();

	const sendExport = () => {
		const args = {
			projName: projName,
			data: annotations,
		};

		electron.ipcRenderer.send("export", args);
		electron.ipcRenderer.once("exported", (e, ret) => {});
	};


	return (
		<div>
			<Button onClick={uploadFile.bind(this)}>Add New Video</Button>
			<Button>Import Existing Annotation</Button>
			<Button onClick={sendExport}>Export Annotations</Button>
			<input id="selectFile" type={"file"} style={{ display: "none" }} onChange={(e) => {setVideoPath(e.target.files[0].path);}}></input>
		</div>
	);
};
export default TopButtons;
