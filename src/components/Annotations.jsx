import React, { useEffect } from "react";
import { useAnnotations, useJumpToTime, useScreenshots, useProjPath } from "./AppContext";
import "../styles/Annotations.css";
import { MdDeleteForever } from "react-icons/md";
const electron = window.require("electron");

const Annotations = ({ annotation, index, existingLabels }) => {
	const [annotations, setAnnotations] = useAnnotations();
	const [jumpToTime, setJumpToTime] = useJumpToTime();
	const [screenshots, setScreenshots] = useScreenshots();
	const [projPath] = useProjPath();

	useEffect(() => {}, [annotation]);
	const updateLabel = (label) => {
		let oldAnnotations = annotations;
		oldAnnotations[index].label = label;
		setAnnotations([...oldAnnotations]);
	};
	const updateComment = (comment) => {
		let oldAnnotations = annotations;
		oldAnnotations[index].comment = comment;
		setAnnotations([...oldAnnotations]);
	};
	const deleteAnnotations = (index) => {
		let oldAnnotations = annotations;

		let currentTimestamp = oldAnnotations[index].timestamp;

		oldAnnotations.splice(index, 1);
		setAnnotations([...oldAnnotations]);

		let shouldDelete = true;

		for (let xyz of oldAnnotations) {
			if (xyz.timestamp == currentTimestamp) {
				shouldDelete = false;
				break;
			}
		}

		if (shouldDelete) {
			let imageToDelete;

			for (let i = 0; i < Object.keys(screenshots).length; i++) {
				imageToDelete = screenshots[Object.keys(screenshots)[i]];

				if (Object.keys(screenshots)[i] == currentTimestamp) {
					let oldScreenshots = screenshots;
					delete oldScreenshots[Object.keys(screenshots)[i]];

					if (oldScreenshots == null) {
						oldScreenshots = {};
					}

					setScreenshots(oldScreenshots);
					break;
				}
			}

			let args = {
				projPath: projPath,
				imageToDelete: imageToDelete,
			};
			electron.ipcRenderer.send("delete-image", args);
		}
	};

	const setShownCard = () => {
		let oldAnnotations = annotations;
		for (let i in oldAnnotations) {
			if (i == index) {
				oldAnnotations[index]["selected"] = true;
			} else {
				oldAnnotations[i]["selected"] = false;
			}
		}
		setJumpToTime(annotation.timestamp);
	};
	//updateComment
	return (
		<div className="card">
			<h4 style={{ color: "black", margin: "0" }}>
				<label>
					<input type={"text"} value={annotation.label} placeholder={"Select Label..."} list="browsers" name="myBrowser" onChange={(e) => updateLabel(e.target.value)}/>
				</label>
				<datalist id="browsers">
					{existingLabels.map((l) => {
            return <option value={l}/>
          })}
				</datalist>
			</h4>
			<p
				style={{
					color: "black",
					paddingRight: "0.5rem",
					fontWeight: "900",
					fontSize: "1.75rem",
					opacity: "0.2",
					textAlign: "right",
					width: "100%",
					margin: "0",
					marginBottom: "0.5rem",
				}}
			>
				{annotation?.type} {index}
			</p>
			<h4 style={{ color: "black", margin: "0" }}>
				<textarea rows="5" value={annotation?.comment} onChange={(e) => updateComment(e.target.value)}></textarea>
			</h4>
			<div className="card__button-holder">
				<button className="card_delAnnotations" onClick={() => deleteAnnotations(index)}>
					<MdDeleteForever />
				</button>
				<button
					className="card__jump"
					onClick={() => {
						setShownCard();
					}}
				>
					Show Annotation
				</button>
			</div>
			{/* <p style = {{color: "white"}}> */}
			{/* {annotation?.points.map((point) => { */}
			{/* return <p style = {{color: "white"}} > {point}</p>; */}
			{/* })} */}
			{/* </p> */}
		</div>
	);
};

export default Annotations;
