// SPDX-License-Identifier: Apache-2.0

import AnnotationsBar from "./components/AnnotationsBar";
import AppContext from "./components/AppContext";
import CanvasComponent from "./components/CanvasComponent.jsx";
import ProjectName from "./components/ProjectName";
import TopButtons from "./components/TopButtons";
import "./styles/App.css";

function App() {

	return (
		<AppContext>
			<div className="Project-Name"><ProjectName></ProjectName></div>
			<div className="Top-Buttons"><TopButtons projName={"test"}></TopButtons></div>
			<div className="Annotations"><AnnotationsBar></AnnotationsBar></div>
			<div className="Canvas-Component"><CanvasComponent></CanvasComponent></div>
		</AppContext>
	);
}

export default App;
