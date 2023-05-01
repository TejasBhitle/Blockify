import React, { useEffect, useState } from "react";
import {
  makeStyles,
  CssBaseline,
  ThemeProvider,
} from "@material-ui/core";
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

// import Intro from "./components/Intro/";
// import Setup from "./components/Setup";
// import Demo from "./components/Demo";
// import Footer from "./components/Footer";
import Home from "./Screens/Home";

import useEth from './contexts/EthContext/useEth';

import Register from "./Screens/Register";


function App() {
  const classes = useStyles();

  const { state } = useEth();
  console.log("state: ", state);

  // useEffect(() => {
  //   console.log("state: ", state);
  //   if (state.contract !== undefined) {
  //     state?.contract?.events?.Song({ filter: { myParam: 123 } })
  //       .on('data', event => console.log(event))
  //       .on('error', error => console.error(error));
  //   }
  // }, [state]);

  return (
    <>
      <CssBaseline />
      <div className={classes.app} >
        { (state.userName === "" || state.userName === undefined || state.userName === null) ?
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
