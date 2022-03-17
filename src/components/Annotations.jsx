import React from "react";

const Annotations = ({annotations}) =>{
return (
    <div>
        <h3 style = {{color: "white"}}>{annotations?.type}</h3>
        <p style = {{color: "white"}}>
            {annotations?.points.map((point, pidx) => {
                return <p style = {{color: "black"}} > {point}</p>;
            })}
            </p>
    </div>
    );
};

export default Annotations;