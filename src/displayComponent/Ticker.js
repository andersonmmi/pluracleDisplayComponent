import React, { Component } from 'react'
//import SimpleStorageContract from '../build/contracts/SimpleStorage.json'
import getWeb3 from '../utils/getWeb3'
// import Web3 from 'web3';
import _ from 'lodash';

import '../css/oswald.css'
import '../css/open-sans.css'
import '../css/pure-min.css'
import './Ticker.css'

// let web3, oracleContract, oc

let abi = [
 {
  "anonymous": false,
  "inputs": [
   {
    "indexed": true,
    "name": "previousOwner",
    "type": "address"
   },
   {
    "indexed": true,
    "name": "newOwner",
    "type": "address"
   }
  ],
  "name": "OwnershipTransferred",
  "type": "event"
 },
 {
  "constant": false,
  "inputs": [
   {
    "name": "newOwner",
    "type": "address"
   }
  ],
  "name": "transferOwnership",
  "outputs": [],
  "payable": false,
  "stateMutability": "nonpayable",
  "type": "function"
 },
 {
  "constant": false,
  "inputs": [
   {
    "name": "data",
    "type": "bytes32"
   }
  ],
  "name": "update",
  "outputs": [],
  "payable": false,
  "stateMutability": "nonpayable",
  "type": "function"
 },
 {
  "inputs": [
   {
    "name": "dataType",
    "type": "string"
   }
  ],
  "payable": false,
  "stateMutability": "nonpayable",
  "type": "constructor"
 },
 {
  "constant": true,
  "inputs": [],
  "name": "data",
  "outputs": [
   {
    "name": "",
    "type": "bytes32"
   }
  ],
  "payable": false,
  "stateMutability": "view",
  "type": "function"
 },
 {
  "constant": true,
  "inputs": [],
  "name": "dataType",
  "outputs": [
   {
    "name": "",
    "type": "string"
   }
  ],
  "payable": false,
  "stateMutability": "view",
  "type": "function"
 },
 {
  "constant": true,
  "inputs": [],
  "name": "lastTimestamp",
  "outputs": [
   {
    "name": "",
    "type": "uint256"
   }
  ],
  "payable": false,
  "stateMutability": "view",
  "type": "function"
 },
 {
  "constant": true,
  "inputs": [],
  "name": "owner",
  "outputs": [
   {
    "name": "",
    "type": "address"
   }
  ],
  "payable": false,
  "stateMutability": "view",
  "type": "function"
 }
];
let address = '0xd64f463affca20ea99059ba42ed13c979587a117';
// let oracleContract = web3.eth.contract(abi).at(address);
// web3.eth.defaultAccount = web3.eth.accounts[0];



class Ticker extends Component {
  constructor(props) {
    super(props)

    this.state = {
      web3: null,
      data: null,
      OC: null,
    }
  }

  componentWillMount() {
    // Get network provider and web3 instance.
    // See utils/getWeb3 for more info.

    getWeb3
    .then(results => {
      this.setState({
        web3: results.web3
      })

      // Instantiate contract once web3 provided.
      this.instantiateContract()
      console.log(this.state.OC.data);
      this.state.OC.data();
    })
    .catch(() => {
      console.log('Error finding web3.')
    })
  }

  instantiateContract() {
    this.setState({
      OC: this.state.web3.eth.contract(abi).at(address)
    })
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
