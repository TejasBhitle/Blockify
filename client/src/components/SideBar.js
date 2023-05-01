import React from "react";
import { withStyles } from "@material-ui/core";

import Controls from "./controls";

import useEth from "../contexts/EthContext/useEth";
// withStyles & makeStyles


const SideBar = (props) => {
    const { screen, setScreen, classes } = props;

    const { state } = useEth();

    return (
        <>
            <div className={classes.logo}>
                <h1>Blockify</h1>
            </div>
            <div className={classes.navButtons}>
                {/*  add navigation 3 buttons to show on right tabs will be explore library and uploads */}
                <Controls.Button
                    text="Explore Songs"
                    size="large"
                    color={screen === "explore" ? "default" : "primary"}
                    onClick={() => {
                        setScreen("explore");
                    }}
                />
                <Controls.Button
                    text="My Purchased Songs"
                    size="large"
                    color={screen === "library" ? "default" : "primary"}
                    onClick={() => {
                        setScreen("library");
                    }}  
                />
                <Controls.Button
                    text="My Uploaded Songs"
                    size="large"
                    color={screen === "upload" ? "default" : "primary"}
                    onClick={() => {
                        setScreen("upload");
                    }}
                />
        

            </div>
            <div className={classes.accountDetails}>
                <h2>Account Details</h2>
                <h3>UserName: {state.userName}</h3>
                <h4>{state.account}</h4>
                <p>Balance: {state.balance + " " + state.currencySymbol} </p>
                <p>Network ID: {state.networkID}</p>
                <p>Network Name: {state.networkName}</p>

                {/* <p>Contract Address: {state.contract?._address}</p> */}
            </div>
        </>
    );
};

const style = {
    navButtons: {
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        padding: "20px",
        // "& h1": {
        //     margin: "20px",
        //     fontSize: "2rem",
        // },
    },
    logo: {
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        padding: "20px",
        "& h1": {
            margin: "0px",
            fontSize: "2.5rem",
        },
    },
    accountDetails: {
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        padding: "20px",
        "& h2": {
            margin: "20px",
            fontSize: "1.5rem",
            textDecoration: "underline",
        },
        "& h3": {
            margin: "0px",
            fontSize: "1.5rem",
        },
        "& h4": {
            margin: "0px",
            fontSize: "1rem",
            overflow: "hidden",
            whiteSpace: "nowrap",
            textOverflow: "ellipsis",
            width: "100%",
        },
        "& p": {
            margin: "0px",
            fontSize: "1rem",
            // wrap text if go out of sidebar width
            wordBreak: "break-all",
        }      
    },
};

export default withStyles(style)(SideBar);
