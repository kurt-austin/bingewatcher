import React from "react";


export default function Alert({message, closeIt}){
   console.log(closeIt)

   
   return (
<div className= "message">
    < h4 >{document.title} says</h4> 
    <p>{message}</p>
    <button onClick={()=>closeIt()}>Close</button>
    </div>
    )
} 