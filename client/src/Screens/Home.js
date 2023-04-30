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
          <CssBaseline/>
          <SideBar screen={screen} setScreen={setScreen} />
          <div className={classes.appMain}>
            {screen === "explore" && <Explore selectedSong={selectedSong} setSelectedSong={setSelectedSong} />}
            {screen === "library" && <Library selectedSong={selectedSong} setSelectedSong={setSelectedSong} />}
            {screen === "upload" && <Upload selectedSong={selectedSong} setSelectedSong={setSelectedSong} />}
              <div className={classes.bottomAudioPlayer}>
                <SongPlayer selectedSong={selectedSong} />
            </div>
          </div>
    </ThemeProvider>
  )
}

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

const useStyles = makeStyles({
    appMain: {
        paddingLeft: "420px",
        width: "100%",
    },
    bottomAudioPlayer: {
        paddingLeft: "420px",
        width: "100%",   
    }
});

export default Home