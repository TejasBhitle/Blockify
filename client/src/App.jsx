import React, { useEffect, useState } from "react";
import {
  makeStyles,
  CssBaseline,
  ThemeProvider,
} from "@material-ui/core";
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

import Home from "./Screens/Home";

import useEth from './contexts/EthContext/useEth';

import Register from "./Screens/Register";


function App() {
  const classes = useStyles();

  const { state } = useEth();
  const [loading, setLoading] = useState(true);
  const [loadingMessage, setLoadingMessage] = useState("Trying to connect to your blockchain wallet.... Please make sure you are connected to the correct blockchain network.");

  useEffect(() => {
    if (state.contract !== null && state.account !== null) {
      setLoading(false);
    } else if (state.account !== null && state.contract === null) {
      setLoadingMessage("Contract not found. Please make sure you are connected to the correct blockchain network.");
    } else if (state.account === null) {
      setLoadingMessage("Trying to connect to your blockchain wallet.... Please make sure you are connected to the correct blockchain network.");
    }
  }, [state]);

  return (
    <>
      <CssBaseline />
      <div className={classes.app} >
        {loading ? 
          <div style={{
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            justifyContent: "center",
            height: "100vh",
            width: "100vw",
          }}>
            <h1
              style={{
                color: "white",
                background: "#253053",
                fontSize: "3rem",
                fontWeight: "bold",
                marginBottom: "1rem",
                padding: "1rem",
              }}
            >
              Welcome to Blockify
            </h1>
            <h2
              style={{
                color: "#253053", 
                fontSize: "2rem",
                fontWeight: "bold",
                marginBottom: "1rem",
                padding: "1rem",
              }}
            >
              Loading...
            </h2>
            <h3
              style={{
                color: "#253053", 
                fontSize: "1rem",
                fontWeight: "bold",
                marginBottom: "1rem",
                padding: "1rem",
              }}
            >
              {loadingMessage}
            </h3>
          </div>
          :
          (state.userName === "" || state.userName === undefined || state.userName === null) ?
          <Register />
          :
          <Home />
        }
        <ToastContainer />
      </div>
    </>
  );
}

const useStyles = makeStyles({
  app: {
    margin: 0,
    padding: 0,
    display: 'flex',
  }
});

export default App;
