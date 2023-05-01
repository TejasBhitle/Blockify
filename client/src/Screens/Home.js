import React, {useState} from 'react'
import {
    makeStyles,
    CssBaseline,
    ThemeProvider,
} from "@material-ui/core";
import { createTheme } from '@material-ui/core/styles';


import SideBar from '../components/SideBar'
import Explore from './Explore';
import Library from './Library';
import Upload from './Upload';
import SongPlayer from '../components/SongPlayer';

const Home = () => {
    const classes = useStyles();

    const [screen, setScreen] = useState("explore");
    const [selectedSong, setSelectedSong] = useState("");

  return (
      <ThemeProvider theme={theme}>
        <CssBaseline />
        <div className={classes.root}>
            <div className={classes.sideBar}>
                <SideBar screen={screen} setScreen={setScreen} />
            </div>
            <div className={classes.appMain}>
                {screen === "explore" && <Explore selectedSong={selectedSong} setSelectedSong={setSelectedSong} />}
                {screen === "library" && <Library selectedSong={selectedSong} setSelectedSong={setSelectedSong} />}
                {screen === "upload" && <Upload selectedSong={selectedSong} setSelectedSong={setSelectedSong} />}
                  <div className={classes.bottomAudioPlayerContainer}>
                    <div className={classes.bottomAudioPlayer}>
                        <SongPlayer selectedSong={selectedSong} />
                    </div>
                  </div>
              </div>
        </div>
    </ThemeProvider>
  )
}


const useStyles = makeStyles({
    root: {
        display: "flex",
        flexDirection: "row",
        justifyContent: "center",
        height: "100vh",
        width: "100vw",
    },
    sideBar: {
        display: "flex",
        flexDirection: "column",
        position: "absolute",
        left: "0px",
        width: "420px",
        flexGrow: 0,
        height: "100vh",
        backgroundColor: "#253053",
        color: "white",
        justifyContent: "space-between",
    },
    appMain: {
        paddingLeft: "420px",
        height: "100vh",
        flexGrow: 1,
    },
    bottomAudioPlayerContainer: {
        display: "flex",
        flexDirection: "column",
        position: "fixed",
        bottom: "20px",
        height: "150px",
        // padding: "20px",
        margin: "40px",
        borderRadius: "30px",
        border: "1px solid #333996",
        width: "calc(100% - 500px)",
        justifyContent: "center",
        alignItems: "center",
        backgroundColor: "white",
    },
    bottomAudioPlayer: {
        width: "50%",
        padding: "20px",
        // height: "80px"
    }
});


const theme = createTheme({
    palette: {
        primary: {
            main: "#333996",
            light: "#3c44b126",
            dark: "#42a5f5"
        },
        secondary: {
            main: "#ce93d8",
            light: "#f3e5f5",
            dark: "#ab47bc"
        },
        error: {
            main: "#f44336",
            light: "#e573733f",
            dark: "#d32f2f"
        },
        warning: {
            main: "#ff9800",
            light: "#ffb74d",
            dark: "#f57c00"
        },
        info: {
            main: "#2196f3",
            light: "#64b5f6",
            dark: "#1976d2"
        },
        success: {
            main: "#4caf50",
            light: "#81c7843f",
            dark: "#388e3c"
        },
        background: {
            default: "#f4f5fd",
        },
    },
    overrides: {
        MuiAppBar: {
            root: {
                transform: "translateZ(0)",
            },
        },
    },
    props: {
        MuiIconButton: {
            disableRipple: true,
        },
    },
});

export default Home