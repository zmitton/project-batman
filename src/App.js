import React, { Component } from 'react';
import Web3 from 'web3';

class App extends Component {

  constructor(props) {
    super(props)
    this.state = {
      ethereumClient: undefined,
      batContract: undefined,
      batATMContract: undefined
    }

    this.BAT_ABI =
    [{"constant":true,"inputs":[],"name":"batFundDeposit","outputs":[{"name":"","type":"address"}],"payable":false,"type":"function"},{"constant":true,"inputs":[],"name":"name","outputs":[{"name":"","type":"string"}],"payable":false,"type":"function"},{"constant":false,"inputs":[{"name":"_spender","type":"address"},{"name":"_value","type":"uint256"}],"name":"approve","outputs":[{"name":"success","type":"bool"}],"payable":false,"type":"function"},{"constant":true,"inputs":[],"name":"totalSupply","outputs":[{"name":"","type":"uint256"}],"payable":false,"type":"function"},{"constant":true,"inputs":[],"name":"batFund","outputs":[{"name":"","type":"uint256"}],"payable":false,"type":"function"},{"constant":false,"inputs":[{"name":"_from","type":"address"},{"name":"_to","type":"address"},{"name":"_value","type":"uint256"}],"name":"transferFrom","outputs":[{"name":"success","type":"bool"}],"payable":false,"type":"function"},{"constant":true,"inputs":[],"name":"decimals","outputs":[{"name":"","type":"uint256"}],"payable":false,"type":"function"},{"constant":true,"inputs":[],"name":"tokenExchangeRate","outputs":[{"name":"","type":"uint256"}],"payable":false,"type":"function"},{"constant":false,"inputs":[],"name":"finalize","outputs":[],"payable":false,"type":"function"},{"constant":true,"inputs":[],"name":"version","outputs":[{"name":"","type":"string"}],"payable":false,"type":"function"},{"constant":false,"inputs":[],"name":"refund","outputs":[],"payable":false,"type":"function"},{"constant":true,"inputs":[],"name":"tokenCreationCap","outputs":[{"name":"","type":"uint256"}],"payable":false,"type":"function"},{"constant":true,"inputs":[{"name":"_owner","type":"address"}],"name":"balanceOf","outputs":[{"name":"balance","type":"uint256"}],"payable":false,"type":"function"},{"constant":true,"inputs":[],"name":"isFinalized","outputs":[{"name":"","type":"bool"}],"payable":false,"type":"function"},{"constant":true,"inputs":[],"name":"fundingEndBlock","outputs":[{"name":"","type":"uint256"}],"payable":false,"type":"function"},{"constant":true,"inputs":[],"name":"symbol","outputs":[{"name":"","type":"string"}],"payable":false,"type":"function"},{"constant":true,"inputs":[],"name":"ethFundDeposit","outputs":[{"name":"","type":"address"}],"payable":false,"type":"function"},{"constant":false,"inputs":[{"name":"_to","type":"address"},{"name":"_value","type":"uint256"}],"name":"transfer","outputs":[{"name":"success","type":"bool"}],"payable":false,"type":"function"},{"constant":false,"inputs":[],"name":"createTokens","outputs":[],"payable":true,"type":"function"},{"constant":true,"inputs":[],"name":"tokenCreationMin","outputs":[{"name":"","type":"uint256"}],"payable":false,"type":"function"},{"constant":true,"inputs":[],"name":"fundingStartBlock","outputs":[{"name":"","type":"uint256"}],"payable":false,"type":"function"},{"constant":true,"inputs":[{"name":"_owner","type":"address"},{"name":"_spender","type":"address"}],"name":"allowance","outputs":[{"name":"remaining","type":"uint256"}],"payable":false,"type":"function"},{"inputs":[{"name":"_ethFundDeposit","type":"address"},{"name":"_batFundDeposit","type":"address"},{"name":"_fundingStartBlock","type":"uint256"},{"name":"_fundingEndBlock","type":"uint256"}],"payable":false,"type":"constructor"},{"anonymous":false,"inputs":[{"indexed":true,"name":"_to","type":"address"},{"indexed":false,"name":"_value","type":"uint256"}],"name":"LogRefund","type":"event"},{"anonymous":false,"inputs":[{"indexed":true,"name":"_to","type":"address"},{"indexed":false,"name":"_value","type":"uint256"}],"name":"CreateBAT","type":"event"},{"anonymous":false,"inputs":[{"indexed":true,"name":"_from","type":"address"},{"indexed":true,"name":"_to","type":"address"},{"indexed":false,"name":"_value","type":"uint256"}],"name":"Transfer","type":"event"},{"anonymous":false,"inputs":[{"indexed":true,"name":"_owner","type":"address"},{"indexed":true,"name":"_spender","type":"address"},{"indexed":false,"name":"_value","type":"uint256"}],"name":"Approval","type":"event"}]

    this.BAT_ADDRESS = "0x0D8775F648430679A709E98d2b0Cb6250d2887EF"

    this.BAT_ATM_ABI =
    [{"constant":false,"inputs":[{"name":"_BATsPerEth","type":"uint256"}],"name":"changeRate","outputs":[],"payable":false,"type":"function"},{"constant":false,"inputs":[],"name":"withdrawBAT","outputs":[],"payable":false,"type":"function"},{"constant":true,"inputs":[],"name":"BATsPerEth","outputs":[{"name":"","type":"uint256"}],"payable":false,"type":"function"},{"constant":true,"inputs":[],"name":"pausedUntil","outputs":[{"name":"","type":"uint256"}],"payable":false,"type":"function"},{"constant":false,"inputs":[],"name":"withdrawETH","outputs":[],"payable":false,"type":"function"},{"constant":true,"inputs":[],"name":"bat","outputs":[{"name":"","type":"address"}],"payable":false,"type":"function"},{"payable":true,"type":"fallback"}]

    this.BAT_ATM_ADDRESS = "0x67D0C6e07bde60f88E9f7775F366C223Ce6A9160"
  }

