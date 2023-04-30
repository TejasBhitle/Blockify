import React, { useState } from "react";
import {
  makeStyles,
  CssBaseline,
  ThemeProvider,
} from "@material-ui/core";
import Intro from "./components/Intro/";
import Setup from "./components/Setup";
import Demo from "./components/Demo";
import Footer from "./components/Footer";
import Home from "./Screens/Home";

import { EthProvider } from "./contexts/EthContext";
// import useEth from '../contexts/EthContext/useEth';

import Register from "./Screens/Register";


function App() {
  const classes = useStyles();

  // const { state } = useEth();
  

  return (
    <EthProvider>
      <CssBaseline />
      <div className={classes.app} >
        {/* if(state.userName === "" || state.userName === undefined || state.userName === null) { */}
          {/* <Register /> */}
        {/* } else { */}
        <Home />
        {/* <Register /> */}
        {/* } */}
        {/* <div className="container"> */}
          {/* <Intro /> */}
          {/* <hr /> */}
          {/* <Setup /> */}
          {/* <hr /> */}
          {/* <Demo /> */}
          {/* <hr /> */}
          {/* <Footer /> */}
        {/* </div> */}
      </div>
    </EthProvider>
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
