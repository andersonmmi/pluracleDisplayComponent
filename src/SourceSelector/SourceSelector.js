import React, { Component } from 'react';


class SourceSelector extends Component {
  constructor(props){
    super(props);
    this.state={
      sources: null
    }
    this.handleTextChange=this.handleTextChange.bind(this);
    this.handleSubmit=this.handleSubmit.bind(this);
  }

  handleTextChange = (event) => {
    event.preventDefault();
    if (this.state[event.target.id] !== undefined){
      this.setState({[event.target.id]: event.target.value});
    }
  }
  handleSubmit = (event) => {
    this.setState({
      sources: null
    });
    // this.props.updateTransactionTime();
  }

  render() {
    const formStyle = {
      "backgroundColor": "deepskyblue",
      "flexGrow": 1,
    };
    return (
      <div className="SourceSelector" style={formStyle}>
        <form>
          <label>
            First Name:
            <input id="firstName" onChange={this.handleTextChange} type="text" value={this.state.firstName}/>
          </label>
          <hr/>
          <label>
            Last Name:
            <input id="lastName" onChange={this.handleTextChange} type="text" value={this.state.lastName}/>
          </label>
          <hr />
          <label>
            Age:
            <input id="age" onChange={this.handleTextChange} type="text" value={this.state.age}/>
          </label>
          <hr />
          <input id="submit" type="button" value="Submit" onClick={this.handleSubmit}/>
        </form>
      </div>
    );
  }
}

export default SourceSelector;
