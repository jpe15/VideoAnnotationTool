import React from 'react';
import Annotations from "./Annotations";
import {useAnnotations} from "./AppContext";
import "../styles/Annotations.css";

const AnnotationsBar = () => {
    const [annotations, setAnnotations] = useAnnotations();
    return (
        <div>
            <div className="blackBar">
            {annotations?.map((annotation, idx) => {return <Annotations annotation={annotation} index = {idx}/>})}
            </div>
        </div>
    );
};

export default AnnotationsBar;