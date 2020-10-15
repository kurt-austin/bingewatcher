import React from "react";

export default function Alert({message, myfunc}){//render prop function to close alert from calling component
   console.log(myfunc)
   return (
<div className= "cssed">
    < h4 >{document.title} says</h4> 
    <p>{message}</p>
    <button onClick={()=>myfunc()}>Coolness</button>
    </div>
    )
}