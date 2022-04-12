// SPDX-License-Identifier: Apache-2.0

import React, { createContext, useContext, useState, useEffect } from "react";
import StartUpModal from "./StartUpModal";
import "../styles/App.css";
import ExportModal from "./ExportModal";

const AnnotationsContext = createContext();
const UpdateAnnotationsContext = createContext();
const ToolContext = createContext();
const UpdateToolContext = createContext();
const VideoPathContext = createContext();
const UpdateVideoPathContext = createContext();
const ProjPathContext = createContext();
const UpdateProjPathContext = createContext();
const ScreenshotsContext = createContext();
const UpdateScreenshotsContext = createContext();
const ProjectNameContext = createContext();
const UpdateProjectNameContext = createContext();
const StartUpModalContext = createContext();
const UpdateStartUpModalContext = createContext();
const ExportModalContext = createContext();
const UpdateExportModalContext = createContext();
const JumpToTimeContext = createContext();
const UpdateJumpToTimeContext = createContext();
const FrameCommentContext = createContext();
const UpdateFrameCommentContext = createContext();
const CurrentTimeContext = createContext();
const UpdateCurrentTimeContext = createContext();

export const useCurrentTime = () => {
	const currentTime = useContext(CurrentTimeContext);
	const setCurrentTime = useContext(UpdateCurrentTimeContext);
	return [currentTime, setCurrentTime];
};

export const useFrameComments = () => {
	const frameComments = useContext(FrameCommentContext);
	const setFrameComments = useContext(UpdateFrameCommentContext);
	return [frameComments, setFrameComments];
};

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

export const useProjPath = () => {
	const projPath = useContext(ProjPathContext);
	const setProjPath = useContext(UpdateProjPathContext);
	return [projPath, setProjPath];
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

export const useExportModal = () => {
	const isExportModal = useContext(ExportModalContext);
	const setIsExportModal = useContext(UpdateExportModalContext);
	return [isExportModal, setIsExportModal];
};

const AppContext = ({ children }) => {
	const [annotations, setAnnotationsS] = useState([]);
	const [screenshots, setScreenshotsS] = useState({});
	const [frameComments, setFrameCommentsS] = useState({});
	const [tool, setToolS] = useState(1);
	const [videoPath, setVideoPathS] = useState("");
	const [projPath, setProjPathS] = useState("");
	const [isStartUpModal, setIsStartUpModal] = useState(true);
	const [projectName, setProjectNameS] = useState("");
	const [jumpToTime, setJumpToTime] = useState(0);
	const [currentTime, setCurrentTimeS] = useState(0);
	const [isExportModal, setIsExportModal] = useState(false);

	useEffect(() => {
		if (localStorage.getItem("videoPath") && localStorage.getItem("projectName")) {
			setVideoPathS(localStorage.getItem("videoPath"));
			setProjectNameS(localStorage.getItem("projectName"));
			setProjPathS(localStorage.getItem("projPath"));
			setAnnotationsS(JSON.parse(localStorage.getItem("annotations")));
			setToolS(localStorage.getItem("tool"));
			setScreenshotsS(JSON.parse(localStorage.getItem("screenshots")));
			if (localStorage.getItem("frameComments")) {
				setFrameCommentsS(JSON.parse(localStorage.getItem("frameComments")));
			}
			if (localStorage.getItem("currentTime")) {
				setCurrentTimeS(localStorage.getItem("currentTime"));
			} else {
				setCurrentTimeS(0);
			}
			setIsStartUpModal(false);
			setIsExportModal(false);
		} else {
			setIsStartUpModal(true);
		}
	}, []);

	useEffect(() => {
		if (videoPath !== "" && videoPath) {
			setIsStartUpModal(false);
		}
	}, [videoPath]);

	useEffect(() => {}, [isStartUpModal]);

	const setCurrentTime = (time) => {
		localStorage.setItem("currentTime", time);
		setCurrentTimeS(time);
	};

	const setProjectName = (projectNameN) => {
		localStorage.setItem("projectName", projectNameN);
		setProjectNameS(projectNameN);
	};

	const setFrameComments = (frameCommentsN) => {
		localStorage.setItem("frameComments", JSON.stringify(frameCommentsN));
		console.log("set frame comments in localStorage ", JSON.stringify(frameCommentsN));
		setFrameCommentsS(frameCommentsN);
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

	const setProjPath = (projPathN) => {
		localStorage.setItem("projPath", projPathN);
		setProjPathS(projPathN);
	};

	const createNewProject = (vidpath, projname) => {
		setProjPath("");
		setVideoPath(vidpath);
		setProjectName(projname);
		setAnnotations([]);
		setTool(0);
		setScreenshots({});
		setFrameComments({});
		setIsStartUpModal(false);
		setIsExportModal(false);
	};

	return (
		<CurrentTimeContext.Provider value={currentTime}>
			<UpdateCurrentTimeContext.Provider value={setCurrentTime}>
				<FrameCommentContext.Provider value={frameComments}>
					<UpdateFrameCommentContext.Provider value={setFrameComments}>
						<UpdateExportModalContext.Provider value={setIsExportModal}>
							<ExportModalContext.Provider value={isExportModal}>
								<UpdateProjPathContext.Provider value={setProjPath}>
									<ProjPathContext.Provider value={projPath}>
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
																								<StartUpModal
																									isOpen={isStartUpModal}
																									createNewProject={createNewProject}
																								/>
																								<div className="container">{children}</div>
																								<ExportModal isOpen={isExportModal}></ExportModal>
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
									</ProjPathContext.Provider>
								</UpdateProjPathContext.Provider>
							</ExportModalContext.Provider>
						</UpdateExportModalContext.Provider>
					</UpdateFrameCommentContext.Provider>
				</FrameCommentContext.Provider>
			</UpdateCurrentTimeContext.Provider>
		</CurrentTimeContext.Provider>
	);
};

export default AppContext;
