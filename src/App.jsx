import "./styles/App.css";
import Toolbar from './components/Toolbar'
import { useState, useRef, useEffect, createContext } from "react";
import CanvasComponent from "./components/CanvasComponent.jsx";
import AppContext from "./components/AppContext";
import Export from "./components/Export";


function App() {
	const [videoPath, setVideoPath] = useState("");
	const [annotations, setAnnotations] = useState([]);

	useEffect(() => {
		console.log("loaded");
		// setVideoPath("C:\\Users\\nickd\\Videos\\Scrum4Group9.mp4")
	}, []);

	return (
		<AppContext>
			
			<CanvasComponent videoSrc={videoPath}></CanvasComponent>
			<button onClick={() => setVideoPath("C:\\Users\\nickd\\Videos\\Scrum4Group9.mp4")}>upload video</button>
			<Export projName={"test"}></Export>
		</AppContext>
	);
}

export default App;
