import React, {useState, useEffect, useMemo} from 'react'
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
import EditOutlinedIcon from "@material-ui/icons/EditOutlined";
import CloseIcon from "@material-ui/icons/Close";
import ThumbUpAltIcon from '@material-ui/icons/ThumbUpAlt';
import ThumbDownAltIcon from '@material-ui/icons/ThumbDownAlt';

import Controls from "./controls";
import useTable from "./useTable";

import useEth from '../contexts/EthContext/useEth';

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
    { id: "index", label: "No" },
    { id: "name", label: "Song Name" },
    { id: "artistName", label: "Artist" },
    { id: "like", label: "Likes" },
    { id: "dislike", label: "Dislikes" },
    { id: "action", label: "", disableSorting: true },
    // { id: "artistAddr", label: "Actions", disableSorting: true },
];

const headCellsLibrary = [
    { id: "index", label: "No" },
    { id: "name", label: "Song Name" },
    { id: "artistName", label: "Artist" },
    { id: "like", label: "Likes" },
    { id: "dislike", label: "Dislikes" },
    { id: "artistAddr", label: "Donate", disableSorting: true },
    {id: "play", label: "Play", disableSorting: true },
    // { id: "artistAddr", label: "Actions", disableSorting: true },
];

const SongList = ({screen = "Explore", selectedSong, setSelectedSong, songsList}) => {
    const classes = useStyles();
    console.log(songsList);
    const { state } = useEth();

    const [records, setRecords] = useState(songsList);
    const [filterFn, setFilterFn] = useState({
        fn: (items) => {
            return items;
        },
    });

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

    const handlePlaySong = (songHash) => {
        console.log("handleSongClick", songHash);
        setSelectedSong({songName: "", songArtistName: "",songHash:songHash});
    }

    const handleSongPurchase = async (song) => {
        // console.log("songHash",songHash);
        const purchaseStatus = await state.contract.methods.purchaseSong(song.songHash).send({ from: state.account, value: song.cost});
        // console.log("purchase", purchaseStatus);
        // handlePlaySong(songHash);
    }

    const handleDonateArtist = async (artistAddr) => {
        console.log("artistAddr", artistAddr);
        const donationStatus = await state.contract.methods.donateToArtist(artistAddr).send({ from: state.account });
        console.log("donationStatus", donationStatus);
    }

  return (
      <>
          {/* <PageHeader
                title="New Employee"
                subTitle="Form design with validation"
                icon={<PeopleOutlineTwoToneIcon fontSize="large" />}
            /> */}
            <Paper className={classes.pageContent}>
                {/* <Toolbar>
                    <Controls.Input
                        label="Search Employees"
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
                    <Controls.Button
                        text="Add New"
                        variant="outlined"
                        startIcon={<AddIcon />}
                        className={classes.newButton}
                        onClick={() => {
                            setOpenPopup(true);
                            setRecordForEdit(null);
                        }}
                    />
                </Toolbar> */}
                <TblContainer>
                    <TblHead />
                    <TableBody>
                        {recordsAfterPagingAndSorting().map((item,index) => (
                            <TableRow key={item.songHash}
                                // onClick={(event) => handlePlaySong(item.hash)}
                            >
                                <TableCell>{index+1}</TableCell>
                                <TableCell>{item.songName}</TableCell>
                                <TableCell>{item.artistName}</TableCell>
                                <TableCell>
                                    <Controls.ActionButton
                                        color={item.songStatus===2 ? "success" : ""}
                                        onClick={() => {
                                            // (item.hash);
                                        }}
                                        startIcon={<ThumbUpAltIcon />}
                                        disabled={item.songStatus==='0' || item.songStatus === '2'}
                                    >
                                        {item.likeCount}
                                    </Controls.ActionButton>
                                    {/* {ActionButtonWithIcon(ThumbUpAltIcon, item.like, item.status === 1, blockifyServices.likeSong)} */}
                                </TableCell>
                                <TableCell>
                                    <Controls.ActionButton
                                        color={item.songStatus==='3' ? "error" : ""}
                                        onClick={() => {
                                            // blockifyServices.dislikeSong(item.hash);
                                        }}
                                        startIcon={<ThumbDownAltIcon />}
                                        disabled={item.songStatus==='0' || item.status === '3'}
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
                                            onClick={async() => {
                                                await handleDonateArtist(item.artistAddr);
                                            }}
                                        />
                                    </TableCell>)
                                }
                                <TableCell>
                                    <Controls.Button
                                        text={item.songStatus==='0' ? "Purchase" : "Play"}
                                        color="primary"
                                        onClick={async() => {
                                            item.songStatus === '0' ?
                                                await handleSongPurchase(item) :
                                                handlePlaySong(item)
                                        }}
                                    />
                                </TableCell>
                                <TableCell>
                                    {/* <Controls.ActionButton
                                        color="primary"
                                        onClick={() => {
                                            openInPopup(item);
                                        }}
                                    >
                                        <EditOutlinedIcon fontSize="small" />
                                    </Controls.ActionButton>
                                    <Controls.ActionButton
                                        color="secondary"
                                        onClick={() => {
                                            setConfirmDialog({
                                                isOpen: true,
                                                title:
                                                    "Are you sure to delete this record?",
                                                subTitle:
                                                    "You can't undo this operation",
                                                onConfirm: () => {
                                                    onDelete(item.id);
                                                },
                                            });
                                        }}
                                    >
                                        <CloseIcon fontSize="small" />
                                    </Controls.ActionButton> */}
                                </TableCell>
                            </TableRow>
                        ))}
                    </TableBody>
                </TblContainer>
                <TblPagination />
            </Paper>
            {/* <Popup
                title="Employee Form"
                openPopup={openPopup}
                setOpenPopup={setOpenPopup}
            >
                <EmployeeForm
                    recordForEdit={recordForEdit}
                    addOrEdit={addOrEdit}
                />
            </Popup>
            <Notification notify={notify} setNotify={setNotify} />
            <ConfirmDialog
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
        width: "75%",
    },
    newButton: {
        position: "absolute",
        right: "10px",
    },
}));

export default SongList