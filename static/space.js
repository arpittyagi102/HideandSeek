function preloadImages(imageUrls) {
    imageUrls.forEach(function (url) {
        var img = new Image();
        img.src = url;
    });
}

function fetchWebpImageUrls() {
    var imageDirectory = 'media/';
    var imageUrls = [];
    var xhr = new XMLHttpRequest();
    xhr.open('GET', imageDirectory, false);
    xhr.send(null);

    if (xhr.status === 200) {
        var fileList = xhr.responseText.split('\n');

        fileList.forEach(function (file) {
            if (file.match(/\.webp$/i)) {
                imageUrls.push(imageDirectory + file);
            }
        });
    }

    return imageUrls;
}

document.addEventListener("DOMContentLoaded", () => {
    var imageUrls = fetchWebpImageUrls();
    preloadImages(imageUrls);
});