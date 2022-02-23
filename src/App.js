import './styles/App.css'
import { useState, useRef, useEffect } from 'react'
import Export from './Export';

function App() {

	const exp = {
		'Metadata' : {
			'Filename of video' : 'video.mp4',
			'Filename of frame' : 'frame',
			'Timestamp of annotated frame' : 1234.75,
			'Comment' : 'This is a comment'
		},
		'Annotations' : [
			{
				'Type' : 'Polygon',
				'Coordinates' : [ [1, 2], [3, 4], [5,6] ],
				'Label' : 'label1',
				'Comment' : 'comment1'
			},
			{
				'Type' : 'Point',
				'Coordinates' : [ [7,8] ],
				'Label' : 'label2',
				'Comment' : 'comment2'
			},
			{
				'Type' : 'Rectangle',
				'Coordinates' : [ [9, 10], [11, 12] ],
				'Label' : 'label3',
				'Comment' : 'comment3'
			}
		]
	}

	const [file, setFile] = useState("");
	useEffect(() => {
		console.log("loaded");
	}, [])
	

  return (
  	<div className="App">
		  <h1>Electron Application</h1>
		  <input type="file" onChange={(e) => {setFile(e.target.files[0])}}></input>
		  <Export data={exp}/>
  	</div>
  );
}

export default App
