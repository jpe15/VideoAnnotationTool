import React from "react";
import { useVideoPath } from "./AppContext";
import ExportButton from './ExportButton'
import '../styles/TopButtonBar.css';
import ImportButton from "./ImportButton";

const TopBarButtons = () => {

	const [videoPath, setVideoPath] = useVideoPath();

	return (
		<div className="top-bar-button">
			<ImportButton></ImportButton>
			<ExportButton projName={"test"}></ExportButton>
		</div>
	);
};

export default TopBarButtons;
