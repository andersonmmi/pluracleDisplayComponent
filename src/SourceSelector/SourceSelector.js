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
  this._handleClick=this._handleClick.bind(this);
}

    _handleClick = (event) => {
      event.preventDefault();
      console.log(event);
      // this.setState({ [event.target.id]: !this.state.[event.target.id] });
    }

    render() {
      return (
        <div>
          <input
            type="checkbox"
            id="account1"
            name="account1"
            checked={this.state.account1}
            onChange={() => this._handleClick()}/>
            <span>account1</span>
          <input
            type="checkbox"
            id="account2"
            name="account2"
            checked={this.state.account2}
            onChange={() => this._handleClick()}/>
            <span>account2</span>
          <input
            type="checkbox"
            id="account3"
            name="account3"
            checked={this.state.account3}
            onChange={() => this._handleClick()}/>
            <span>account3</span>

          <button onClick={() => this._handleClick()}>filter</button>
        </div>
      );
    }

    _handleClick = (event) => {
      console.log(event);
      // this.setState({ [event.target.id]: !this.state.[event.target.id] });
    }
  }






export default SourceSelector;
