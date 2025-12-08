// אלמנטים
const form = document.getElementById('songForm');
const list = document.getElementById('songList');
const submitBtn = document.getElementById('submitBtn');
const hiddenId = document.getElementById('songId');

const searchInput = document.getElementById('search');
const sortRadios = document.querySelectorAll('input[name="sortBy"]');

const tableView = document.getElementById('tableView');
const cardView = document.getElementById('cardView');
const viewToggleBtn = document.getElementById('viewToggleBtn');
const viewToggleIcon = document.getElementById('viewToggleIcon');

// נתונים
let songs = JSON.parse(localStorage.getItem('songs')) || [];
let isTableView = true; // טבלה כברירת מחדל

// -------- טופס: הוספה / עדכון --------
form.addEventListener('submit', (e) => {
    e.preventDefault();

    const title = document.getElementById('title').value.trim();
    const url = document.getElementById('url').value.trim();
    const rating = document.getElementById('rating').value;

    if (!title || !url || !rating) return;

    const existingId = hiddenId.value;

    if (existingId) {
        // עדכון
        const i = songs.findIndex(s => s.id === Number(existingId));
        if (i !== -1) {
            songs[i].title = title;
            songs[i].url = url;
            songs[i].rating = rating;
        }
        submitBtn.innerHTML = '<i class="fas fa-plus"></i> Add';
        hiddenId.value = '';
    } else {
        // חדש
        songs.push({
            id: Date.now(),
            title,
            url,
            rating,
            dateAdded: Date.now()
        });
    }

    saveAndRender();
    form.reset();
    document.getElementById('rating').value = '';
});

// -------- חיפוש + מיון --------
searchInput.addEventListener('input', applyFilters);
sortRadios.forEach(r => r.addEventListener('change', applyFilters));

function getSortMode() {
    const checked = document.querySelector('input[name="sortBy"]:checked');
    return checked ? checked.value : 'date';
}

// -------- טוגל תצוגה טבלה / כרטיסים --------
viewToggleBtn.addEventListener('click', () => {
    isTableView = !isTableView;

    if (isTableView) {
        tableView.classList.remove('d-none');
        cardView.classList.add('d-none');
        viewToggleIcon.classList.remove('fa-th-large');
        viewToggleIcon.classList.add('fa-list');
    } else {
        tableView.classList.add('d-none');
        cardView.classList.remove('d-none');
        viewToggleIcon.classList.remove('fa-list');
        viewToggleIcon.classList.add('fa-th-large');
    }
});

// -------- שמירה ורענון --------
function saveAndRender() {
    localStorage.setItem('songs', JSON.stringify(songs));
    applyFilters();
}

function applyFilters() {
    const term = searchInput.value.toLowerCase();

    let filtered = songs.filter(song =>
        song.title.toLowerCase().includes(term) ||
        song.url.toLowerCase().includes(term)
    );

    const sortBy = getSortMode();

    if (sortBy === 'name') {
        filtered.sort((a, b) => a.title.localeCompare(b.title));
    } else if (sortBy === 'rating') {
        filtered.sort((a, b) => Number(b.rating) - Number(a.rating));
    } else {
        // date
        filtered.sort((a, b) => b.dateAdded - a.dateAdded);
    }

    renderSongs(filtered);
}

function renderSongs(songsToShow) {
    list.innerHTML = '';
    cardView.innerHTML = '';

    songsToShow.forEach(song => {
        const videoId = getYouTubeId(song.url);
        const thumbUrl = videoId
            ? `https://img.youtube.com/vi/${videoId}/hqdefault.jpg`
            : '';

        // --- שורה בטבלה ---
        const row = document.createElement('tr');
        row.innerHTML = `
            <td>
                ${thumbUrl
                ? `<img src="${thumbUrl}" alt="${song.title}"
                           style="width:80px;height:auto;border-radius:4px;margin-right:8px;">`
                : ''
            }
                ${song.title}
            </td>
            <td>${song.rating}</td>
            <td>${formatDate(song.dateAdded)}</td>
            <td class="text-end">
                <a href="${song.url}" target="_blank"
                   class="btn btn-sm btn-info me-2">
                    <i class="fas fa-play"></i>
                </a>
                <button class="btn btn-sm btn-warning me-2"
                        onclick="editSong(${song.id})">
                    <i class="fas fa-edit"></i>
                </button>
                <button class="btn btn-sm btn-danger"
                        onclick="deleteSong(${song.id})">
                    <i class="fas fa-trash"></i>
                </button>
            </td>
        `;
        list.appendChild(row);

        // --- כרטיס ב-Cards View ---
        const col = document.createElement('div');
        col.className = 'col-md-4';

        col.innerHTML = `
            <div class="card h-100">
                ${thumbUrl
                ? `<img src="${thumbUrl}" class="card-img-top" alt="${song.title}">`
                : ''
            }
                <div class="card-body d-flex flex-column">
                    <h5 class="card-title">${song.title}</h5>
                    <p class="card-text mb-1">
                        <strong>Rating:</strong> ${song.rating}
                    </p>
                    <p class="card-text">
                        <small class="text-muted">
                            Added: ${formatDate(song.dateAdded)}
                        </small>
                    </p>

                    <div class="mt-auto d-flex justify-content-between">
                        <a href="${song.url}" target="_blank"
                           class="btn btn-sm btn-info">
                            <i class="fas fa-play"></i>
                        </a>
                        <div>
                            <button class="btn btn-sm btn-warning me-2"
                                    onclick="editSong(${song.id})">
                                <i class="fas fa-edit"></i>
                            </button>
                            <button class="btn btn-sm btn-danger"
                                    onclick="deleteSong(${song.id})">
                                <i class="fas fa-trash"></i>
                            </button>
                        </div>
                    </div>
                </div>
            </div>
        `;
        cardView.appendChild(col);
    });
}

// -------- עזר --------
function getYouTubeId(url) {
    try {
        const u = new URL(url);

        if (u.hostname === 'youtu.be') {
            return u.pathname.slice(1);
        }

        const v = u.searchParams.get('v');
        return v || '';
    } catch (e) {
        return '';
    }
}

function formatDate(ms) {
    if (!ms) return '-';
    return new Date(ms).toLocaleString();
}

// -------- פעולות עריכה / מחיקה --------
function editSong(id) {
    const song = songs.find(s => s.id === id);
    if (!song) return;

    hiddenId.value = song.id;
    document.getElementById('title').value = song.title;
    document.getElementById('url').value = song.url;
    document.getElementById('rating').value = song.rating;

    submitBtn.innerHTML = '<i class="fas fa-save"></i> Update';
}

function deleteSong(id) {
    if (confirm('Are you sure?')) {
        songs = songs.filter(song => song.id !== id);
        saveAndRender();
    }
}

// רינדור ראשון – קריאה מה-localStorage
applyFilters();
