import React from "react";
import styled from "styled-components";
import { useVideoPath } from "./AppContext";
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
		<>
			<Button onClick={uploadFile.bind(this)}>New Project</Button>
			<Button>Import Project</Button>
			<Button onClick={sendExport}>Export Project</Button>
			<input id="selectFile" type={"file"} style={{ display: "none" }} onChange={(e) => {setVideoPath(e.target.files[0].path);}}></input>
		</>
	);
};
export default TopButtons;
