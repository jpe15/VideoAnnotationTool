import "./styles/App.css";
import { useState, useRef, useEffect, createContext } from "react";
import CanvasComponent from "./components/CanvasComponent.jsx";
import AppContext from "./components/AppContext";
import TopButtons from "./components/TopButtons";
import AnnotationsBar from "./components/AnnotationsBar";

function App() {
	const [videoPath, setVideoPath] = useState("");
	const [annotations, setAnnotations] = useState([]);

	useEffect(() => {
		console.log("loaded");
		// setVideoPath("C:\\Users\\nickd\\Videos\\Scrum4Group9.mp4")
	}, []);

	return (
		<AppContext>
			<div>
				 <AnnotationsBar></AnnotationsBar>
			</div>
			<div className="app-main">
				<TopButtons projName={"test"}></TopButtons>
				<CanvasComponent videoSrc={videoPath}></CanvasComponent>
			</div>
		</AppContext>
	);
}

export default App;
