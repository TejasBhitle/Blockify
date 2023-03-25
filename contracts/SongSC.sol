// SPDX-License-Identifier: MIT
pragma solidity <=0.8.19;

contract SongSC {
    
    struct Song {
        uint256 sid;
        string name;
        string hash;
        address payable artistAddr;
        uint256 price;
    }

    uint256 songsCount;

    mapping(uint256 => Song) allSongsList;


    constructor () {
        songsCount = 0;
    }

    function addSong(
        string memory songName,
        string memory songHash,
        uint256 songPrice) public {
        
        Song memory song;
        song.name = songName;
        song.hash = songHash;
        song.sid = songsCount++;
        song.price = songPrice;
        
        allSongsList[song.sid] = song;
    }

    function getSongByID(uint256 sid) public view returns (
        uint256,
        string memory,
        string memory,
        uint256){

        return (
            allSongsList[sid].sid,
            allSongsList[sid].name,
            allSongsList[sid].hash,
            allSongsList[sid].price
        );
    }

}