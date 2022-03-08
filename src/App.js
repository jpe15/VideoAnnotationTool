import './styles/App.css'
import { useState, useRef, useEffect } from 'react'
import VideoPlayer from "./VideoPlayer.jsx"

function App() {
	const [file, setFile] = useState("");
	useEffect(() => {
		console.log("loaded");
	}, [])
	

  return (
  	<div className="App">
		  <h1>Electron Application</h1>
		  <input type="file" onChange={(e) => {setFile(e.target.files[0])}}></input>
		<VideoPlayer videoSrc="file:///Users/harvey/TestCard.mp4"></VideoPlayer>
  	</div>
  );
}

export default App
