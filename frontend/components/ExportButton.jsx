// This is an example of how to export files, but will likely not be it's own component.

import { useEffect, useState } from "react";
import { useAnnotations } from "./AppContext";
const electron = window.require("electron");

// Takes props, but these may eventually be changed to global context values
const ExportButton = ({ projName }) => {
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
		<button className="top-bar-button__export" onClick={sendExport}>
			Export
		</button>
	);
};

export default ExportButton;
