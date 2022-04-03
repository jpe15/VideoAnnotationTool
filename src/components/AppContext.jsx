import React, { createContext, useContext, useState } from "react";
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
	const [annotations, setAnnotationsS] = useState([]);
	const [screenshots, setScreenshotsS] = useState({});
	const [tool, setToolS] = useState(1);
	const [videoPath, setVideoPathS] = useState("");

	const setAnnotations = (annotationsN) => {
		sessionStorage.setItem("annotations", JSON.stringify(annotationsN));
		setAnnotationsS(annotationsN);
	};

	const setScreenshots = (screenshotsN) => {
		sessionStorage.setItem("screenshots", JSON.stringify(screenshotsN));
		setScreenshotsS(screenshotsN);
	};

	const setTool = (toolN) => {
		sessionStorage.setItem("tool", JSON.stringify(toolN));
		setToolS(toolN);
	};

	const setVideoPath = (videoPathN) => {
		sessionStorage.setItem("videoPath", JSON.stringify(videoPathN));
		setVideoPathS(videoPathN);
	};

	return (
		<ScreenshotsContext.Provider value={screenshots}>
			<UpdateScreenshotsContext.Provider value={setScreenshots}>
				<AnnotationsContext.Provider value={annotations}>
					<UpdateAnnotationsContext.Provider value={setAnnotations}>
						<ToolContext.Provider value={tool}>
							<UpdateToolContext.Provider value={setTool}>
								<VideoPathContext.Provider value={videoPath}>
									<UpdateVideoPathContext.Provider value={setVideoPath}>
										<StartUpModal isOpen={true} />
										<div className="container">{children}</div>
									</UpdateVideoPathContext.Provider>
								</VideoPathContext.Provider>
							</UpdateToolContext.Provider>
						</ToolContext.Provider>
					</UpdateAnnotationsContext.Provider>
				</AnnotationsContext.Provider>
			</UpdateScreenshotsContext.Provider>
		</ScreenshotsContext.Provider>
	);
};

export default AppContext;
