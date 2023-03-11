"use strict";

let deltaTime;
let time;

let paused = false;
let pauseMenu = document.getElementById("pause-menu");

let shopOpened = false;
let shopMenu = document.getElementById("shop");

function PausePlay() {
    if (shopOpened) {
        shopOpened = false;
        shopMenu.style.display = "none";
        time = new Date();
        update();

        return;
    }

    paused = !paused;
    time = new Date();
    if (!paused) {
        pauseMenu.style.display = "none";
        update();
    } else pauseMenu.style.display = "flex";
}

canvas.width = 1920;
canvas.height = 1080;


function init() {
    time = new Date();

    let shopItems = document.getElementsByClassName("shop-item");

    for (let i = 0 ; i < shopItems.length; i++) {
        shopItems[i].addEventListener("click", () => {
            shopItems[i].classList.add('animate-green-filter');
        });
        shopItems[i].addEventListener("animationend", () => {
            shopItems[i].classList.remove('animate-green-filter');
        });
    }

    for (const gObj of gameObjects)
        for (const component of gObj.components)
            if (typeof component.Awake !== "undefined")
                component.Awake();

    for (const gObj of gameObjects)
        for (const component of gObj.components)
            if (typeof component.Start !== "undefined")
                component.Start();

    update();
}

function areCollidingEnemies(a, b) {
    return (b.position.x <= a.position.x + a.scale.x/2 &&
        a.position.x <= b.position.x + b.scale.x/2 &&
        b.position.y <= a.position.y + a.scale.y/2 &&
        a.position.y <= b.position.y + b.scale.y/2)
}
function areColliding(a, b) {
    return (b.position.x - b.scale.x / 2 <= a.position.x - a.scale.x /2  + a.scale.x &&
            a.position.x - a.scale.x / 2 <= b.position.x - b.scale.x / 2 + b.scale.x &&
            b.position.y - b.scale.y / 2 <= a.position.y - a.scale.y / 2 + a.scale.y &&
            a.position.y - a.scale.y / 2 <= b.position.y - b.scale.y / 2 + b.scale.y)
}

function endOfWave() {
    folders.push(new Folder());
    playerStats.increaseSteel(GPUUpdate.zoinsPerWave);
    GeneratePopupAds();
}
//let video = document.getElementById("endScreen");
function umre() {
    console.log("dsa");

        //canvas.style.display = "none";
        //video.play();
        //video.style.zoom = 0.2;

};
let enemies = [];
let enemyCount = enemies.length;

function update() {
    for (let i = 0; i < folders.length; i++) {
        if (folders[i].hp <= 0) {
            folders[i].animator.stage = 1;
        }
    }
    if (enemyCount >= 1 && enemies.length <= 0) {
        endOfWave();
    }
    enemyCount = enemies.length;

    deltaTime = (new Date() - time) / 1000;
    time = new Date();

    if (paused || shopOpened) return;

    context.globalAlpha = 1;

    context.clearRect(0, 0, canvas.width, canvas.height);
    context.translate(canvas.width / 2, canvas.height / 2);

    //context.scale(0.1, 0.1);

    for (const gObj of gameObjects)
        for (const component of gObj.components)
            if (typeof component.EarlyUpdate !== "undefined")
                component.EarlyUpdate()

    for (const gObj of gameObjects)
        for (const component of gObj.components)
            if (typeof component.Update !== "undefined")
                component.Update();

    for (const gObj of gameObjects)
        for (const component of gObj.components)
            if (typeof component.LateUpdate !== "undefined")
                component.LateUpdate();
    //context.scale(10, 10);
    context.translate(-canvas.width / 2, -canvas.height / 2);

    setTimeout(update, 10);
}

let memory = 5120;
let turets = [];
let motherboard = new GameObject(Vector2.zero, new Vector2(memory));
let motherboardARenderer = motherboard.AddComponent(Renderer);
motherboardARenderer.imageId = "motherboard";
