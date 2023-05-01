import React, { useEffect, useRef, useState} from 'react'
import { toast } from 'react-toastify';

import useEth from '../contexts/EthContext/useEth';
import SongList from '../components/SongList';

import Util from './util';

const Upload = ({selectedSong, setSelectedSong}) => {
  const { state } = useEth();

  // using this for reload data on song like/dislike or purchase
  const [toggle, setToggle] = useState(false);

  const [songs, setSongs] = useState([]);

  useEffect(() => {
    const getSongs = async () => {
      const allSongsIds = await state.contract.methods.getOwnedSongs().call({ from: state.account });
      console.log("getOwnedSongs",allSongsIds);
      const songs = await Promise.all(allSongsIds.map(async (songId) => {
        const song = await state.contract.methods.getSongDetails(songId).call({ from: state.account });
        // const songFile = await state.ifsClient.get(songId);
        return {
          'songName' : song[0],
          'artistAddr' : song[1],
          'artistName' : song[2],
          'likeCount' : song[3],
          'dislikeCount' : song[4],
          'cost' : song[5],
          'songStatus' : song[6],
          'songURL' : `https://ipfs.io/ipfs/${songId}`,
          'songHash': songId
        };
      }));
      console.log("songs",songs);
      setSongs(songs);
    }
    if (state.contract && state.account) {
      getSongs();
    }
  }, [state.contract, state.account, toggle]);

  
  const [songName, setSongName] = useState("");
  const [songCost, setSongCost] = useState(0);
  const [songFile, setSongFile] = useState("");

  const uploadSong = async () => {
    if (!songName || !songCost || !songFile) {
      window.alert("Please fill all the fields");
      return;
    };
    const ipfsUpload = await state.ipfsClient.add(songFile);
    console.log(ipfsUpload);
    const songHash = ipfsUpload.path;

    state.contract.methods
      .uploadSong(songName, songHash, songCost).send({ from: state.account })
      .then(data => {
        console.log("upload successful :", data)
        toast.success('Song uploaded !', {
          position: toast.POSITION.TOP_RIGHT
        });
      }).catch(err => {
        toast.error(Util.metamaskErrorParser(err), {
          position: toast.POSITION.TOP_RIGHT
      })
      });
  }

  return (
    <div>
      <h1 style={{
        display: 'flex',
        justifyContent: 'center',
      }}>
        My Purchased Songs
      </h1>
      <div> 
        <SongList
          songsList={songs}
          selectedSong={selectedSong}
          setSelectedSong={setSelectedSong}
          screen='upload'
          setToggle={setToggle}
        />
      </div>
      
      {/* <div>
        <input
          type="text"
          placeholder="Song Name"
          value={songName}
          onChange={(e) => setSongName(e.target.value)}
        />
        <input
          type="number"

          placeholder="Song Cost"
          value={songCost}
          onChange={(e) => setSongCost(e.target.value)}
        />
        <input
          type="file"
          placeholder="Song File"
          // value={songFile}
          onChange={(e) => {
            const file = e.target.files[0];
              setSongFile(file);
          }}
        /> */}
        {/* {songFile && <p>{songFile.name}</p>} */}
        {/* <button
          onClick={uploadSong}
        >
          Upload
        </button>
      </div>  */}
    </div>
  )
}

export default Upload