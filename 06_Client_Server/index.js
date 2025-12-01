const express = require('express');
const path = require('path');

const app = express();
const PORT = 3000;

// static folder is client folder
app.use(express.static(path.join(__dirname, 'client')));



let songs = [
    { id: 1, title: "Shape of You", artist: "Ed Sheeran" },
    { id: 2, title: "Perfect", artist: "Ed Sheeran" },
    { id: 3, title: "Let Her Go", artist: "Passenger" }
];

app.get('/api/songs', (req, res) => {
    res.json(songs);
});

app.get('/api/songs/:id', (req, res) => {
    const songId = parseInt(req.params.id);
    const song = songs.find(s => s.id === songId);

    if (!song) {
        return res.status(404).json({ message: "Song not found" });
    }

    res.json(song);
});
// home page
app.get('/', (req, res) => {
    res.sendFile(path.join(__dirname, 'client/home.html'));
});

app.get('/home', (req, res) => {
    res.sendFile(path.join(__dirname, 'client/home.html'));
});

app.get('/index', (req, res) => {
    res.sendFile(path.join(__dirname, 'client/home.html'));
});



app.listen(PORT, () => {
    console.log(`Server running on http://localhost:${PORT}`);
});
