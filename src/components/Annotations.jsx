import React, {useEffect} from "react";
import {useAnnotations} from "./AppContext";
import "../styles/Annotations.css";


const Annotations = ({annotation, index}) =>{
    const [annotations, setAnnotations] = useAnnotations();
    useEffect(() => {
        console.log(annotation);
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
    //updateComment
return (


    <div class = "card">
        <h4 style = {{color: "black"}}>
            Label: < input type = "text"   placeholder="Enter label" value = {annotation?.label} onChange = {(e) => updateLabel(e.target.value)}/> </h4>
        <h4 style = {{color: "black"}}>Type: {annotation?.type}</h4>
        <h4 style = {{color: "black"}}>
        Comment: <input type = "text"  placeholder="Enter comment" value = {annotation?.comment} onChange = {(e) => updateComment(e.target.value)}/>
        </h4>
        {/* <p style = {{color: "white"}}> */}
            {/* {annotation?.points.map((point) => { */}
                 {/* return <p style = {{color: "white"}} > {point}</p>; */}
            {/* })} */}
            {/* </p> */}
    </div>
    );
};

export default Annotations;