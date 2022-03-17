import React from "react";

const Annotations = ({annotations}) =>{
return (
    <div>
        <input type = "text" placeholder="Enter label" />
        <h3 style = {{color: "white"}}>{annotations?.type}</h3>
        <p style = {{color: "white"}}>
            {annotations?.points.map((point) => {
                return <p style = {{color: "white"}} > {point}</p>;
            })}
            </p>
    </div>
    );
};

export default Annotations;