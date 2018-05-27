import React, { Component } from 'react'
//import SimpleStorageContract from '../build/contracts/SimpleStorage.json'
import getWeb3 from './utils/getWeb3'

import Ticker from './displayComponent/Ticker.js'
import SourceSelector from './SourceSelector/SourceSelector.js'

import './css/oswald.css'
import './css/open-sans.css'
import './css/pure-min.css'
import './App.css'

class App extends Component {
  constructor(props) {
    super(props)

    this.state = {
      storageValue: 0,
      web3: null,
      RR: null,
      web3error: null,
      account: null,
      networkId: null,
      netIdError: null,

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
  }

  componentDidUpdate(prevProps, prevState){
  if(prevState.web3!==this.state.web3) {
    this.whichNetwork();
  }
  // if(prevState.networkId!==this.state.networkId) {
  //   this.reportNetwork(this.state.networkId);
  // }
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

// reportNetwork = (netId) => {
//   if(netId!=="3"){
//     this.setState({netIdError: "You must be on the Ropsten network!"})
//   }
//   if(netId==="3"){
//     this.setState({netIdError: null})
//   }
// }

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
              
              <SourceSelector />

            </div>
          </div>

        </main>

        <Ticker />

      </div>
    );
  }
}

export default App
