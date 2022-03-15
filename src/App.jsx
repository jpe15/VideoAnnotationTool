import "./styles/App.css";
import { useState, useRef, useEffect, createContext } from "react";
import CanvasComponent from "./CanvasComponent.jsx";


function App() {
	const [videoPath, setVideoPath] = useState("");
	const [annotations, setAnnotations] = useState([]);

	useEffect(() => {
		console.log("loaded");
		// setVideoPath("C:\\Users\\nickd\\Videos\\Scrum4Group9.mp4")
	}, []);

	return (
		<div>
			<CanvasComponent videoSrc={videoPath}></CanvasComponent>
			<button onClick={() => setVideoPath("C:\\Users\\nickd\\Videos\\Scrum4Group9.mp4")}>upload vid</button>
		</div>
	);
}

export default App;
