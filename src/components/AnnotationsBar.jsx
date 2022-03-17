import React from 'react';
import Annotations from "./Annotations";
import {useAnnotations} from "./AppContext";

const AnnotationsBar = () => {
    const [annotations, setAnnotations] = useAnnotations();
    return (
        <div>
            {annotations?.map((annotations) => {return <Annotations annotations={annotations}/>})}
        </div>
    );
};

export default AnnotationsBar;