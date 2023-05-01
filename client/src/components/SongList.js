import React, {useState, useRef, useEffect, useMemo} from 'react'
import PeopleOutlineTwoToneIcon from "@material-ui/icons/PeopleOutlineTwoTone";
import {
    Paper,
    makeStyles,
    TableBody,
    TableRow,
    TableCell,
    Toolbar,
    InputAdornment,
} from "@material-ui/core";
import { Search } from "@material-ui/icons";
import AddIcon from "@material-ui/icons/Add";
// import EditOutlinedIcon from "@material-ui/icons/EditOutlined";
// import CloseIcon from "@material-ui/icons/Close";
import ThumbUpAltIcon from '@material-ui/icons/ThumbUpAlt';
import ThumbDownAltIcon from '@material-ui/icons/ThumbDownAlt';

import { toast } from 'react-toastify';

import Controls from "./controls";
import useTable from "./useTable";
import Popup from "./Popup";

import useEth from '../contexts/EthContext/useEth';
import DonateForm from './DonateForm';
import UploadForm from './UploadForm';

// 'songName' : song[0],
// 'artistAddr' : song[1],
// 'artistName' : song[2],
// 'likeCount' : song[3],
// 'dislikeCount' : song[4],
// 'cost' : song[5],
// 'songStatus' : song[6],
// 'songURL' : `https://ipfs.io/ipfs/${songId}`,
// 'songHash': songId

const headCellsExplore = [
    // { id: "index", label: "No" },
    { id: "songName", label: "Song Name" },
    { id: "artistName", label: "Artist" },
    { id: "cost", label: "Purchase Cost (GWei)"},
    { id: "likeCount", label: "Likes" },
    { id: "dislikeCount", label: "Dislikes" },
    { id: "action", label: "", disableSorting: true },
];

const headCellsLibrary = [
    // { id: "index", label: "No" },
    { id: "songName", label: "Song Name" },
    { id: "artistName", label: "Artist" },
    { id: "cost", label: "Purchase Cost (Gwei)"},
    { id: "likeCount", label: "Likes" },
    { id: "dislikeCount", label: "Dislikes" },
    { id: "artistAddr", label: "Donate", disableSorting: true },
    { id: "play", label: "Play", disableSorting: true },
];

