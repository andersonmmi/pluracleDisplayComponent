import React, { Component } from 'react'
//import SimpleStorageContract from '../build/contracts/SimpleStorage.json'
import getWeb3 from '../utils/getWeb3'
import Web3 from 'web3';
import _ from 'lodash';

import '../css/oswald.css'
import '../css/open-sans.css'
import '../css/pure-min.css'
import './Ticker.css'

let web3
//
// let ABI = [
//  {
//   "anonymous": false,
//   "inputs": [
//    {
//     "indexed": true,
//     "name": "previousOwner",
//     "type": "address"
//    },
//    {
//     "indexed": true,
//     "name": "newOwner",
//     "type": "address"
//    }
//   ],
//   "name": "OwnershipTransferred",
//   "type": "event"
//  },
//  {
//   "constant": false,
//   "inputs": [
//    {
//     "name": "newOwner",
//     "type": "address"
//    }
//   ],
//   "name": "transferOwnership",
//   "outputs": [],
//   "payable": false,
//   "stateMutability": "nonpayable",
//   "type": "function"
//  },
//  {
//   "constant": false,
//   "inputs": [
//    {
//     "name": "data",
//     "type": "bytes32"
//    }
//   ],
//   "name": "update",
//   "outputs": [],
//   "payable": false,
//   "stateMutability": "nonpayable",
//   "type": "function"
//  },
//  {
//   "inputs": [
//    {
//     "name": "dataType",
//     "type": "string"
//    }
//   ],
//   "payable": false,
//   "stateMutability": "nonpayable",
//   "type": "constructor"
//  },
//  {
//   "constant": true,
//   "inputs": [],
//   "name": "data",
//   "outputs": [
//    {
//     "name": "",
//     "type": "bytes32"
//    }
//   ],
//   "payable": false,
//   "stateMutability": "view",
//   "type": "function"
//  },
//  {
//   "constant": true,
//   "inputs": [],
//   "name": "dataType",
//   "outputs": [
//    {
//     "name": "",
//     "type": "string"
//    }
//   ],
//   "payable": false,
//   "stateMutability": "view",
//   "type": "function"
//  },
//  {
//   "constant": true,
//   "inputs": [],
//   "name": "lastTimestamp",
//   "outputs": [
//    {
//     "name": "",
//     "type": "uint256"
//    }
//   ],
//   "payable": false,
//   "stateMutability": "view",
//   "type": "function"
//  },
//  {
//   "constant": true,
//   "inputs": [],
//   "name": "owner",
//   "outputs": [
//    {
//     "name": "",
//     "type": "address"
//    }
//   ],
//   "payable": false,
//   "stateMutability": "view",
//   "type": "function"
//  }
// ];
// let Address = '0xd64f463affca20ea99059ba42ed13c979587a117';
// let peopleContract = web3.eth.contract(ABI).at(Address);
// web3.eth.defaultAccount = web3.eth.accounts[0];



class Ticker extends Component {
  constructor(props) {
    super(props)

    this.state = {
      firstNames: [],
      lastNames: [],
      ages: [],
      web3: null,
    }
  }

  componentWillMount() {
    /** Get network provider and web3 instance.
     See utils/getWeb3 for more info. */
    getWeb3
    .then(results => {
      // console.log('results: ', results);
      this.setState({
        web3: results.web3
      })
    })
    .catch(error => {
      // console.log(error)
      this.setState({
        web3error: error.error
      })
    })
    // this.accountListener()
    // var data = peopleContract.getPeople();
    // this.setState({
    //   firstNames: String(data[0]).split(','),
    //   lastNames: String(data[1]).split(','),
    //   ages: String(data[2]).split(',')
    // });
    // console.log(Date.now());
  }

  componentDidUpdate(prevProps, prevState){
  if(prevState.web3!==this.state.web3) {
    this.whichNetwork();
  }
  if(prevState.networkId!==this.state.networkId) {
    this.reportNetwork(this.state.networkId);
  }
  if(this.state.web3!==null) {
    this.accountListener()
  }
}

whichNetwork = () => {
  this.state.web3.version.getNetwork((err, netId) => {
    if(err){console.log('err: ', err)}
    this.setState({networkId: netId});
  })
}

reportNetwork = (netId) => {
  if(netId!=="3"){
    this.setState({netIdError: "You must be on the Ropsten network!"})
  }
  if(netId==="3"){
    this.setState({netIdError: null})
  }
}

accountListener = () => {
  // var account = web3.eth.accounts[0];
  setInterval(() => {
    if (this.state.web3.eth.accounts[0] !== this.state.account) {
      console.log('this.state.web3.eth.accounts[0]: ', this.state.web3.eth.accounts[0]);
      console.log('this.state.account: ', this.state.account)
      // account = web3.eth.accounts[0];
      // updateInterface();
      this.setState({account: this.state.web3.eth.accounts[0]})
    }
  }, 2000);
}


  componentDidMount() {
    // setInterval(()=>{
    //     var data = peopleContract.getPeople();
    //     this.setState({
    //       firstNames: String(data[0]).split(','),
    //       lastNames: String(data[1]).split(','),
    //       ages: String(data[2]).split(',')
    //     });
    //     // console.log(Date.now());
    //
    //   },
    //   30000
    // )
  }



  render() {

    let data = []

    _.each(this.state.firstNames, (value, index) => {
      data.push(
        <div className="ticker__item" key={index}>
          {web3.toAscii(this.state.firstNames[index])} {web3.toAscii(this.state.lastNames[index])}: {this.state.ages[index]}
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
