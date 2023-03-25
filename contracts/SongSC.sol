// SPDX-License-Identifier: MIT
pragma solidity <=0.8.19;

contract SongSC {
    
    struct Song {
        string id;
        string name;
    }

    Song[] allSongs;


    constructor () public {
        Song memory s1;
        s1.id = "sid1";
        s1.name = "Song 1";
        addSong(s1);

        Song memory s2;
        s2.id = "sid2";
        s2.name = "Song 2";
        addSong(s2);
    }


    function addSong(Song memory song) public {
        allSongs.push(song);
    }
 
    function getAllSongs() external view returns(Song[] memory songs) {
        return allSongs;
    }

}