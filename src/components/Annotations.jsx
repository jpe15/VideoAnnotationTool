import React, {useEffect} from "react";
import {useAnnotations, useJumpToTime} from "./AppContext";
import "../styles/Annotations.css";
import {MdDeleteForever} from "react-icons/md";


const Annotations = ({annotation, index}) =>{
    const [annotations, setAnnotations] = useAnnotations();
    const [jumpToTime, setJumpToTime] = useJumpToTime();
    useEffect(() => {
    }, [annotation])
const updateLabel = (label) => {
    let oldAnnotations = annotations;
    oldAnnotations [index].label = label;
    setAnnotations ([...oldAnnotations]);
}
const updateComment =  (comment) => {
    let oldAnnotations = annotations;
    oldAnnotations [index].comment = comment;
    setAnnotations ([...oldAnnotations]);
}
const deleteAnnotations = (index) => {
    let oldAnnotations = annotations;
    oldAnnotations.splice (index, 1);
    setAnnotations([...oldAnnotations]);
}
    //updateComment
return (


    <div className = "card">
        <h4 style = {{color: "black", margin: "0"}}>
            < input type = "text" value = {annotation?.label} onChange = {(e) => updateLabel(e.target.value)}/> </h4>
        <p style = {{color: "black", paddingRight: "0.5rem", fontWeight: "900", fontSize: "1.75rem", opacity: "0.2", textAlign: "right", width: "100%", margin: "0", marginBottom: "0.5rem"}}>{annotation?.type}</p>
        <h4 style = {{color: "black", margin: "0"}}>
        <textarea rows="5" value={annotation?.comment} onChange={(e) => updateComment(e.target.value)} ></textarea>
        </h4>
        <button className = "card_delAnnotations" onClick={() => deleteAnnotations(index)}><MdDeleteForever size = {20}/></button>
        <button onClick={() => {setJumpToTime(annotation.timestamp)}}>GO TO</button>
        {/* <p style = {{color: "white"}}> */}
            {/* {annotation?.points.map((point) => { */}
                 {/* return <p style = {{color: "white"}} > {point}</p>; */}
            {/* })} */}
            {/* </p> */}
    </div>
    );
};

export default Annotations;