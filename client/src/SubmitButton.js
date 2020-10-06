import React from 'react';
import Jumbotron from './components/Jumbotron';






//import './App.css';

class SubmitButton extends React.Component{
    
  render(){
      return( 
      <div className="SubmitButton">
       <button
       className = "btn"
       disabled = {this.props.disabled}
       //can define mullti fucntions from onclick//
       onClick = { () => this.props.onClick() }
       >
         {this.props.text}
       </button>
</div>
);
}
}
export default SubmitButton;