"use strict";

function StartAnimation(idx, text) {
    let number = +text;
    if (isNaN(number) || number === 0) return;

    let el = document.getElementById("animation" + idx);

    if (el.classList.contains("animation")) {
        el.style.animation = "none";
        setTimeout(() => el.style.animation = "");
    }
    else el.classList.add("animation");

    if (number > 0) {
        el.style.color = "lime";
        el.innerText = "+";
    }
    else {
        el.style.color = "red";
        el.innerText = "";
    }

    el.innerText += text;

    el.addEventListener("animationend", () => {
        el.innerText = "";
        el.classList.remove("animation");
    });
}

class PlayerStats  {
    #hp = 20;
    #zoins = 1000;
    #steel = 1000;
    #strength = 100;
    #speed = 5;
    #hitSpeed = 100;
    #bulletSpeed = 100;

    #hpElement = document.getElementById("health");
    #zoinsElement = document.getElementById("zoins");
    #steelElement = document.getElementById("steel");
    #strengthElement = document.getElementById("strength");
    #speedElement = document.getElementById("speed");
    #hitSpeedElement = document.getElementById("hitSpeed");
    #bulletSpeedElement = document.getElementById("bulletSpeed");

    constructor() {
        this.increaseHp(0);
        this.increaseSteel(0);
        this.increaseZoins(0);
        this.increaseStrength(0);
        this.increaseSpeed(0);
        this.increaseHitSpeed(0);
        this.increaseBulletSpeed(0);
    }

    get hp() { return +this.#hp }
    increaseHp(v) {
        this.#hp += v;
        this.#hpElement.innerText = this.#hp;
        StartAnimation(1, v);
        if (this.#hp <= 0) {
            umre();
        }
    }

    get zoins() { return +this.#zoins }
    increaseZoins(v) {
        this.#zoins += v;
        this.#zoinsElement.innerText = this.#zoins;
        StartAnimation(2, v);
    }

    get steel() { return +this.#steel }
    increaseSteel(v) {
        this.#steel += v;
        this.#steelElement.innerText = this.#steel;
        StartAnimation(3, v);
    }

    get strength() { return +this.#strength }
    increaseStrength(v) {
        this.#strength += v;
        this.#strengthElement.innerText = this.#strength + '%';
        StartAnimation(4, v);
    }

    get speed() { return +this.#speed }
    increaseSpeed(v) {
        this.#speed += v;
        this.#speedElement.innerText = this.#speed;
        StartAnimation(5, v);
    }

    get hitSpeed() { return +this.#hitSpeed }
    increaseHitSpeed(v) {
        this.#hitSpeed += v;
        this.#hitSpeedElement.innerText = this.#hitSpeed + '%';
        StartAnimation(6, v);
    }

    get bulletSpeed() { return +this.#bulletSpeed }
    increaseBulletSpeed(v) {
        this.#bulletSpeed += v;
        this.#bulletSpeedElement.innerText = this.#bulletSpeed + '%';
        StartAnimation(7, v);
    }
}

let playerStats = player.AddComponent(PlayerStats);
