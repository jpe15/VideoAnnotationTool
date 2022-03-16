import "./styles/App.css";
import { useState, useRef, useEffect, createContext } from "react";
import CanvasComponent from "./components/CanvasComponent.jsx";
import AppContext from "./components/AppContext";
import Export from "./components/ExportButton";
import TopBarButtons from "./components/TopBarButtons";

function App() {
	const [videoPath, setVideoPath] = useState("");
	const [annotations, setAnnotations] = useState([]);

	useEffect(() => {
		console.log("loaded");
		// setVideoPath("C:\\Users\\nickd\\Videos\\Scrum4Group9.mp4")
	}, []);

	return (
		<AppContext>
			<div style={{ position: "fixed", top: "0", left: "0", height: "100vh", width: "15vw", background: "black" }}>

			</div>
			<div className="app-main">
				<TopBarButtons></TopBarButtons>
				<CanvasComponent videoSrc={videoPath}></CanvasComponent>
			</div>
		</AppContext>
	);
}

export default App;
