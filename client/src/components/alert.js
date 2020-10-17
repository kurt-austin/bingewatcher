import React from "react";
import {Button} from "react-bootstrap";


export default function Alert({message, closeIt}){
   console.log(closeIt)

   
   return (
<div className= "message">
    {/* < h4 >{document.title} says</h4>  */}
    <p>{message}</p>
    <Button onClick={()=>closeIt()}>Close</Button>
    </div>
    )
} 