const SongList = ({ screen = "explore", setSelectedSong, songsList, setToggle, handleAddNewSong }) => {
    // console.log("SongList", songsList")
    const classes = useStyles();
    // console.log(songsList);
    const { state } = useEth();

    const [records, setRecords] = useState(songsList);
    const [filterFn, setFilterFn] = useState({
        fn: (items) => {
            return items;
        },
    });

    const [openDonationPopup, setOpenDonationPopup] = useState(false);
    const [donee, setDonee] = useState(null);
    const handleOpenDonationPopup = (song) => {
        // console.log("handleOpenDonationPopup", song);
        setDonee(song);
        setOpenDonationPopup(true);
    };

    const [openAddNewPopup, setOpenAddNewPopup] = useState(false);
    const handleOpenAddNewPopup = (song) => {
        // console.log("handleOpenAddNewPopup", song);
        setOpenAddNewPopup(true);
    };

    useEffect(() => {
        setRecords(songsList);
    }, [songsList]);

    const headCells = useMemo(() => {
        if (screen === 'explore') return headCellsExplore;
        return headCellsLibrary;
    }, [screen]);

    const {
        TblContainer,
        TblHead,
        TblPagination,
        recordsAfterPagingAndSorting,
    } = useTable(records, headCells , filterFn);

    

    const handleSearch = (e) => {
        let target = e.target;
        setFilterFn({
            fn: (items) => {
                if (target.value === "") return items;
                else
                    return items.filter((x) =>
                        x.songName.toLowerCase().includes(target.value) ||
                        x.artistName.toLowerCase().includes(target.value)
                    );
            },
        });
    };

    const handlePlaySong = (song) => {
        // console.log("handleSongClick", song);
        setSelectedSong(song);
    }

    const handleLikeSong = (song) => {
        state.contract.methods
            .likeSong(song.songHash).send({ from: state.account })
            .then(data => {
                toast.success('Song liked !', {
                    position: toast.POSITION.TOP_RIGHT
                })
                setToggle(toggle => !toggle);
            })
            .catch(err => {
                toast.error(err?.message, {
                    position: toast.POSITION.TOP_RIGHT
                })
            })
    }

    const handleDislikeSong = (song) => {
        state.contract.methods
            .dislikeSong(song.songHash).send({ from: state.account })
            .then(data => {
                toast.success('Song disliked !', {
                    position: toast.POSITION.TOP_RIGHT
                })
                setToggle(toggle => !toggle);
            })
            .catch(err => {
                toast.error(err?.message, {
                    position: toast.POSITION.TOP_RIGHT
                })
            })
    }

    const handleSongPurchase = (song) => {
        state.contract.methods
            .purchaseSong(song.songHash).send({ from: state.account, value: song.cost * 1e9 })
            .then(data => {
                toast.success('Song purchased !', {
                    position: toast.POSITION.TOP_RIGHT
                })
                setToggle(toggle => !toggle);
            })
            .catch(err => {
                toast.error(err?.message, {
                    position: toast.POSITION.TOP_RIGHT
                })
            });
    }

    const handleSubmitDonation = ({donationAmount,artistAddr}) => {
        // console.log("artistAddr", artistAddr);
        
        state.contract.methods
            .donateToArtist(artistAddr).send({ from: state.account, value: donationAmount })
            .then(data => {
                toast.success("Thanks for the Donation :)", {
                    position: toast.POSITION.TOP_RIGHT
                });
                setOpenDonationPopup(false);
            })
            .catch(err => {
                toast.error(err?.message, {
                    position: toast.POSITION.TOP_RIGHT
                });
            });
    }

  return (
      <>
            <Paper className={classes.pageContent}>
                <Toolbar>
                    <Controls.Input
                        label="Search Songs By Name or Artist"
                        className={classes.searchInput}
                        InputProps={{
                            startAdornment: (
                                <InputAdornment position="start">
                                    <Search />
                                </InputAdornment>
                            ),
                        }}
                        onChange={handleSearch}
                  />
                  {
                    screen === "upload" &&
                    <Controls.Button
                        text="Upload New Song"
                        variant="outlined"
                        startIcon={<AddIcon />}
                        className={classes.newButton}
                        onClick={() => {
                            handleOpenAddNewPopup(true);
                            // setRecordForEdit(null);
                        }}
                    />
                  }
                </Toolbar>
                <TblContainer>
                    <TblHead />
                    <TableBody>
                        {recordsAfterPagingAndSorting().map((item,index) => (
                            <TableRow key={item.songHash}
                                // onClick={(event) => handlePlaySong(item.hash)}
                            >
                                <TableCell>{item.songName}</TableCell>
                                <TableCell>{item.artistName}</TableCell>
                                <TableCell>{item.cost/1e9}</TableCell>
                                <TableCell>
                                    <Controls.ActionButton
                                        color={item.songStatus==='3' ? "success" : ""}
                                        onClick={() => {
                                            handleLikeSong(item);
                                        }}
                                        startIcon={<ThumbUpAltIcon />}
                                        disabled={item.songStatus == 3 || item.songStatus == 0}
                                    >
                                        {item.likeCount}
                                    </Controls.ActionButton>
                                    {/* {ActionButtonWithIcon(ThumbUpAltIcon, item.like, item.status === 1, blockifyServices.likeSong)} */}
                                </TableCell>
                                <TableCell>
                                    <Controls.ActionButton
                                        color={item.songStatus==='2' ? "error" : ""}
                                        onClick={() => {
                                            handleDislikeSong(item);
                                        }}
                                        startIcon={<ThumbDownAltIcon />}
                                        disabled={item.songStatus == 2 || item.songStatus == 0}
                                    >
                                        {item.dislikeCount}
                                    </Controls.ActionButton>
                                </TableCell>
                                {
                                    screen === "library" && 
                                    (<TableCell>
                                        <Controls.Button
                                            text={"Donate Artist"}
                                            color="primary"
                                            onClick={() => {
                                                handleOpenDonationPopup(item);
                                            }}
                                        />
                                    </TableCell>)
                                }
                                <TableCell>
                                    <Controls.Button
                                        text={item.songStatus==='0' ? "Purchase" : "Play"}
                                        color="primary"
                                        onClick={() => {
                                            item.songStatus === '0' ?
                                                handleSongPurchase(item) :
                                                handlePlaySong(item)
                                        }}
                                    />
                                </TableCell>
                            </TableRow>
                        ))}
                    </TableBody>
                </TblContainer>
                <TblPagination />
            </Paper>
            <Popup
                title="Artist Donation"
                openPopup={openDonationPopup}
                setOpenPopup={setOpenDonationPopup}
            >
                <DonateForm
                    donee={donee}
                    handleSubmitDonation={handleSubmitDonation}
                />
            </Popup>
            <Popup
                title="Upload New Song"
                openPopup={openAddNewPopup}
                setOpenPopup={setOpenAddNewPopup}
            >
                <UploadForm
                  handleUploadSong={handleAddNewSong}
                  setOpenAddNewPopup={setOpenAddNewPopup}
                />
            </Popup>
            {/* <Notification notify={notify} setNotify={setNotify} /> */}
            {/* <ConfirmDialog
                confirmDialog={confirmDialog}
                setConfirmDialog={setConfirmDialog}
            /> */}
    </>
  )
}

const useStyles = makeStyles((theme) => ({
    pageContent: {
        margin: theme.spacing(5),
        padding: theme.spacing(3),
    },
    searchInput: {
        width: "50%",
    },
    newButton: {
        position: "absolute",
        right: "10px",
    },
}));

export default SongList