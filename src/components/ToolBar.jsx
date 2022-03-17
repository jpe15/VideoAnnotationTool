import React, { useEffect, useState } from "react";
import "../styles/ToolBar.css";
import { BiShapePolygon, BiRectangle } from "react-icons/bi";
import { useTool } from "./AppContext";

const ToolBar = () => {
	const [tool, setTool] = useTool();
	const [polygonButtonStyle, setPolygonButtonStyle] = useState("tool-bar__button-active");
	const [boxButtonStyle, setBoxButtonStyle] = useState("tool-bar__button");

	useEffect(() => {
		console.log(tool);
		if (tool === 0) {
			setBoxButtonStyle("tool-bar__button--active");
			setPolygonButtonStyle("tool-bar__button");
		} else {
			setPolygonButtonStyle("tool-bar__button--active");
			setBoxButtonStyle("tool-bar__button");
		}
	}, [tool]);

	return (
		<div className="tool-bar">
			<button
				className={polygonButtonStyle}
				onClick={async (e) => {
					setTool(1);
				}}
			>
				<BiShapePolygon size={40} className="tool-bar__icons"></BiShapePolygon>
			</button>
			<button
				className={boxButtonStyle}
				onClick={async (e) => {
					setTool(0);
				}}
			>
				<BiRectangle size={40} className="tool-bar__icons"></BiRectangle>
			</button>
		</div>
	);
};

export default ToolBar;
