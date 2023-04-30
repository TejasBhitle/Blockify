import React, { useState} from 'react'

import useEth from '../contexts/EthContext/useEth';

const Upload = () => {
  const { state } = useEth();
  
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

    const songId = await state.contract.methods.uploadSong(songName, songHash, songCost).send({ from: state.account });
    console.log(songId);
  }




  return (
    <div>
      <h1>Upload</h1>
      
      <div>
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
        />
        {/* {songFile && <p>{songFile.name}</p>} */}
        <button
          onClick={uploadSong}
        >
          Upload
        </button>
      </div>
    </div>
  )
}

export default Upload