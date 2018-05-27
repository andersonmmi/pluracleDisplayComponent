import React, { Component } from 'react';
import getWeb3 from '../utils/getWeb3';
import Web3 from 'web3';
import _ from 'lodash';
import './SourceSelector.css'

let web3

let abi = [
    {
      "constant": true,
      "inputs": [
        {
          "name": "addr",
          "type": "address"
        },
        {
          "name": "roleName",
          "type": "string"
        }
      ],
      "name": "checkRole",
      "outputs": [],
      "payable": false,
      "stateMutability": "view",
      "type": "function"
    },
    {
      "constant": true,
      "inputs": [
        {
          "name": "addr",
          "type": "address"
        },
        {
          "name": "roleName",
          "type": "string"
        }
      ],
      "name": "hasRole",
      "outputs": [
        {
          "name": "",
          "type": "bool"
        }
      ],
      "payable": false,
      "stateMutability": "view",
      "type": "function"
    },
    {
      "constant": false,
      "inputs": [
        {
          "name": "addr",
          "type": "address"
        },
        {
          "name": "roleName",
          "type": "string"
        }
      ],
      "name": "adminRemoveRole",
      "outputs": [],
      "payable": false,
      "stateMutability": "nonpayable",
      "type": "function"
    },
    {
      "constant": false,
      "inputs": [
        {
          "name": "addr",
          "type": "address"
        },
        {
          "name": "roleName",
          "type": "string"
        }
      ],
      "name": "adminAddRole",
      "outputs": [],
      "payable": false,
      "stateMutability": "nonpayable",
      "type": "function"
    },
    {
      "constant": true,
      "inputs": [],
      "name": "ROLE_ADMIN",
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
      "anonymous": false,
      "inputs": [
        {
          "indexed": false,
          "name": "oracleType",
          "type": "string"
        },
        {
          "indexed": false,
          "name": "addr",
          "type": "address"
        },
        {
          "indexed": false,
          "name": "owner",
          "type": "address"
        },
        {
          "indexed": false,
          "name": "dataType",
          "type": "string"
        },
        {
          "indexed": false,
          "name": "description",
          "type": "string"
        }
      ],
      "name": "OracleAdded",
      "type": "event"
    },
    {
      "anonymous": false,
      "inputs": [
        {
          "indexed": false,
          "name": "oracleType",
          "type": "string"
        },
        {
          "indexed": false,
          "name": "addr",
          "type": "address"
        }
      ],
      "name": "OracleRemoved",
      "type": "event"
    },
    {
      "anonymous": false,
      "inputs": [
        {
          "indexed": false,
          "name": "oracleType",
          "type": "string"
        },
        {
          "indexed": false,
          "name": "addr",
          "type": "address"
        },
        {
          "indexed": false,
          "name": "description",
          "type": "string"
        }
      ],
      "name": "OracleDescriptionUpdated",
      "type": "event"
    },
    {
      "anonymous": false,
      "inputs": [
        {
          "indexed": false,
          "name": "addr",
          "type": "address"
        },
        {
          "indexed": false,
          "name": "roleName",
          "type": "string"
        }
      ],
      "name": "RoleAdded",
      "type": "event"
    },
    {
      "anonymous": false,
      "inputs": [
        {
          "indexed": false,
          "name": "addr",
          "type": "address"
        },
        {
          "indexed": false,
          "name": "roleName",
          "type": "string"
        }
      ],
      "name": "RoleRemoved",
      "type": "event"
    },
    {
      "constant": false,
      "inputs": [
        {
          "name": "_type",
          "type": "string"
        },
        {
          "name": "_address",
          "type": "address"
        },
        {
          "name": "_owner",
          "type": "address"
        },
        {
          "name": "_dataType",
          "type": "string"
        },
        {
          "name": "_description",
          "type": "string"
        }
      ],
      "name": "addOracle",
      "outputs": [],
      "payable": false,
      "stateMutability": "nonpayable",
      "type": "function"
    },
    {
      "constant": false,
      "inputs": [
        {
          "name": "_address",
          "type": "address"
        }
      ],
      "name": "removeOracle",
      "outputs": [],
      "payable": false,
      "stateMutability": "nonpayable",
      "type": "function"
    },
    {
      "constant": false,
      "inputs": [
        {
          "name": "_address",
          "type": "address"
        },
        {
          "name": "_description",
          "type": "string"
        }
      ],
      "name": "updateOracleDescription",
      "outputs": [],
      "payable": false,
      "stateMutability": "nonpayable",
      "type": "function"
    },
    {
      "constant": true,
      "inputs": [
        {
          "name": "_type",
          "type": "string"
        }
      ],
      "name": "getOracleList",
      "outputs": [
        {
          "name": "",
          "type": "address[]"
        }
      ],
      "payable": false,
      "stateMutability": "view",
      "type": "function"
    },
    {
      "constant": true,
      "inputs": [
        {
          "name": "addr",
          "type": "address"
        }
      ],
      "name": "getOracleInfo",
      "outputs": [
        {
          "name": "",
          "type": "address"
        },
        {
          "name": "",
          "type": "string"
        },
        {
          "name": "",
          "type": "string"
        },
        {
          "name": "",
          "type": "uint256"
        },
        {
          "name": "",
          "type": "uint256"
        }
      ],
      "payable": false,
      "stateMutability": "view",
      "type": "function"
    }
  ];
