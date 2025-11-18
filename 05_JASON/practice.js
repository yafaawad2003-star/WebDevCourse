let song1 =
{
    "title": "Shape of You",
    "artist": "Ed Sheeran",
    "duration": 233,
    "genre": "Pop"
}

// Clone song1 to song2
let song2 = Object.assign({}, song1);

let { title, duration } = song2;


// Iterate using for...in
for (let key in song1) {
    console.log(`${key}: ${song1[key]}`);
}

let playlist =
{
    "playlistName": "My Favorites",
    "createdBy": "John",
    "songs": [
        {
            "title": "Shape of You",
            "artist": "Ed Sheeran",
            "duration": 233
        },
        {
            "title": "Blinding Lights",
            "artist": "The Weeknd",
            "duration": 200
        }
    ]
}

let addSong = {
    "title": "Shape of You",
    "artist": "Ed Sheeran",
    "duration": 233
}

playlist.songs.push({ addSong })

// Iterate and print song titles
playlist.songs.forEach((song, index) => {
    console.log(`Title: ${song.title}, Artist: ${song.artist}`);
});


const jsonOutput = JSON.stringify(playlist);
let playlist2 = JSON.parse(jsonText);

localStorage.setItem("playlist", jsonText);
let storgeText = localStorage.getItem("playlist");
let playlist3 = JSON.parse(storgeText);

// local storge :special place to save data in the browser(special file)

// call back function that calling/taking another function




