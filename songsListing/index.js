
//-- Get HTML Dom element references
const form = document.getElementById('songForm');
const list = document.getElementById('songList');
const submitBtn = document.getElementById('submitBtn');


//if not exist create empty array 
//else get json text and convert it to object json
let songs = JSON.parse(localStorage.getItem('playlist')) || [];

// User click submit button (add button here)
form.addEventListener('submit', (e) => {
    // Prevent form submission to the server and let me handle it here
    e.preventDefault();

    // Read form data
    const title = document.getElementById('title').value;
    const url = document.getElementById('url').value;

    // create JSON OBJ based on URL title
    const song = {
        id: Date.now(),  // Unique ID
        title: title,
        url: url,
        dateAdded: Date.now()
    };


    songs.push(song);
    //TO DO SAVE  AND RERENDER 
    form.reset();
});

functionsaveAndRender()
{
    localStorage.setItem('playlist', JSON.stringify(songs));
    renderSongs();
}


function renderSongs(songArray) {
    list.innerHTML = ''; // Clear current list

    songArray.forEach(song => {
        // Create table row
        const row = document.createElement('tr');

        row.innerHTML = `
            <td>${song.title}</td>
            <td><a href="${song.url}" target="_blank" class="text-info">Watch</a></td>
            <td class="text-end">
                <button class="btn btn-sm btn-warning me-2" onclick="editSong(${song.id})">
                    <i class="fas fa-edit"></i>
                </button>
                <button class="btn btn-sm btn-danger" onclick="deleteSong(${song.id})">
                    <i class="fas fa-trash"></i>
                </button>
            </td>
        `;
        list.appendChild(row);
    });
}


function deleteSong(id) {
    if (confirm('Are you sure?')) {
        // Filter out the song with the matching ID
        songs = songs.filter(song => song.id !== id);
        saveAndRender();
    }
}

document.addEventListener('DOMContentLoaded', () => {
    renderSongs(songs);
});

let userObj =
{
    username: "yafaaawa",
    grade: 85,
    password: "pass123",
    isConnected: true,
    address: {
        country: "Isreal",
        city: "KASH",
        street: "ben gurion"
    },
    allGrades: [{ csharp: 90 }, { cpp: 70 }, 80, 90, 100, 85]
}

let newGrade = userObj.grade + 10;
userObj.grade += 10;
userObj.id = 1000;

userObj2 = userObj;
userObj.grade += 10;
userObj2.grade = 0;
let grade1 = userObj.grade;

userObj.adress.street = "";
userObj.adress["adress"].city = "TEL AVIV";

let arr = [userObj, {
    username: "yafaaawa",
    grade: 85,
    password: "pass123",
    isConnected: true,
    address: {
        country: "Isreal",
        city: "KASH",
        street: "ben gurion"
    },
    allGrades: [{ csharp: 90 }, { cpp: 70 }, 80, 90, 100, 85]
}]

arr[0].allGrades[1] = { cpp: 80 };
arr[1].avg = 95;
let user2 = arr[1];
user2.password = "12345";