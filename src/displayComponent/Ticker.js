import React, { Component } from 'react'
//import SimpleStorageContract from '../build/contracts/SimpleStorage.json'
// import getWeb3 from '../utils/getWeb3'
import Web3 from 'web3';
import _ from 'lodash';

import '../css/oswald.css'
import '../css/open-sans.css'
import '../css/pure-min.css'
import './Ticker.css'

let web3 = new Web3(new Web3.providers.HttpProvider("http://localhost:9545"))
let peopleContractABI = [
    {
      "constant": true,
      "inputs": [],
      "name": "getPeople",
      "outputs": [
        {
          "name": "",
          "type": "bytes32[]"
        },
        {
          "name": "",
          "type": "bytes32[]"
        },
        {
          "name": "",
          "type": "uint256[]"
        }
      ],
      "payable": false,
      "type": "function",
      "stateMutability": "view"
    },
    {
      "constant": false,
      "inputs": [
        {
          "name": "_firstName",
          "type": "bytes32"
        },
        {
          "name": "_lastName",
          "type": "bytes32"
        },
        {
          "name": "_age",
          "type": "uint256"
        }
      ],
      "name": "addPerson",
      "outputs": [
        {
          "name": "success",
          "type": "bool"
        }
      ],
      "payable": false,
      "type": "function",
      "stateMutability": "nonpayable"
    },
    {
      "constant": true,
      "inputs": [
        {
          "name": "",
          "type": "uint256"
        }
      ],
      "name": "people",
      "outputs": [
        {
          "name": "firstName",
          "type": "bytes32"
        },
        {
          "name": "lastName",
          "type": "bytes32"
        },
        {
          "name": "age",
          "type": "uint256"
        }
      ],
      "payable": false,
      "type": "function",
      "stateMutability": "view"
    }
  ];
let peopleContractAddress = '0xf25186b5081ff5ce73482ad761db0eb0d25abfbf';
let peopleContract = web3.eth.contract(peopleContractABI).at(peopleContractAddress);
web3.eth.defaultAccount = web3.eth.accounts[0];

class Ticker extends Component {
  constructor(props) {
    super(props)

    this.state = {
      firstNames: [],
      lastNames: [],
      ages: [],
    }
  }

  componentWillMount() {
    var data = peopleContract.getPeople();
    this.setState({
      firstNames: String(data[0]).split(','),
      lastNames: String(data[1]).split(','),
      ages: String(data[2]).split(',')
    });
    console.log(typeof data);
    console.log(data);
  }

  componentDidMount() {
    setInterval(()=>{
        var data = peopleContract.getPeople();
        this.setState({
          firstNames: String(data[0]).split(','),
          lastNames: String(data[1]).split(','),
          ages: String(data[2]).split(',')
        });
        console.log(typeof data);
        console.log(data);
      },
      30000
    )
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
