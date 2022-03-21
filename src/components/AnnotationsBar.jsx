import React from 'react';
import Annotations from "./Annotations";
import {useAnnotations} from "./AppContext";
import "../styles/Annotations.css";

const AnnotationsBar = () => {
    const [annotations, setAnnotations] = useAnnotations();
    return (
        <div>
            <div className="blackBar"></div>
            {annotations?.map((annotations) => {return <Annotations annotations={annotations}/>})}
        </div>
    );
};

export default AnnotationsBar;