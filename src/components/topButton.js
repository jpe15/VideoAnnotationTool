import React from 'react'
import styled from "styled-components";


const Button = styled.button`
background-color : #3949ab;
color: white;
padding: 5px 15px;
border-radius: 5px;
height: 60px;
width: 280px;
text-transform: uppercase;
cursor: pointer;
outline: 0;
transition: ease background-color 250ms;
margin: 20px 70px;
&:hover{
background-color: #283593;
} `

function uploadFile(){
	document.getElementById("selectFile").click()
	}

function Buttons(){
	
  return <>
<Button onClick={uploadFile.bind(this)}>Add New Video</Button>
<Button>Import Existing Annotation</Button>
<Button>Export Annotations</Button>
<input id ="selectFile"type={"file"} style={{display:"none"}}></input>
</>
}
export default Buttons

