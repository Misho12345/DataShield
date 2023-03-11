"use strict";

let popupAds = document.getElementById("popups");

const colors = ["yellow", "red", "green", "blue"];
const titles = ["Increase<br>Speed", "Increase<br>Strength", "Increase<br>Hit Speed", "Increase<br>Bullet Speed", "Antivirus<br>"];
let currTitles = [];

const antiviruses = ['SX-R226', 'DR-X655', 'SX-T445'];

let ad = [{}, {}, {}];

function BuyFree(ad) {
    if (randomInteger(2)) {
        if (ad.title === "Increase<br>Speed") playerStats.increaseSpeed(1);
        else if (ad.title === "Increase<br>Strength") playerStats.increaseStrength(5);
        else if (ad.title === "Increase<br>Hit Speed") playerStats.increaseHitSpeed(5);
        else if (ad.title === "Increase<br>Bullet Speed") playerStats.increaseBulletSpeed(5);
        else turets.push(new Turet(ad.model));
    } else {
        if (ad.title === "Increase<br>Speed") playerStats.increaseSpeed(-1);
        else if (ad.title === "Increase<br>Strength") playerStats.increaseStrength(-5);
        else if (ad.title === "Increase<br>Hit Speed") playerStats.increaseHitSpeed(-5);
        else if (ad.title === "Increase<br>Bullet Speed") playerStats.increaseBulletSpeed(-5);
        else turets.push(new Turet('FAKE'));
    }
}

function BuyAd(ad) {
    if (playerStats.zoins >= ad.price) {
        if (ad.title === "Increase<br>Speed") playerStats.increaseSpeed(1);
        else if (ad.title === "Increase<br>Strength") playerStats.increaseStrength(5);
        else if (ad.title === "Increase<br>Hit Speed") playerStats.increaseHitSpeed(5);
        else if (ad.title === "Increase<br>Bullet Speed") playerStats.increaseBulletSpeed(5);
        else turets.push(new Turet(ad.model));

        playerStats.increaseZoins(-ad.price);
    }
}

function GeneratePopupAds() {
    currTitles = [].concat(titles);

    let arrangement = randomInteger(7);

    for (let i = 0; i < 3; i++) {
        ad[i] = {};
        ad[i].color = colors[randomInteger(4)];

        let titleIdx = randomInteger(currTitles.length);
        ad[i].title = currTitles[titleIdx];
        currTitles.splice(titleIdx, 1);
        ad[i].free = randomInteger(2);

        if (ad[i].title === "Antivirus<br>") {
            ad[i].model = antiviruses[randomInteger(3)];
            ad[i].title += ad[i].model;
            ad[i].price = 100;
        }
        else ad[i].price = 10;

        ad[i].button = ad[i].free ?
            "<div class=\"popup-ad-content popup-ad-button center flex-dir-row\" onclick='BuyFree(ad["+ i + "]); this.parentElement.parentElement.remove()'>\n" +
            "<span>FREE</span>\n" +
            "</div>"
            :
            "<div class=\"popup-ad-content popup-ad-button center flex-dir-row\" onclick='BuyAd(ad["+ i + "]); this.parentElement.parentElement.remove()'>\n" +
            "<span>" + ad[i].price + "</span>\n" +
            "<img src=\"Images/UI/coin.gif\" alt=\"\">\n" +
            "</div>";
    }

    ad[0].flip = arrangement & 0b001 ? "-reverse" : "";
    ad[1].flip = arrangement & 0b010 ? "-reverse" : "";
    ad[2].flip = arrangement & 0b100 ? "-reverse" : "";

    popupAds.style.flexDirection = "column" + ad[0].flip;


    popupAds.innerHTML = "<div class=\"center\" style=\"width: 100%; height: 50%; flex-direction: row" + ad[1].flip + "\">\n" +
        "                    <div class=\"center\" style=\"width: 40%; height: 100%\">\n" +
        "                        <div id='ad1' style=\"height: 90%; aspect-ratio: 1\">\n" +
        "                            <div class=\"full-fill center\" style=\"position: relative\">\n" +
        "                                <img class=\"popup-ad-content popup-ad-X\" onclick='this.parentElement.parentElement.remove()' src=\"Images/UI/Ads/x.png\" alt=\"\">\n" +
        "                                <div class=\"popup-ad-content popup-ad-title\">" + ad[0].title + "</div>\n" +
        "                                " + ad[0].button + "\n" +
        "                                <img class=\"full-fill\" src=\"Images/UI/Ads/" + ad[0].color + "11.png\" alt=\"\">\n" +
        "                            </div>\n" +
        "                        </div>\n" +
        "                    </div>\n" +
        "\n" +
        "                    <div class=\"center\" style=\"width: 60%; height: 100%\">\n" +
        "                        <div id='ad2' style=\"height: 90%; aspect-ratio: 4/3\">\n" +
        "                            <div class=\"full-fill center\" style=\"position: relative\">\n" +
        "                                <img class=\"popup-ad-content popup-ad-X\" onclick='this.parentElement.parentElement.remove()' src=\"Images/UI/Ads/x.png\" alt=\"\">\n" +
        "                                <div class=\"popup-ad-content popup-ad-title\">" + ad[1].title + "</div>\n" +
        "                                " + ad[1].button + "\n" +
        "                                <img class=\"full-fill\" src=\"Images/UI/Ads/" + ad[1].color + "43.png\" alt=\"\">\n" +
        "                            </div>\n" +
        "                        </div>\n" +
        "                    </div>\n" +
        "                </div>\n" +
        "                <div class=\"center flex-dir-row\" style=\"width: 100%; height: 50%; flex-direction: row" + ad[2].flip + "\">\n" +
        "                    <div class=\"center\" style=\"width: 90%; height: 100%\">\n" +
        "                        <div id='ad3' style=\"height: 90%; aspect-ratio: 2\">\n" +
        "                            <div class=\"full-fill center\" style=\"position: relative\">\n" +
        "                                <img class=\"popup-ad-content popup-ad-X\" onclick='this.parentElement.parentElement.remove()' src=\"Images/UI/Ads/x.png\" alt=\"\">\n" +
        "                                <div class=\"popup-ad-content popup-ad-title\">" + ad[2].title + "</div>\n" +
        "                                " + ad[2].button + "\n" +
        "                                <img class=\"full-fill\" src=\"Images/UI/Ads/" + ad[2].color + "21.png\" alt=\"\">\n" +
        "                            </div>\n" +
        "                        </div>\n" +
        "                    </div>\n" +
        "\n" +
        "                    <div class=\"center\" style=\"width: 10%; height: 100%\"></div>\n" +
        "                </div>"
}