const Blockify = artifacts.require('Blockify.sol');

contract('Blockify', ()=>{
    it('Songs test init', async () => {
        const blockify = await Blockify.new();
        const allsongs = await blockify.getAllSongs();
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