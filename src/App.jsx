import "./styles/App.css";
import { useState, useRef, useEffect, createContext } from "react";
import CanvasComponent from "./components/CanvasComponent.jsx";
import AppContext from "./components/AppContext";
import TopButtons from "./components/TopButtons";
import AnnotationsBar from "./components/AnnotationsBar";

function App() {
	const [videoPath, setVideoPath] = useState("");
	const [annotations, setAnnotations] = useState([]);

	return (
		<AppContext>
			<div className="Top-Buttons"><TopButtons projName={"test"}></TopButtons></div>
			<div className="Annotations"><AnnotationsBar></AnnotationsBar></div>
			<div className="Canvas-Component"><CanvasComponent videoSrc={videoPath}></CanvasComponent></div>
		</AppContext>
	);
}

export default App;
