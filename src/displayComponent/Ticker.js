import React, { Component } from 'react'
//import SimpleStorageContract from '../build/contracts/SimpleStorage.json'
import getWeb3 from '../utils/getWeb3'
// import Web3 from 'web3';
import _ from 'lodash';

import '../css/oswald.css'
import '../css/open-sans.css'
import '../css/pure-min.css'
import './Ticker.css'

let web3, oracleContract, oc
let address = '0xd64f463affca20ea99059ba42ed13c979587a117';


class Ticker extends Component {
  constructor(props) {
    super(props)

    this.state = {
      web3: null,
      data: null,
    }
  }

  
  render() {

    let data = []

    _.each(this.state.data, (value, index) => {
      data.push(
        <div className="ticker__item" key={index}>
          {this.state.data}
        </div>
      )
    })

    return (
      <div className="displayComponent">
        <div className="ticker-wrap">
          <div className="ticker">
            {data}
          </div>
        </div>
      </div>
    );
  }
}

export default Ticker
