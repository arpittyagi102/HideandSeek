var moveCount = 0, level = 4, score = 0;
var gift1_IDX, gift2_IDX, gift3_IDX, bomb_IDX;
var found = 0;
var level = window.location.href.charAt(window.location.href.length - 3);
var theme = window.location.href.charAt(window.location.href.length - 1);
var levelInt = parseInt(level) + 2;
var themeInt = parseInt(theme);
var total = levelInt * levelInt;
var clickSlots = document.getElementsByClassName("images");


function findOpenSpot() {
    let taken = [bomb_IDX, gift1_IDX, gift2_IDX, gift3_IDX];
    let spot = Math.floor(Math.random() * total) + 1;
    if (taken.indexOf(spot) != -1) {
        return findOpenSpot();
    }
    return spot;
}


function clicked() {
    moveCount++;
    document.getElementById("moves").textContent = `Moves: ${moveCount}`;
    this.classList.add("post-click");

    let giftSpots = [gift1_IDX, gift2_IDX, gift3_IDX];
    if (giftSpots.indexOf(parseInt(this.id)) != -1) {
        found++;
        giftFound(this.id);
        score += 1000;

        if (found == 3) {
            endGame(true);
        }
    }

    else if (this.id == bomb_IDX) {
        this.src = "media/bomb2.png";
        endGame(false);
    }
    else {
        giftmissed(this.id);
        score -= 100;
    }
}

//for changing the image after clicked
function giftFound(no) {
    if (theme == 1) {
        document.getElementById(no).src = "media/jerry.png";
    }
    else if (theme == 2) {
        document.getElementById(no).src = "media/open.png";
    }
    else if (theme == 3) {
        document.getElementById(no).src = "media/coins.png";
    }

    document.getElementById("giftfound").play();
}

function giftmissed(no) {

    if (theme == 1) {
        document.getElementById(no).style.visibility = "hidden";
    }
    else if (theme == 2) {
        document.getElementById(no).src = "media/empty.png";
    }
    else if (theme == 3) {
        document.getElementById(no).style.visibility = "hidden";
    }

    document.getElementById("giftmissed").play();

}

function sound() {
    document.getElementById("sound1").play();
}

function endGame(win) {
    if (!win) {
        document.getElementById("win-loose-text").textContent = "You Win!";
        document.getElementById("gamelose").play();
    } else {
        document.getElementById("gamewin").play();
    }

    for (let m = 0; m < clickSlots.length; m++) {
        clickSlots[m].removeEventListener("click", clicked);
        clickSlots[m].removeEventListener("mouseover", sound);
    }

    document.getElementById("score").textContent = "Score: " + score;
    setTimeout(() => {
        document.getElementById("final").style.display = "flex";
    }, 2 * 1000);
}

function restart() {
    window.location.reload();
}

document.addEventListener("DOMContentLoaded", () => {
    if (themeInt == 1) {
        document.getElementById("bg2").style.backgroundImage = "url(\"media/tngbg2.png\")";
    }
    else if (themeInt == 2) {
        document.getElementById("bg2").style.backgroundImage = "url(\"media/ringsbg.png\")";
    }
    else if (themeInt == 3) {
        document.getElementById("bg2").style.backgroundImage = "url(\"media/piggybankbg.png\")";
    }

    var two = document.getElementById("table");
    for (let t = 0; t < levelInt; t++) {
        two.innerHTML += "<tr></tr>";
    }

    //for creating loop in table and fitting image and sound in them
    var one = document.getElementsByTagName("tr");
    var number = 0;
    for (let j = 0; j < one.length; j++) {
        for (let i = 0; i < levelInt; i++) {
            number++;
            let imageUrl;
            if (theme == 1) {
                imageUrl = "media/cheese2.png";
            }
            else if (theme == 2) {
                imageUrl = "media/closed.png";
            }
            else if (theme == 3) {
                imageUrl = "media/piggybank.png";
            }

            let td = document.createElement("td");
            one[j].append(td);

            let img = document.createElement("img");
            td.append(img);

            img.classList.add("images");
            img.id = number;
            img.src = imageUrl;

        }
    }

    //for creating effects on the images
    for (let l = 0; l < clickSlots.length; l++) {
        clickSlots[l].addEventListener("click", clicked);
        clickSlots[l].addEventListener("mouseover", sound);
    }

    //randomized variables to hide gift
    gift1_IDX = findOpenSpot();
    gift2_IDX = findOpenSpot();
    gift3_IDX = findOpenSpot();
    bomb_IDX = findOpenSpot();

    document.getElementById("final").style.display = "none";
});