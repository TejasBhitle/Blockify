console.log("Welcome to Spotify");

// Initialize the Variables
let songIndex = 0;
let audioElement = new Audio('Songs/1.mp3');
let masterPlay = document.getElementById('masterPlay');
let myProgressBar = document.getElementById('myProgressBar');
let masterSongName = document.getElementById('masterSongName');
let gif = document.getElementById('gif');
let songItem = Array.from(document.getElementsByClassName('songItem'));

let songs = [
    {songName: "Stary-Boy", filePath: "Songs/1.mp3", coverPath: "Covers/1.jpg"},
    {songName: "Stereo-Song", filePath: "Songs/2.mp3", coverPath: "Covers/2.jpg"},
    {songName: "Despacito", filePath: "Songs/3.mp3", coverPath: "Covers/3.jpg"},
    {songName: "Sean kingston - eenie meenie", filePath: "Songs/4.mp3", coverPath: "Covers/4.jpg"},
    {songName: "Faded - Alan Walker", filePath: "Songs/5.mp3", coverPath: "Covers/5.jpg"},
    {songName: "Legends Never Die", filePath: "Songs/6.mp3", coverPath: "Covers/6.jpg"},
    {songName: "Play-Date", filePath: "Songs/7.mp3", coverPath: "Covers/7.jpg"},
    {songName: "Maine-Royaa-Remix", filePath: "Songs/8.mp3", coverPath: "Covers/8.jpg"},
    {songName: "Ginga-Pele FIFA", filePath: "Songs/9.mp3", coverPath: "Covers/9.jpg"},
    {songName: "Mount Olmpus", filePath: "Songs/10.mp3", coverPath: "Covers/10.jpg"},
]

songItem.forEach((element, i)=>{
    element.getElementsByTagName("img")[0].src = songs[i].coverPath;
    element.getElementsByClassName("songName")[0].innerText = songs[i].songName;
});

//audioElement.play();

// Handle play/pause click

masterPlay.addEventListener('click', ()=>{
    if(audioElement.paused || audioElement.currentTime<=0){
        audioElement.play();
        masterPlay.classList.remove('fa-play-circle');
        masterPlay.classList.add('fa-pause-circle');
        gif.style.opacity = 1;
    }
    else{
        audioElement.pause();
        masterPlay.classList.remove('fa-pause-circle');
        masterPlay.classList.add('fa-play-circle');
        gif.style.opacity = 0;
    }
});

// Listen to Events 
audioElement.addEventListener('timeupdate', ()=>{
    //Update Seekbar
    progress = parseInt((audioElement.currentTime/audioElement.duration)* 100);
    myProgressBar.value = progress;
});

myProgressBar.addEventListener('change', ()=>{
    audioElement.currentTime = myProgressBar.value * audioElement.duration/100; 
});

const makeAllPlays = ()=>{
    Array.from(document.getElementsByClassName('songItemPlay')).forEach((element)=>{
        element.classList.remove('fa-pause-circle');
        element.classList.add('fa-play-circle');
    });
}

Array.from(document.getElementsByClassName('songItemPlay')).forEach((element)=>{
    element.addEventListener('click', (e)=>{
        makeAllPlays();
        songIndex = parseInt(e.target.id)
        e.target.classList.remove('fa-play-circle');
        e.target.classList.add('fa-pause-circle');
        audioElement.src = `Songs/${songIndex+1}.mp3`;
        masterSongName.innerText = songs[songIndex].songName;
        audioElement.currentTime = 0;
        audioElement.play(); 
        gif.style.opacity = 1;
        masterPlay.classList.remove('fa-play-circle');
        masterPlay.classList.add('fa-pause-circle');
    });
});



/* Next and Previous Button JS */

document.getElementById('next').addEventListener('click', ()=>{
    if(songIndex>=9){
        songIndex = 0;
    }
    else{
        songIndex += 1;
    }
    audioElement.src = `Songs/${songIndex+1}.mp3`;
    masterSongName.innerText = songs[songIndex].songName;
    audioElement.currentTime = 0;
    audioElement.play();
    gif.style.opacity = 1; 
    masterPlay.classList.remove('fa-play-circle');
    masterPlay.classList.add('fa-pause-circle');
});

document.getElementById('previous').addEventListener('click', ()=>{
    if(songIndex<=0){
        songIndex = 0;
    }
    else{
        songIndex -= 1;
    }
    audioElement.src = `Songs/${songIndex+1}.mp3`;
    masterSongName.innerText = songs[songIndex].songName;
    audioElement.currentTime = 0;
    audioElement.play();
    gif.style.opacity = 1; 
    masterPlay.classList.remove('fa-play-circle');
    masterPlay.classList.add('fa-pause-circle');
});