// =========================================================
// HOW JOHANN CAN ADD / REMOVE PHOTOS EASILY:
// 1. Create a folder named "images" inside your project folder.
// 2. Put your photo files inside it (e.g. kitchen1.jpg, bar1.jpg).
// 3. Add the filename to the array below (inside quotes with commas).
// =========================================================

const photoList = [
    // Example: "images/kitchen1.jpg",
    // Example: "images/cupboard1.jpg",
];

document.addEventListener("DOMContentLoaded", () => {
    const galleryGrid = document.getElementById("gallery-grid");

    if (photoList.length === 0) {
        galleryGrid.innerHTML = `
            <div class="no-photos-msg">
                <h3>📷 Gallery Coming Soon</h3>
                <p>We are currently updating our portfolio with our newest projects in Randburg. Check back shortly!</p>
            </div>
        `;
    } else {
        galleryGrid.innerHTML = photoList.map(src => `
            <div class="gallery-item">
                <img src="${src}" alt="Jancol Cut & Edge Installation" loading="lazy">
            </div>
        `).join("");
    }
});