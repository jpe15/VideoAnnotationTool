import React, { createContext, useContext, useState, useEffect } from "react";
import StartUpModal from "./StartUpModal";
import "../styles/App.css";

const AnnotationsContext = createContext();
const UpdateAnnotationsContext = createContext();
const ToolContext = createContext();
const UpdateToolContext = createContext();
const VideoPathContext = createContext();
const UpdateVideoPathContext = createContext();
const ScreenshotsContext = createContext();
const UpdateScreenshotsContext = createContext();
const ProjectNameContext = createContext();
const UpdateProjectNameContext = createContext();
const StartUpModalContext = createContext();
const UpdateStartUpModalContext = createContext();
const JumpToTimeContext = createContext();
const UpdateJumpToTimeContext = createContext();

export const useJumpToTime = () => {
	const jumpToTime = useContext(JumpToTimeContext);
	const setJumpToTime = useContext(UpdateJumpToTimeContext);
	return [jumpToTime, setJumpToTime];
};

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

export const useProjectName = () => {
	const projectName = useContext(ProjectNameContext);
	const setProjectName = useContext(UpdateProjectNameContext);
	return [projectName, setProjectName];
};

export const useStartUpModal = () => {
	const isStartUpModal = useContext(StartUpModalContext);
	const setIsStartUpModal = useContext(UpdateStartUpModalContext);
	return [isStartUpModal, setIsStartUpModal];
};

const AppContext = ({ children }) => {
	const [annotations, setAnnotationsS] = useState([]);
	const [screenshots, setScreenshotsS] = useState({});
	const [tool, setToolS] = useState(1);
	const [videoPath, setVideoPathS] = useState("");
	const [isStartUpModal, setIsStartUpModal] = useState(true);
	const [projectName, setProjectNameS] = useState("");
	const [jumpToTime, setJumpToTime] = useState(0);

	useEffect(() => {
		if (localStorage.getItem("videoPath") && localStorage.getItem("projectName")) {
			setVideoPathS(localStorage.getItem("videoPath"));
			setProjectNameS(localStorage.getItem("projectName"));
			setAnnotationsS(JSON.parse(localStorage.getItem("annotations")));
			setToolS(localStorage.getItem("tool"));
			setScreenshotsS(JSON.parse(localStorage.getItem("screenshots")));
			setIsStartUpModal(false);
		} else {
			setIsStartUpModal(true);
		}
	}, []);

	useEffect(() => {
		if (videoPath !== "" && videoPath) {
			setIsStartUpModal(false);
		}
	}, [videoPath]);

	useEffect(() => {
	}, [isStartUpModal]);

	const setProjectName = (projectNameN) => {
		localStorage.setItem("projectName", projectNameN);
		setProjectNameS(projectNameN);
	};

	const setAnnotations = (annotationsN) => {
		localStorage.setItem("annotations", JSON.stringify(annotationsN));
		setAnnotationsS(annotationsN);
	};

	const setScreenshots = (screenshotsN) => {
		localStorage.setItem("screenshots", JSON.stringify(screenshotsN));
		setScreenshotsS(screenshotsN);
	};

	const setTool = (toolN) => {
		localStorage.setItem("tool", toolN);
		setToolS(toolN);
	};

	const setVideoPath = (videoPathN) => {
		localStorage.setItem("videoPath", videoPathN);
		setVideoPathS(videoPathN);
	};

	const createNewProject = (vidpath, projname) => {
		setVideoPath(vidpath);
		setProjectName(projname);
		setAnnotations([]);
		setTool(0);
		setScreenshots({});
		setIsStartUpModal(false);
	};

	return (
		<JumpToTimeContext.Provider value={jumpToTime}>
			<UpdateJumpToTimeContext.Provider value={setJumpToTime}>
				<StartUpModalContext.Provider value={isStartUpModal}>
					<UpdateStartUpModalContext.Provider value={setIsStartUpModal}>
						<ProjectNameContext.Provider value={projectName}>
							<UpdateProjectNameContext.Provider value={setProjectName}>
								<ScreenshotsContext.Provider value={screenshots}>
									<UpdateScreenshotsContext.Provider value={setScreenshots}>
										<AnnotationsContext.Provider value={annotations}>
											<UpdateAnnotationsContext.Provider value={setAnnotations}>
												<ToolContext.Provider value={tool}>
													<UpdateToolContext.Provider value={setTool}>
														<VideoPathContext.Provider value={videoPath}>
															<UpdateVideoPathContext.Provider value={setVideoPath}>
																<StartUpModal isOpen={isStartUpModal} createNewProject={createNewProject} />
																<div className="container">{children}</div>
															</UpdateVideoPathContext.Provider>
														</VideoPathContext.Provider>
													</UpdateToolContext.Provider>
												</ToolContext.Provider>
											</UpdateAnnotationsContext.Provider>
										</AnnotationsContext.Provider>
									</UpdateScreenshotsContext.Provider>
								</ScreenshotsContext.Provider>
							</UpdateProjectNameContext.Provider>
						</ProjectNameContext.Provider>
					</UpdateStartUpModalContext.Provider>
				</StartUpModalContext.Provider>
			</UpdateJumpToTimeContext.Provider>
		</JumpToTimeContext.Provider>
	);
};

export default AppContext;
