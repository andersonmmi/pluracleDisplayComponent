import React, { Component } from 'react';
import './SourceSelector.css'

class SourceSelector extends Component {
  constructor(props) {
  super(props);
  this.state = { isChecked: false };
}



    render() {
      return (
        <div>
          <Checkbox
            id="checkbox3"
            value="random3"
            name="example"
            label={
              <span>some unchecked component with event handled by react</span>
            }
            isChecked={this.state.isChecked}
            onChange={() => this._handleClick()}/>
          <button onClick={() => this._handleClick()}>click</button>
        </div>
      );
    }

    _handleClick() {
      this.setState({ isChecked: !this.state.isChecked });
    }
  }

  class Checkbox extends React.Component {
    render() {
      return (
        <div>
          <input
            type="checkbox"
            id={this.props.id}
            value={this.props.value}
            name={this.props.name}
            checked={this.props.isChecked}
            disabled={this.props.disabled}
            onChange={ () => this.props.onChange() }/>
          <label
            aria-hidden="true"
            htmlFor={this.props.id}/>
          <label htmlFor={this.props.id}>
            {this.props.label}
          </label>
        </div>
      );
    }
  }




export default SourceSelector;
