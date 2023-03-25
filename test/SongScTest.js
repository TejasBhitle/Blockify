const SongSC = artifacts.require('SongSC.sol');

contract('SongSC', ()=>{
    it('Songs test init', async () => {
        const songSC = await SongSC.new();
        const allsongs = await songSC.getAllSongs();
        assert(allsongs.length == 2)
    });
})

// contract('SongSC', ()=>{
//     it('Songs test add', async () => {
//         const songSC = await SongSC.new();
//         let s = Song()
//         s.id = "sid3";
//         s.name = "Song3";
//         await SongSC.addSong(song);
//         const allsongs = await songSC.getAllSongs();
//         assert(allsongs.length == 2)
//     });
// })