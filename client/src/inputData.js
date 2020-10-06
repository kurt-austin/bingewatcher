import React from 'react';
import Jumbotron from './components/Jumbotron';






//import './App.css';

class inputData extends React.Component{
    
  render(){
      return( <div className="inputData">
         <input
         className = "input"
         type = {this.props.type}
         placeholder = {this.props.placeholder}
         value = {this.props.value}
         onChange ={(event)=> this.props.onChange(event.target.value)}
         />
</div>
);
}
}
export default inputData;