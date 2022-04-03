import React, {useEffect} from "react";
import {useAnnotations} from "./AppContext";
import "../styles/Annotations.css";


const Annotations = ({annotation, index}) =>{
    const [annotations, setAnnotations] = useAnnotations();
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
    //updateComment
return (


    <div className = "card">
        <h4 style = {{color: "black", margin: "0"}}>
            < input type = "text" value = {annotation?.label} onChange = {(e) => updateLabel(e.target.value)}/> </h4>
        <p style = {{color: "black", paddingRight: "0.5rem", fontWeight: "900", fontSize: "1.75rem", opacity: "0.2", textAlign: "right", width: "100%", margin: "0", marginBottom: "0.5rem"}}>{annotation?.type}</p>
        <h4 style = {{color: "black", margin: "0"}}>
        <textarea rows="5" placeholder="Comment" onChange={(e) => updateComment(e.target.value)} ></textarea>
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