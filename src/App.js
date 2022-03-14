import './styles/App.css'
import { useState, useRef, useEffect } from 'react'
import CanvasComponent from "./CanvasComponent.jsx"

function App() {
	const [file, setFile] = useState("");
	useEffect(() => {
		console.log("loaded");
	}, [])
	

  return (
  	<div className="App">
		  <h1>Electron Application</h1>
		  <input type="file" onChange={(e) => {setFile(e.target.files[0])}}></input>
		<CanvasComponent videoSrc="C:\Users\nickd\Videos\Scrum4Group9.mp4"></CanvasComponent>
  	</div>
  );
}

export default App
