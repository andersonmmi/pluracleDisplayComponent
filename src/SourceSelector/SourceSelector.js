import React, { Component } from 'react';
import './SourceSelector.css'

class SourceSelector extends Component {
  constructor(props) {
  super(props);
  this.state = {
    account1: false,
    account2: false,
    account3: false,
  };
  this.handleClick=this.handleClick.bind(this);
}

  handleClick = (event) => {
    console.log(event);
    const target = event.target;
    const value = target.type === 'checkbox' ? target.checked : target.value;
    const name = target.name;

    this.setState({
      [name]: value
    });
  }

    render() {
      return (
        <div className="listOfOracles">
          <span>
          <input
            type="checkbox"
            id="account1"
            name="account1"
            checked={this.state.account1}
            onChange={this.handleClick.bind(this)}/>
            account1</span>
          <span>
          <input
            type="checkbox"
            id="account2"
            name="account2"
            checked={this.state.account2}
            onChange={this.handleClick.bind(this)}/>
            account2</span>
          <span>
          <input
            type="checkbox"
            id="account3"
            name="account3"
            checked={this.state.account3}
            onChange={this.handleClick.bind(this)}/>
            account3</span>

          <button>filter</button>
        </div>
      );
    }


  }






export default SourceSelector;
