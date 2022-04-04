// This is an example of how to export files, but will likely not be it's own component.

import { useEffect, useState } from "react";
import { useAnnotations, useScreenshots, useVideoPath } from "./AppContext";
const electron = window.require("electron");
//ipcRenderer is used to read/write data from/to files
const {ipcRenderer} = require("electron");


// Takes props, but these may eventually be changed to global context values
//All of the functionality of Exporting a JSON file will be done here.
const ExportButton = ({ projName }) => {
	const [annotations] = useAnnotations();
	const [videoPath] = useVideoPath();
	const [screenshots] = useScreenshots();
	//This hook is not working fine please check
	
	//This function is actually responsible for exporting the file
	const sendExport = () => {
		const args = {
			//string and an object will be passed as argument from ipcRenderer to ipcMain
			projName: projName,
			videoPath: videoPath,
			data: annotations,
			metadata: screenshots,		//<<--- undefined
		};

		//################### IMPORTANT ###################
		//TODO: the metadata is giving undefined 
		//################### IMPORTANT ###################
		//sending signal to IPC_MAIN
		ipcRenderer.send("export", args);
		ipcRenderer.once("exported", (e, ret) => {});
	};

	//on clicking the Export button this will be returned and function sendExport (written above) will be called
	return (
		<button className="top-bar-button__export" onClick={sendExport}>
			Export
		</button>
	);
};

export default ExportButton;
