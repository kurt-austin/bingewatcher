import React, { Component } from "react";

// https://www.pluralsight.com/guides/how-to-use-radio-buttons-in-reactjs

class Profile extends Component {
  constructor() {
    super();
    this.state = {
      name: "React"
    };
    this.onChangeValue = this.onChangeValue.bind(this);
  }

  onChangeValue(event) {
    console.log(event.target.value);
  }

  render() {
    return (
      <div className="container container-fluid">
        <h1 className="text-center"> Welcome user! How much time do you have?</h1>
        <div className="container col-sm-6">
          <form className="form">
            <input />
          </form>
        </div>
        <div className="container col-sm-6" onChange={this.onChangeValue}>
          <input type="radio" value="Male" name="day" /> By Day
          <input type="radio" value="Female" name="week" /> By Week
        </div>
      </div>
    );
  }
}

export default Profile;