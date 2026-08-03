// =========================================================
// GOOGLE DRIVE GALLERY CONFIGURATION
// Web App Script URL generated from Google Apps Script
// =========================================================
const DRIVE_SCRIPT_URL = 'https://script.google.com/macros/s/AKfycbyDStIhhmSLHBv5tdS5CuQS9yu2hCckJCVjO5jdgjFWTxsHBurl4CgH0LW25GVZ1qYJXg/exec';

// Local photos backup (if ever needed without Google Drive)
const localPhotoList = [
    // "images/kitchen1.jpg",
];

document.addEventListener("DOMContentLoaded", () => {
    loadGallery();
});

async function loadGallery() {
    const galleryGrid = document.getElementById("gallery-grid");
    const galleryLoading = document.getElementById("gallery-loading");

    try {
        // Fetch real-time photos from Johann's Google Drive folder
        const response = await fetch(DRIVE_SCRIPT_URL);
        const images = await response.json();

        // Hide loading text and un-hide the gallery container
        if (galleryLoading) galleryLoading.classList.add("hidden");
        if (galleryGrid) galleryGrid.classList.remove("hidden");

        // Case 1: Folder is completely empty
        if (!images || images.length === 0) {
            renderEmptyState(galleryGrid);
            return;
        }

        // Case 2: Render photos dynamically from Google Drive
        galleryGrid.innerHTML = images.map(img => `
            <div class="gallery-item">
                <img src="${img.url}" alt="${img.name || 'Jancol Cut & Edge Installation'}" loading="lazy">
            </div>
        `).join("");

    } catch (error) {
        console.error("Error fetching Google Drive gallery:", error);

        // Fallback: If Drive fetch fails, check for any local images or show empty state
        if (galleryLoading) galleryLoading.classList.add("hidden");
        if (galleryGrid) galleryGrid.classList.remove("hidden");

        if (localPhotoList.length > 0) {
            galleryGrid.innerHTML = localPhotoList.map(src => `
                <div class="gallery-item">
                    <img src="${src}" alt="Jancol Cut & Edge Installation" loading="lazy">
                </div>
            `).join("");
        } else {
            renderEmptyState(galleryGrid);
        }
    }
}

// Render empty state message when no photos are available
function renderEmptyState(container) {
    container.innerHTML = `
        <div class="no-photos-msg">
            <h3>📷 Gallery Coming Soon</h3>
            <p>We are currently updating our portfolio with our newest projects in Randburg. Check back shortly!</p>
        </div>
    `;
}