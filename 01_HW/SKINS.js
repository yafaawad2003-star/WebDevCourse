let currentSkin = 1; // מתחילים עם סקין 1

function changeSkin() {
    const link = document.getElementById("skinStylesheet");

    currentSkin++; // עבור לסקין הבא

    // אם עברנו את הסקין האחרון – חוזרים לראשון
    if (currentSkin > 2) {
        currentSkin = 1;
    }

    // החלפת הקובץ
    link.href = `SKINS/skin${currentSkin}.css`;
}
