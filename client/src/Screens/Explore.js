import React, {useState, useEffect} from 'react';

import useEth from '../contexts/EthContext/useEth';
import SongList from '../components/SongList';

const Explore = ({selectedSong, setSelectedSong}) => {

  const { state } = useEth();
  
  // using this for reload data on song like/dislike or purchase
  const [toggle, setToggle] = useState(false);

  const [songs, setSongs] = useState([]);

  useEffect(() => {
    const getSongs = async () => {
      const allSongsIds = await state.contract.methods.getAllSongs().call({ from: state.account });
      console.log("getAllSongs",allSongsIds);
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


  return (
    <div>
      <h1 style={{
        display: 'flex',
        justifyContent: 'center',
      }}>Explore Songs</h1>
      <div>
        <SongList
          songsList={songs}
          selectedSong={selectedSong}
          setSelectedSong={setSelectedSong}
          screen={"explore"}
          setToggle={setToggle}
        />
      </div>
    </div>
  )
}

export default Explore