const SongSC = artifacts.require('SongSC.sol');

contract('SongSC', ()=>{
    it('Songs test', async () => {
        const songSC = await SongSC.new();
        const allsongs = await songSC.getAllSongs();
        assert(allsongs.length == 2)
    });
})