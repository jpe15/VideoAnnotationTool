import React, { createContext, useContext, useState } from "react";
import "../styles/AppContext.css";

export const AnnotationsContext = createContext();
export const UpdateAnnotationsContext = createContext();

export const ToolContext = createContext();
export const UpdateToolContext = createContext();

export const VideoPathContext = createContext();
export const UpdateVideoPathContext = createContext();

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
		<div className="app-context">
			<AnnotationsContext.Provider value={annotations}>
				<UpdateAnnotationsContext.Provider value={setAnnotations}>
					<ToolContext.Provider value={tool}>
						<UpdateToolContext.Provider value={setTool}>
							<VideoPathContext.Provider value={videoPath}>
								<UpdateVideoPathContext.Provider value={setVideoPath}>
									{children}
								</UpdateVideoPathContext.Provider>
							</VideoPathContext.Provider>
						</UpdateToolContext.Provider>
					</ToolContext.Provider>
				</UpdateAnnotationsContext.Provider>
			</AnnotationsContext.Provider>
		</div>
	);
};

export default AppContext;
