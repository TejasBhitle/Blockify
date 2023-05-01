// SPDX-License-Identifier: MIT
pragma solidity ^0.8.11;

contract Blockify {
    
    uint public constant CHANGE = 10000 gwei;

    struct Song {
        string name;
        string hash;
        address payable artistAddr;
        string artistName;
        uint256 likeCount;
        uint256 dislikeCount;
        uint256 cost;
    }

    struct User {
        address addr;
        string name;
        string[] songsBought;
        mapping(string => uint8) songStatus; // 0->default; 1->purchased; 2->disliked; 3->liked; 4->owned
        string[] songsOwned; // User is artist of those songs
    }


    uint256 songsCount;
    uint256 usersCount;
    string[] allSongs;

    mapping(address => User) allUsersByAddress;
    mapping(string => Song) allSongsByHash;
    mapping(string => bool) isUserNameTaken;


    modifier registeredUser(address addr){
        require(!stringEquals(allUsersByAddress[addr].name,""), "User not registered.");
        _;
    }

    modifier validSongHash(string memory songHash){
        require(!stringEquals(allSongsByHash[songHash].name, ""), "Song of this hash does not exists.");
        _;
    }


    constructor () {
        songsCount = 0;
        usersCount = 0;
    }


    event UserRegisterEvent(
        string userName,
        address addr
    );

    function countTest()
    public pure returns (int) {
        return 524288;
    }

    function registerUser(
        string memory userName
    ) public {
        
        // check if userName is not empty and if it does not exists already
        require(!stringEquals(userName, ""), "UserName cannot be empty");
        require(!isUserNameTaken[userName], "UserName already taken");

        User storage user = allUsersByAddress[msg.sender];
        user.name = userName;
        isUserNameTaken[userName] = true;
        usersCount++;

        emit UserRegisterEvent(userName, msg.sender);
    }

    function getUserNameFromAddress(
        address userAddr
    ) public view returns (string memory){
        return allUsersByAddress[userAddr].name;
    }

    function getSongDetails(
        string memory songHash
    )   public view
        validSongHash(songHash)
        returns (
            string memory,
            address,
            string memory,
            uint256,
            uint256,
            uint256,
            uint256
        ){

            return (
                allSongsByHash[songHash].name,
                allSongsByHash[songHash].artistAddr,
                allSongsByHash[songHash].artistName,
                allSongsByHash[songHash].likeCount,
                allSongsByHash[songHash].dislikeCount,
                allSongsByHash[songHash].cost,
                allUsersByAddress[msg.sender].songStatus[songHash]
            );
    }

    function getPurchasedSongs()
        public view 
        registeredUser(msg.sender)
        returns (string[] memory){

        return allUsersByAddress[msg.sender].songsBought;
    }

    function getOwnedSongs()
        public view 
        registeredUser(msg.sender)
        returns (string[] memory){

        return allUsersByAddress[msg.sender].songsOwned;
    }

    function getAllSongs()
        public view 
        returns (string[] memory){
        return allSongs;
    }


    event SongUploadEvent(
        string name,
        string hash,
        address payable artistAddr,
        uint256 cost
    );

    function uploadSong(
        string memory songName,
        string memory songHash,
        uint256 songCost
    ) public 
      registeredUser(msg.sender) {

        // check if hash of the song already exists
        require(stringEquals(allSongsByHash[songHash].name,""), "Song already exists");
        
        Song storage song = allSongsByHash[songHash];
        song.name = songName;
        song.hash = songHash;
        song.cost = songCost * 1 gwei;
        song.artistAddr = payable(msg.sender);
        song.artistName = this.getUserNameFromAddress(msg.sender);
        song.likeCount = 0;
        song.dislikeCount = 0;
        songsCount++;

        allSongs.push(songHash);
        allUsersByAddress[msg.sender].songStatus[songHash] = 4; //mark as owner

        allUsersByAddress[msg.sender].songsOwned.push(songHash);

        emit SongUploadEvent(songName, songHash, song.artistAddr, songCost);
    }


    event SongPurchaseEvent(
        string name,
        string hash,
        address payable artistAddr,
        uint256 cost,
        address buyerAddr
    );

    function purchaseSong(
        string memory songHash
    ) public payable 
      registeredUser(msg.sender) 
      validSongHash(songHash) 
      returns (
            string[] memory,
            uint256
        ){

        // check if 
        // 1. user already owns the song
        // 2. if the amount equals the cost of the song
        require(allUsersByAddress[msg.sender].songStatus[songHash] == 0, "Song already purchased by the user.");
        require(allSongsByHash[songHash].cost * 1 gwei == msg.value, "Amount is not equal to song's cost.");

        // transfer the money to artist of the song
        allSongsByHash[songHash].artistAddr.transfer(msg.value);

        // add the song to user's ownedSongs list
        allUsersByAddress[msg.sender].songsBought.push(songHash);

        // update SongStatus
        allUsersByAddress[msg.sender].songStatus[songHash] = 1; // mark as purchased

        emit SongPurchaseEvent(
            allSongsByHash[songHash].name,
            songHash,
            allSongsByHash[songHash].artistAddr,
            allSongsByHash[songHash].cost,
            msg.sender
        );

        return(
            allUsersByAddress[msg.sender].songsBought,
            allUsersByAddress[msg.sender].songStatus[songHash]
        );
    }


    event SongLikedEvent(
        string songHash,
        uint256 updatedCost
    );

    function likeSong(
        string memory songHash
    ) public 
      registeredUser(msg.sender) 
      validSongHash(songHash) {
        
        require(allUsersByAddress[msg.sender].songStatus[songHash] != 0, "Song not owned by the user.");
        require(allUsersByAddress[msg.sender].songStatus[songHash] != 3, "Song already liked by the user.");

        allSongsByHash[songHash].likeCount++;
        allSongsByHash[songHash].cost += CHANGE ; // increase popularity

        if(allUsersByAddress[msg.sender].songStatus[songHash] == 2){ // song previosuly disliked by the user
            allSongsByHash[songHash].dislikeCount--;
        }
        allUsersByAddress[msg.sender].songStatus[songHash] = 3; //mark as liked

        emit SongLikedEvent(songHash, allSongsByHash[songHash].cost);
    }

    event SongDislikedEvent(
        string songHash,
        uint256 updatedCost
    );

    function dislikeSong(
        string memory songHash
    ) public 
      registeredUser(msg.sender) 
      validSongHash(songHash) {
        
        require(allUsersByAddress[msg.sender].songStatus[songHash] != 0, "Song not owned by the user.");
        require(allUsersByAddress[msg.sender].songStatus[songHash] != 2, "Song already disliked by the user.");

        allSongsByHash[songHash].dislikeCount++;
        allSongsByHash[songHash].cost -= CHANGE; // decrease popularity

        if(allUsersByAddress[msg.sender].songStatus[songHash] == 3){ // song previosuly liked by the user
            allSongsByHash[songHash].likeCount--;
        }
        allUsersByAddress[msg.sender].songStatus[songHash] = 2; //mark as disliked

        emit SongDislikedEvent(songHash, allSongsByHash[songHash].cost);
    }


    event ArtistDonatedEvent(
        uint256 amount,
        address payable artistAddr,
        address donarAddr
    );

    function donateToArtist(
        address payable artistAddress
    ) public payable 
        registeredUser(msg.sender) 
        registeredUser(artistAddress){

        // donate amount to artist
        artistAddress.transfer(msg.value);
        emit ArtistDonatedEvent(msg.value, artistAddress, msg.sender);
    }


    function stringEquals(string memory a, string memory b) public pure returns (bool) {
        return keccak256(abi.encodePacked(a)) == keccak256(abi.encodePacked(b));
    }


}