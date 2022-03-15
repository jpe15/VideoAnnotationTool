import React from 'react'
import { useVideoPath } from './AppContext';

const ImportButton = () => {

	const [, setVideoPath] = useVideoPath();

  return (
	<label className="top-bar-button__load">
		Load Video
		<input className="top-bar-button__load--hidden" type="file" onChange={(e) => {setVideoPath(e.target.files[0].path);}}/>
	</label>
  )
}

export default ImportButton