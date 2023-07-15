var arrofi1 = ["/media/easy.webp", "/media/normal.webp", "/media/hard.webp"];
var arrofi2 = ["/media/cheese.webp", "/media/rings.webp", "/media/bank.webp"];
var arrayfordiff;
var phla = 1, dusra = 1;
var imageUrls = [
    '/media/earthfromspace.webp'
];

document.addEventListener("DOMContentLoaded", () => {
    // Preload the images
    preloadImages(imageUrls);

    document.getElementById("l1").addEventListener("click", l1);
    document.getElementById("l2").addEventListener("click", l2);
    document.getElementById("r1").addEventListener("click", r1);
    document.getElementById("r2").addEventListener("click", r2);

    document.getElementById("play").addEventListener("click", loadit);
});


function loadit() {
    document.getElementById("diff").style.display = "none";
    document.getElementById("theme").style.display = "none";
    var menubtnimagesarr = document.getElementsByClassName("menubtnimages");
    for (let a = 0; a < menubtnimagesarr.length; a++) {
        menubtnimagesarr[a].style.display = "none";
    }
    $("#play").animate({
        top: "0px",
        left: "0px",
        height: "100%",
        width: "100%",
        borderRadius: "0px",
        margin: "0px",
    }, 1000);
    setTimeout(function () {
        window.location.href = "space.html?" + phla + "_" + dusra;
    }, 1000);
    console.log("phla =" + phla);
    console.log("dusra =" + dusra);
    document.getElementById("l1").addEventListener("click");
}

function l1() {
    if (phla == 1) {
        phla = 3;
        document.getElementById("i1").src = arrofi1[phla - 1];
        console.log("1");
    }
    else if (phla == 2 || phla == 3) {
        phla--;
        document.getElementById("i1").src = arrofi1[phla - 1];
    }
}
function l2() {
    if (dusra == 1) {
        dusra = 3;
        document.getElementById("i2").src = arrofi2[dusra - 1];
    }
    else if (dusra == 2 || dusra == 3) {
        dusra--;
        document.getElementById("i2").src = arrofi2[dusra - 1];
    }
    cpbb();
}
function r1() {
    if (phla == 3) {
        phla = 1;
        document.getElementById("i1").src = arrofi1[phla - 1];
    }
    else if (phla == 1 || phla == 2) {
        phla++;
        document.getElementById("i1").src = arrofi1[phla - 1];
    }

}
function r2() {
    if (dusra == 3) {
        dusra = 1;
        document.getElementById("i2").src = arrofi2[dusra - 1];
    }
    else if (dusra == 1 || dusra == 2) {
        dusra++;
        document.getElementById("i2").src = arrofi2[dusra - 1];
    }
    cpbb();
}
function cpbb() {
    if (dusra == 1) {
        document.getElementById("play").style.backgroundImage = "url(\"media/tngbg2.webp\")";
    }
    else if (dusra == 2) {
        document.getElementById("play").style.backgroundImage = "url(\"media/ringsbg.webp\")";
    }
    else if (dusra == 3) {
        document.getElementById("play").style.backgroundImage = "url(\"media/piggybankbg.webp\")";
    }
}

function preloadImages(imageUrls) {
    imageUrls.forEach(function (url) {
        var img = new Image();
        img.src = url;
    });
}

