// SPDX-License-Identifier: MIT
pragma solidity ^0.8.11;

contract Blockify {
    
    uint public constant CHANGE = 0.01 ether;

    struct Song {
        string name;
        string hash;
        address payable artistAddr;
        uint256 cost;
    }

    struct User {
        address addr;
        string name;
        string[] songsBought;
        mapping(string => uint8) songStatus; // 0->default; 1->owned; 2->disliked; 3->liked
        string[] songsOwned; // User is artist of those songs
    }


    uint256 songsCount;
    uint256 usersCount;
    uint256 artistsCount;

    mapping(address => User) allUsersByAddress;
    mapping(address => User) allArtistsByAddress;
    mapping(string => Song) allSongsByHash;
    mapping(string => bool) isUserNameTaken;


    modifier registeredUser(address addr){
        require(!compareStrings(allUsersByAddress[addr].name,""), "User not registered.");
        _;
    }

    modifier validSongHash(string memory songHash){
        require(!compareStrings(allSongsByHash[songHash].name, ""), "Song of this hash does not exists.");
        _;
    }


    constructor () {
        songsCount = 0;
        usersCount = 0;
        artistsCount = 0;
    }


    event UserRegisterEvent(
        string userName,
        address addr
    );

    function registerUser(
        string memory userName) 
        public {
        
        // check if userName is not empty and if it does not exists already
        require(!compareStrings(userName, ""), "UserName cannot be empty");
        require(!isUserNameTaken[userName], "UserName already taken");

        User storage user = allUsersByAddress[msg.sender];
        user.name = userName;
        usersCount++;
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
        uint256 songCost) 
        public registeredUser(msg.sender) {

        // check if hash of the song already exists
        require(!compareStrings(allSongsByHash[songHash].name,""), "Song already exists");
        
        Song storage song = allSongsByHash[songHash];
        song.name = songName;
        song.hash = songHash;
        song.cost = songCost;
        song.artistAddr = payable(msg.sender);
        songsCount++;
    }


    event SongPurchaseEvent(
        string name,
        string hash,
        address payable artistAddr,
        uint256 cost,
        address buyerAddr
    );

    function purchaseSong(
        string memory songHash) 
        public payable 
        registeredUser(msg.sender) 
        validSongHash(songHash) {

        // check if 
        // 1. user already owns the song
        // 2. if the amount equals the cost of the song
        require(allUsersByAddress[msg.sender].songStatus[songHash] == 0, "Song already purchased by the user.");
        require(allSongsByHash[songHash].cost * 1 wei == msg.value, "Amount is not equal to song's cost.");

        // transfer the money to artist of the song
        allSongsByHash[songHash].artistAddr.transfer(msg.value);

        // add the song to user's ownedSongs list
        allUsersByAddress[msg.sender].songsBought.push(songHash);   
    }


    event SongLikedEvent(
        string songHash,
        uint256 updatedCost
    );

    function likeSong(
        string memory songHash) 
        public 
        registeredUser(msg.sender) 
        validSongHash(songHash) {
        
        require(allUsersByAddress[msg.sender].songStatus[songHash] != 3, "Song already liked by the user.");

        allSongsByHash[songHash].cost += CHANGE ; // increase popularity
        allUsersByAddress[msg.sender].songStatus[songHash] = 3; //mark as liked
    }

    event SongDislikedEvent(
        string songHash,
        uint256 updatedCost
    );

    function dislikeSong(
        string memory songHash) 
        public 
        registeredUser(msg.sender) 
        validSongHash(songHash) {
            
        require(allUsersByAddress[msg.sender].songStatus[songHash] != 2, "Song already disliked by the user.");

        allSongsByHash[songHash].cost -= CHANGE; // decrease popularity
        allUsersByAddress[msg.sender].songStatus[songHash] = 2; //mark as disliked
    }


    event ArtistDonatedEvent(
        uint256 amount,
        address payable artistAddr,
        address donarAddr
    );

    function donateToArtist(
        address payable artistAddress) 
        public payable 
        registeredUser(msg.sender) 
        registeredUser(artistAddress){

        // donate amount to artist
        artistAddress.transfer(msg.value);
    }


    function compareStrings(string memory a, string memory b) public pure returns (bool) {
        return keccak256(abi.encodePacked(a)) == keccak256(abi.encodePacked(b));
    }


}