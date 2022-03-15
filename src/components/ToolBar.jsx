import React from 'react';
import '../styles/ToolBar.css';
import { BiShapePolygon, BiRectangle } from 'react-icons/bi';

const ToolBar = () => {
  return (
	<div className='tool-bar'>
		<button className='tool-bar__button' onClick={(e) => {console.log(e);}}><BiShapePolygon size={40} className='tool-bar__icons'></BiShapePolygon></button>
		<button className='tool-bar__button' onClick={(e) => {console.log(e.target.value);}}><BiRectangle size={40} className='tool-bar__icons'></BiRectangle></button>
	</div>
  )
}

export default ToolBar