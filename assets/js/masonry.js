function initializeMasonry(container) {
    var msnry = new Masonry(container, {
        itemSelector: '.note-card',
        columnWidth: '.note-card',
        fitWidth: true
    });
}

function initializeAllMasonry() {
    var containers = document.querySelectorAll('.note-card-container');
    containers.forEach(function(container) {
        initializeMasonry(container);
    });
}

window.addEventListener('DOMContentLoaded', initializeAllMasonry);
window.addEventListener('load', initializeAllMasonry);
window.addEventListener('resize', initializeAllMasonry);
window.addEventListener('hashchange', initializeAllMasonry);
window.addEventListener('click', initializeAllMasonry);
