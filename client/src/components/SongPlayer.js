import React from 'react'

const SongPlayer = ({ selectedSong }) => {
    const { songName, songArtist, songHash } = selectedSong;
  console.log("songHash", songHash);
  console.log("SongUrl", `https://ipfs.io/ipfs/${songHash}`);
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
          {/* <h3>{songName}</h3>
          <h3>{songArtist}</h3> */}
        <audio src={`https://ipfs.io/ipfs/${songHash}`} autoPlay loop preload="true" controls />
    </div>
  )
}

export default SongPlayer