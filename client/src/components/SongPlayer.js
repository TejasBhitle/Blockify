import React from 'react'
import useEth from '../contexts/EthContext/useEth';

const SongPlayer = ({ selectedSong }) => {
  const { songName, artistName, songURL} = selectedSong;

  return (
    <div style={{
      display: "flex",
      flexDirection: "column",
      alignItems: "center",
      justifyContent: "center",
      height: "100px",
      width: "100%",
    }}>
        {/* play audio based on song url remove download option from audio player show song and artist name and also like and dislike buttons */}
          <div>SongPlayer</div>
      {songName && <h3>{songName} : By Artist {artistName}</h3>}
      <audio src={songURL} autoPlay loop preload="true" controls 
        style={{
          width: "400px",
          height: "80px",
        }}
        />
    </div>
  )
}

export default SongPlayer