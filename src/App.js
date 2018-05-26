import React, { Component } from 'react'
//import SimpleStorageContract from '../build/contracts/SimpleStorage.json'
// import getWeb3 from './utils/getWeb3'

import Ticker from './displayComponent/Ticker.js'

import './css/oswald.css'
import './css/open-sans.css'
import './css/pure-min.css'
import './App.css'

class App extends Component {
  constructor(props) {
    super(props)

    this.state = {
    }
  }

//   componentWillMount() {
//     /** Get network provider and web3 instance.
//      See utils/getWeb3 for more info. */
//     getWeb3
//     .then(results => {
//       // console.log('results: ', results);
//       this.setState({
//         web3: results.web3
//       })
//     })
//     .catch(error => {
//       // console.log(error)
//       this.setState({
//         web3error: error.error
//       })
//     })
//     // this.accountListener()
//   }
//
//   componentDidUpdate(prevProps, prevState){
//   if(prevState.web3!==this.state.web3) {
//     this.whichNetwork();
//   }
//   if(prevState.networkId!==this.state.networkId) {
//     this.reportNetwork(this.state.networkId);
//   }
//   if(this.state.web3!==null) {
//     this.accountListener()
//   }
// }
//
// whichNetwork = () => {
//   this.state.web3.version.getNetwork((err, netId) => {
//     if(err){console.log('err: ', err)}
//     this.setState({networkId: netId});
//   })
// }
//
// reportNetwork = (netId) => {
//   if(netId!=="3"){
//     this.setState({netIdError: "You must be on the Ropsten network!"})
//   }
//   if(netId==="3"){
//     this.setState({netIdError: null})
//   }
// }
//
// accountListener = () => {
//   // var account = web3.eth.accounts[0];
//   setInterval(() => {
//     if (this.state.web3.eth.accounts[0] !== this.state.account) {
//       console.log('this.state.web3.eth.accounts[0]: ', this.state.web3.eth.accounts[0]);
//       console.log('this.state.account: ', this.state.account)
//       // account = web3.eth.accounts[0];
//       // updateInterface();
//       this.setState({account: this.state.web3.eth.accounts[0]})
//     }
//   }, 2000);
// }
//   // instantiateContract() {
//     /*
//      * SMART CONTRACT EXAMPLE
//      *
//      * Normally these functions would be called in the context of a
//      * state management library, but for convenience I've placed them here.
//      */
//
//     // const contract = require('truffle-contract')
//     // const simpleStorage = contract(SimpleStorageContract)
//     // simpleStorage.setProvider(this.state.web3.currentProvider)
//
//     // Declaring this for later so we can chain functions on SimpleStorage.
//     // var simpleStorageInstance
//
//     // Get accounts.
//   //   this.state.web3.eth.getAccounts((error, accounts) => {
//   //     simpleStorage.deployed().then((instance) => {
//   //       simpleStorageInstance = instance
//   //
//   //       // Stores a given value, 5 by default.
//   //       return simpleStorageInstance.set(5, {from: accounts[0]})
//   //     }).then((result) => {
//   //       // Get the value from the contract to prove it worked.
//   //       return simpleStorageInstance.get.call(accounts[0])
//   //     }).then((result) => {
//   //       // Update state with the result.
//   //       return this.setState({ storageValue: result.c[0] })
//   //     })
//   //   })
//   // }

  render() {
    return (
      <div className="App">
        <nav className="navbar pure-menu pure-menu-horizontal">
            <a href="#" className="pure-menu-heading pure-menu-link">Truffle Box</a>
        </nav>

        <main className="container">
          <div className="pure-g">
            <div className="pure-u-1-1">
              <h1>Good to Go!</h1>
              <p>Your Truffle Box is installed and ready.</p>
              <h2>Smart Contract Example</h2>
              <p>If your contracts compiled and migrated successfully, below will show a stored value of 5 (by default).</p>
              <p>Try changing the value stored on <strong>line 59</strong> of App.js.</p>
              <p>The stored value is: {this.state.storageValue}</p>
            </div>
          </div>
        </main>

        <Ticker />

      </div>
    );
  }
}

export default App
