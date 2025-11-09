// כמה SKINS יש לנו
const skins = [
    "SKINS/skin1.css",
    "SKINS/skin2.css"
    // אם יש עוד SKINS, אפשר להוסיף כאן:
    // "SKINS/skin3.css"
];

let currentSkinIndex = 0; // מתחילים מהראשון

function changeSkin() {
    const link = document.getElementById("skinStylesheet");

    // לעבור ל-SKIN הבא
    currentSkinIndex++;

    // אם עברנו את האחרון – חוזרים לראשון
    if (currentSkinIndex >= skins.length) {
        currentSkinIndex = 0;
    }

    // מחליפים את ה-href של קובץ ה-CSS
    link.href = skins[currentSkinIndex];
}
