import React, { createContext, useContext, useState } from "react";
import Modal from "react-modal";
import StartUpModal from "./StartUpModal";
import "../styles/App.css";

export const AnnotationsContext = createContext();
export const UpdateAnnotationsContext = createContext();

export const ToolContext = createContext();
export const UpdateToolContext = createContext();

export const VideoPathContext = createContext();
export const UpdateVideoPathContext = createContext();

export const ScreenshotsContext = createContext();
export const UpdateScreenshotsContext = createContext();

export const useScreenshots = () => {
	const screenshots = useContext(ScreenshotsContext);
	const setScreenshots = useContext(UpdateScreenshotsContext);
	return [screenshots, setScreenshots];
};

export const useAnnotations = () => {
	const annotations = useContext(AnnotationsContext);
	const setAnnotations = useContext(UpdateAnnotationsContext);
	return [annotations, setAnnotations];
};

export const useTool = () => {
	const tool = useContext(ToolContext);
	const setTool = useContext(UpdateToolContext);
	return [tool, setTool];
};

export const useVideoPath = () => {
	const videoPath = useContext(VideoPathContext);
	const setVideoPath = useContext(UpdateVideoPathContext);
	return [videoPath, setVideoPath];
};

const AppContext = ({ children }) => {
	const [annotations, setAnnotations] = useState([]);
	const [tool, setTool] = useState(1);
	const [videoPath, setVideoPath] = useState("");

	return (
		<AnnotationsContext.Provider value={annotations}>
			<UpdateAnnotationsContext.Provider value={setAnnotations}>
				<ToolContext.Provider value={tool}>
					<UpdateToolContext.Provider value={setTool}>
						<VideoPathContext.Provider value={videoPath}>
							<UpdateVideoPathContext.Provider value={setVideoPath}>
								<StartUpModal isOpen={true}/>
								<div className="container">{children}</div>
							</UpdateVideoPathContext.Provider>
						</VideoPathContext.Provider>
					</UpdateToolContext.Provider>
				</ToolContext.Provider>
			</UpdateAnnotationsContext.Provider>
		</AnnotationsContext.Provider>
	);
};

export default AppContext;
