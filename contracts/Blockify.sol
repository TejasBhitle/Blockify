// SPDX-License-Identifier: MIT
pragma solidity <=0.8.19;

contract Blockify {
    
    struct Song {
        uint256 sid;
        string name;
        string hash;
        address payable artistAddr;
        uint256 cost;
    }

    struct User {
        uint256 uid;
        string name;
        uint256[] songsOwned;
    }

    struct Artist {
        uint256 aid;
        string name;
        uint256[] songsOwned;
    }


    uint256 songsCount;
    uint256 usersCount;
    uint256 artistsCount;

    mapping(uint256 => Song) allSongsList;
    mapping(uint256 => User) allUserList;
    mapping(address => User) allUsersByAddress;
    mapping(uint256 => Artist) allArtistsList;
    mapping(address => Artist) allArtistsByAddress;


    constructor () {
        songsCount = 0;
        usersCount = 0;
        artistsCount = 0;
    }

    // ------------------ Songs ------------------ // 
    function addSong(
        string memory songName,
        string memory songHash,
        uint256 songCost) public {
        
        Song memory song;
        song.name = songName;
        song.hash = songHash;
        song.sid = songsCount++;
        song.cost = songCost;
        
        allSongsList[song.sid] = song;
    }

    function getSongByID(uint256 sid) public view returns (
        uint256,
        string memory,
        string memory,
        uint256){

        return (
            sid,
            allSongsList[sid].name,
            allSongsList[sid].hash,
            allSongsList[sid].cost
        );
    }

    function purchaseSong(uint256 sid) public payable {
        Song memory songToPurchase = allSongsList[sid];
        if(msg.value == (songToPurchase.cost * 1 wei)){
            songToPurchase.artistAddr.transfer(msg.value);
            allUsersByAddress[msg.sender].songsOwned.push(sid);
        }
    }

    // ------------------ User ------------------ //
    function addUser(string memory userName) public {
        
        User memory user;
        user.name = userName;
        user.uid = usersCount++;
        
        allUserList[user.uid] = user;
    }

    function getUserByID(uint256 uid) public view returns (
        uint256,
        string memory){

        return (
            uid,
            allUserList[uid].name
        );
    }


    // ------------------ Artists ------------------ //
    function addArtist(string memory artistName) public {
        
        Artist memory artist;
        artist.name = artistName;
        artist.aid = artistsCount++;
        
        allArtistsList[artist.aid] = artist;
    }

    function getArtistByID(uint256 aid) public view returns (
        uint256,
        string memory,
        uint256[] memory){

        return (
            aid,
            allArtistsList[aid].name,
            allArtistsList[aid].songsOwned
        );
    }

    function donateToArtist(address payable artistAddress) public payable{
        artistAddress.transfer(msg.value);
    }

}