  componentDidMount() {
    window.addEventListener('load', () => {
      var ethereumClient = new Web3(new Web3.providers.HttpProvider("https://mainnet.infura.io/EjLdRlni9SfrUBEnnvVt"))
      this.setState({
        ethereumClient: ethereumClient,
        batContract: ethereumClient.eth.contract(this.BAT_ABI).at(this.BAT_ADDRESS),
        batATMContract: ethereumClient.eth.contract(this.BAT_ATM_ABI).at(this.BAT_ATM_ADDRESS)
      })
      // if(typeof window.web3 !== 'undefined') {
      //   this.setState({ethereumClient: new Web3(window.web3.currentProvider)})
      // } else {
      //   this.setState({ethereumClient: new Web3(new Web3.providers.HttpProvider("https://mainnet.infura.io/EjLdRlni9SfrUBEnnvVt"))})
      // }
    })
  }

  render() {
    var ATMBalance, ExchangeRate

    if(this.state.batContract && this.state.batATMContract) {
      ExchangeRate =
      <p className="stat-data">{`1 ETH : ${this.state.batATMContract.BATsPerEth()} BAT`}</p>
      ATMBalance =
      <p className="stat-data">{`${this.state.batContract.balanceOf(this.state.batATMContract.address) / 1e18} BAT`}</p>
    } else {
      ExchangeRate =
      <p>{`- Loading Data -`}</p>
      ATMBalance =
      <p>{`- Loading Data -`}</p>
    }

    return (
      <div className="view-container">
        <div className="header"></div>
        <div className="main-hero">

          <div className="batatm-text-container">
            <p className="basic">Basic</p>
            <p className="attention">Attention</p>
            <p className="token">Token</p>
            <p className="atm">ATM</p>
          </div>

          <div className="main-content">

            <div className="batatm-stat balance">
              <p className="stat-header">CURRENT ATM BALANCE</p>
              {ATMBalance}
            </div>

            <div className="batatm-container">
              <img className="batatm" src="./images/batatm.png" />
              <div className="batatm-shadow"></div>
            </div>

            <div className="batatm-stat exchange-rate">
              <p className="stat-header">CURRENT ATM EXCHANGE RATE</p>
              {ExchangeRate}
            </div>

          </div>

          <div className="batatm-address-container">
            <p className="pre-segment">Send <span className="underline">ETH</span> to</p>
            <p className="address">0x67D0C6e07bde60f88E9f7775F366C223Ce6A9160</p>
            <p className="post-segment">Instantly Receive <span className="underline">BAT</span></p>
          </div>

          <p className="disclaimer primary">Do <span className="underline">NOT</span> send transactions to the ATM from an exchange account or Coinbase</p>
          <p className="disclaimer secondary">Send <span className="underline">75,000</span> gas with the transaction</p>

        </div>

        <a href="https://etherscan.io/address/0x67d0c6e07bde60f88e9f7775f366c223ce6a9160" target="_blank" className="view-on-etherscan">
          View on Etherscan
        </a>
      </div>
    );
  }
}

export default App;
