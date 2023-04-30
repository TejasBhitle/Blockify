import React from 'react'
import useEth from "../contexts/EthContext/useEth";

const Setup = () => {
  const { state } = useEth();

  return (
    <div>
      Account Details
      <div>Account: {state.account}</div>
      <div>Balance: {state.balance}</div>
      <div>Network ID: {state.networkID}</div>
      <div>Network Name: {state.networkName}</div>
      <div>Contract Address: {state.contract?._address}</div>
    </div>
  )
}

export default Setup