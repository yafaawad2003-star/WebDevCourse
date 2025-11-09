// רשימה של כל ה-SKINS (קבצי ה-CSS)
const skins = [
    "SKINS/skin1.css",
    "SKINS/skin2.css"
    // אם תרצי, אפשר להוסיף עוד: "SKINS/skin3.css"
];

let currentSkinIndex = 0;

function changeSkin() {
    const link = document.getElementById("skinStylesheet");

    // לעבור ל-SKIN הבא
    currentSkinIndex = (currentSkinIndex + 1) % skins.length;

    // להחליף את קובץ ה-CSS
    link.href = skins[currentSkinIndex];
}

// לחבר את הכפתור לפונקציה אחרי שהעמוד נטען
document.addEventListener("DOMContentLoaded", function () {
    const btn = document.getElementById("changeSkinBtn");
    btn.addEventListener("click", changeSkin);
});

