import React, { useReducer, useCallback, useEffect } from "react";
import Web3 from "web3";
import { Web3Storage } from 'web3.storage/dist/bundle.esm.min.js';

import EthContext from "./EthContext";
import { reducer, actions, initialState } from "./state";

function EthProvider({ children }) {
  const [state, dispatch] = useReducer(reducer, initialState);

  const init = useCallback(
    async artifact => {
      if (artifact) {
        const web3 = new Web3(Web3.givenProvider || "ws://localhost:8545");
        const accounts = await web3.eth.requestAccounts();
        const account = accounts[0];
        const hexBalance = await web3.eth.getBalance(account);
        const balance = parseInt(hexBalance) / 10 ** 18;
        const networkID = await web3.eth.net.getId();
        // get currency symbol from networkID
        const currencySymbol = 'ETH';

        const { abi } = artifact;
        let address, networkName, contract;
        try {
          address = artifact.networks[networkID].address;
          networkName = artifact.networks[networkID].name;
          contract = new web3.eth.Contract(abi, address);
        } catch (err) {
          console.error(err);
        }
        const userName = await contract.methods.getUserNameFromAddress(accounts[0]).call({ from: accounts[0] });
        const ipfsClient = new Web3Storage({ token: `eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOiJkaWQ6ZXRocjoweDQ2MDRBQkI0ZDk1YzdmQjA0QWZlNDhiODIwQTJGRGJkQzk0RGQxNTkiLCJpc3MiOiJ3ZWIzLXN0b3JhZ2UiLCJpYXQiOjE2ODMyOTAyMDA2NTgsIm5hbWUiOiJyaWRkaGFtciJ9.zH-EPD0sH8t-Za2Z2_9irGXnwgf6DAE8Jq1zgF3-_Eo` })

        dispatch({
          type: actions.init,
          data: { artifact, web3, accounts, account, userName, balance, currencySymbol, networkID, networkName, contract, ipfsClient }
        });
      }
    }, []);

  useEffect(() => {
    const tryInit = async () => {
      try {
        const artifact = require("../../contracts/Blockify.json");
        init(artifact);
      } catch (err) {
        console.error(err);
      }
    };

    tryInit();
  }, [init]);

  useEffect(() => {
    const events = ["chainChanged", "accountsChanged"];
    const handleChange = () => {
      init(state.artifact);
    };

    events.forEach(e => window.ethereum.on(e, handleChange));
    return () => {
      events.forEach(e => window.ethereum.removeListener(e, handleChange));
    };
  }, [init, state.artifact]);

  return (
    <EthContext.Provider value={{
      state,
      dispatch
    }}>
      {children}
    </EthContext.Provider>
  );
}

export default EthProvider;
