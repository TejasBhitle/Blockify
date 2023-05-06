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
          'songURL' : `https://${songId}.ipfs.w3s.link/${song[7]}`,
          'songHash': songId,
          'songFileName': song[7]
        };
      }));
      console.log("songs",songs);
      setSongs(songs);
    }
    if (state.contract && state.account) {
      getSongs();
    }
  }, [state.contract, state.account, toggle]);

  const handleAddNewSong = async ({songName, songCost, songFile, closePopup}) => {
    console.log("songName", songName);
    console.log("songCost", songCost);
    console.log("songFile", songFile);

    // songFile.screenName = songName;
    const songFileName = songFile.name;
    const songHash = await state.ipfsClient.put([songFile]);
    console.log('File uploaded with CID:', songFileName, songName, songHash);
    // const songHash = ipfsUpload.path;

    state.contract.methods
      .uploadSong(songName, songHash, songFileName, songCost).send({ from: state.account })
      .then(data => {
        console.log("upload successful :", data)
        toast.success('Song uploaded !', {
          position: toast.POSITION.TOP_RIGHT
        });
        closePopup();
        setToggle(toggle => !toggle);
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
          handleAddNewSong={handleAddNewSong}
        />
      </div>
    </div>
  )
}

export default Upload

// https://bafybeigzpxg2powlrwf3aoa4xy4uj7nouj7x23hq7ioxosnexbhvo56zx4.ipfs.w3s.link/hOSAANA.MP3
// https://bafybeigzpxg2powlrwf3aoa4xy4uj7nouj7x23hq7ioxosnexbhvo56zx4.ipfs.dweb.link/hOSAANA.MP3%7D