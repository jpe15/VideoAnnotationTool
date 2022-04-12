// SPDX-License-Identifier: Apache-2.0
/* eslint-disable */

import styled from "styled-components";
import { useStartUpModal, useExportModal, useVideoPath } from "./AppContext";

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

const TopButtons = () => {

	const [, setVideoPath] = useVideoPath();
	const [, setIsStartUpModal] = useStartUpModal();
	const [, setIsExportModal] = useExportModal();

	// Handle video upload.
	async function uploadVideo(e) {
		const file = e.target.files[0];
		setVideoPath(file.path);
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
