
import React, { useState } from "react";
import TextField from "@material-ui/core/TextField";
  
const App = () => {
  const [annotation, setName] = useState("");
  
  return (
    <div
      style={{
        marginLeft: "40%",
      }}
    >
      <h2>Annotation text</h2>
      <TextField
        value={annotation}
        label="Annotation text"
        onChange={(e) => {
            setName(e.target.value);
        }
       } />
        <h3>{annotation}</h3>
       
    </div>
  );
};
  
export default App;