let address = '0x19400099be04c9c720d742784bd5f5e841bce78a';



class SourceSelector extends Component {
  constructor(props) {
  super(props);
  this.state = {
      owner: [],
      oracleType: [],
      description: [],
      data: [],
      lastUpdated: [],
    oracleList: [],
    web3: null,
  };
}

componentWillMount() {
  /** Get network provider and web3 instance.
   See utils/getWeb3 for more info. */
   getWeb3
   .then(results => {
   // console.log('results: ', results);
   web3 = results.web3;
   let array = []
   let infoArray = []
   // @dev building the api call
   let oracleContract = web3.eth.contract(abi).at(address);
   console.log(oracleContract);
   oracleContract.getOracleList("signed:uint256", (error, result) => {
   if(!error){
       console.log(JSON.stringify(result));
       array.push(result);
       this.setOracleList(array);
       oracleContract.getOracleInfo(this.state.oracleList[0],(error, result) => {
           if(!error){
               console.log(JSON.stringify(result));
               this.setData(result);
           }else{
               console.error(error);
           }
       });
   }else{
       console.error(error);
   }
   });
   this.setState({
   web3: results.web3,
   })
   })
   .catch(error => {
   console.log(error)
   this.setState({
   web3error: error.error,
   data: "catch"
   })
   })
}

componentDidMount() {
    setInterval(()=>{
    web3 = this.state.web3;
    let array = []
    let infoArray = []
    let oracleContract = web3.eth.contract(abi).at(address);
    // console.log(oracleContract);
    oracleContract.getOracleList("signed:uint256", (error, result) => {
      if(!error){
          console.log("!!UPDATED TABLE!!");
          array.push(result);
          this.setOracleList(array);
          oracleContract.getOracleInfo(this.state.oracleList[0],(error, result) => {
              if(!error){
                  console.log(JSON.stringify(result));
                  this.setData(result);
              }else{
                  console.error(error);
              }
          });
      }else{
          console.error(error);
      }
  });
},
  3000
)
}

setOracleList = (data) => {
  this.setState({
    oracleList: data
  })
}

setData = (data) => {
    // owner, oracleType, description, data, lastUpdated
    this.setState({
      owner: String(data[0]).split(','),
      oracleType: String(data[1]).split(','),
      description: String(data[2]).split(','),
      data: String(data[3]).split(','),
      lastUpdated: String(data[4]).split(','),
    });
}

    render() {

        let TableRows = []

        _.each(this.state.oracleList, (value, index) => {
          TableRows.push(
            <tr key={index}>
              <td>{this.state.description[index]}</td>
              <td>{this.state.oracleList[index]}</td>
              <td>{this.state.oracleType[index]}</td>
              <td>{this.state.lastUpdated[index]}</td>
            </tr>
          )
        })

      return (
        <div className="listOfOracles">
            <table className="App-table">
                <thead>
                <tr>
                  <th>Contract Name</th>
                  <th>Oracle Address</th>
                  <th>Type</th>
                  <th>Updated</th>
                </tr>
                </thead>
                <tbody>
                {TableRows}
                </tbody>
            </table>
        </div>
      );
    }
  }

export default SourceSelector;
