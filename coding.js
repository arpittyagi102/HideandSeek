

var movecount = 0, level = 4, score = 0;

var phla = window.location.href.charAt(window.location.href.length - 3);
var dusra = window.location.href.charAt(window.location.href.length - 1);
console.log("phla =" + phla);

console.log("phla =" + phla);
var phlanum = parseInt(phla);
var dusranum = parseInt(dusra);
phlanum = phlanum + 2;
if (dusranum == 1) {
    document.getElementById("bg2").style.backgroundImage = "url(\"media/tngbg2.png\")";
}
else if (dusranum == 2) {
    document.getElementById("bg2").style.backgroundImage = "url(\"media/ringsbg.png\")";
}
else if (dusranum == 3) {
    document.getElementById("bg2").style.backgroundImage = "url(\"media/piggybankbg.png\")";
}


document.getElementById("moves").innerHTML = movecount;
//document.getElementById("moves").style.text-size-adjust="100px";
var two = document.getElementById("ekdoteen");
for (let t = 0; t < phlanum; t++) {
    two.innerHTML += "<tr></tr>";
}

//for creating loop in table and fitting image and sound in them
var one = document.getElementsByTagName("tr");
var number = 0;
for (let j = 0; j < one.length; j++) {
    for (let i = 0; i < phlanum; i++) {
        number = number + 1;
        if (dusra == 1) {
            one[j].innerHTML += "<td> <img class=\"images\" id=\"" + number + "\" src=\"media/cheese2.png\" > </td>";
        }
        else if (dusra == 2) {
            one[j].innerHTML += "<td> <img class=\"images\" style=\"border-radius:30px\" id=\"" + number + "\" src=\"media/closed.png\" > </td>";
        }
        else if (dusra == 3) {
            one[j].innerHTML += "<td> <img class=\"images\" id=\"" + number + "\" src=\"media/piggybank.png\" > </td>";
        }
        one[j].addEventListener("mouseover", sound1);
    }
}





//for creating effects on the images
var images = document.getElementsByClassName("images");
for (let l = 0; l < images.length; l++) {
    images[l].style.width = "100px";
    images[l].style.height = "100px";
    images[l].style.opacity = .75;
    images[l].addEventListener("click", clicked);
    images[l].addEventListener("mouseover", opchange);
    images[l].addEventListener("mouseout", opback);
}

//opacity chaning functions

function opchange() { this.style.opacity = 1; }
function opback() { this.style.opacity = .75; }
function opstop(no) {
    document.getElementById(no).removeEventListener("mouseover", opchange);
    document.getElementById(no).removeEventListener("mouseout", opback);
}

//randomized variables to hide gift
var total = phlanum * phlanum;
var x, y, z, b;
x = Math.floor(Math.random() * total) + 1;

secondgift();
function secondgift() {
    y = Math.floor(Math.random() * total) + 1;
    if (y == x) { secondgift() }
}
thirdgift();
function thirdgift() {
    z = Math.floor(Math.random() * total) + 1;
    if (z == x || z == y) { thirdgift() }
}
bombselect();
function bombselect() {
    b = Math.floor(Math.random() * total) + 1;
    if (b == z || b == y || b == x) { bombselect() }
}




//for checking if the clicked image has gift
var found = 0;
function clicked() {
    movecount = movecount + 1;
    document.getElementById("moves").innerHTML = movecount;
    if (this.id == x || this.id == y || this.id == z) {
        giftfound(this.id);
        opstop(this.id);
        found = found + 1;
        score = score + 1000;
    }
    else if (this.id == b) {
        this.src = "media/bomb2.png";
        endofthegame();
        document.getElementById("gamelose").play();
        setTimeout(losing, 2000);
    }
    else {
        giftmissed(this.id);
        score = score - 100;
    }
    if (found == 3) {
        endofthegame();
        document.getElementById("gamewin").play();
        setTimeout(winning, 2000);
    }
}

//for changing the image after clicked
function giftfound(no) {
    if (dusra == 1) {
        document.getElementById(no).src = "media/jerry.png";
    }
    else if (dusra == 2) {
        document.getElementById(no).src = "media/open.png";
    }
    else if (dusra == 3) {
        document.getElementById(no).src = "media/coins.png"
    }

    document.getElementById("giftfound").play();
}
function giftmissed(no) {

    if (dusra == 1) {
        document.getElementById(no).style.visibility = "hidden";
    }
    else if (dusra == 2) {
        document.getElementById(no).src = "media/empty.png";
    }
    else if (dusra == 3) {
        document.getElementById(no).style.visibility = "hidden";
    }

    document.getElementById("giftmissed").play();

}
function sound1() {
    document.getElementById("sound1").play();
}

//to stop clicking after 3 gifts found
function endofthegame() {

    for (let m = 0; m < images.length; m++) {
        images[m].removeEventListener("click", clicked);
    }

}
document.getElementById("restart").addEventListener("click", restart)
document.getElementById("re1").addEventListener("click", restart)

function restart() {
    window.location.reload();
}
document.getElementById("final").style.display = "none";
function winning() {
    document.getElementById("h1").innerHTML += score;
    document.getElementById("final").style.display = "block";
    document.getElementById("bg2").style.filter = "blur(8px)";
    document.getElementById("bg2").style.opacity = "o.7";
    document.getElementById("yeimg").src = "youwon.png";

}
function losing() {
    document.getElementById("h1").innerHTML += score;
    document.getElementById("final").style.display = "block";
    document.getElementById("bg2").style.filter = "blur(8px)";
    document.getElementById("bg2").style.opacity = "o.7";
    document.getElementById("yeimg").src = "youlost.png";
    //document.getElementById("gamelose").play();
}
document.getElementById("re2").addEventListener("click", goback)
function goback() {
    window.location.href = "index.html";
}



