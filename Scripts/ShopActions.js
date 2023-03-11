"use strict";

function BuyEnergy(price) {
    if (playerStats.zoins >= price && batteryUpdate.charge < batteryUpdate.cap * 0.75) {
        batteryUpdate.charge += batteryUpdate.cap / 4;
        playerStats.increaseZoins(-price);
        batteryUpdate.cooldown = -1;
    }
}

function BuyHp(price) {
    if (playerStats.zoins >= price) {
        playerStats.increaseHp(5);
        playerStats.increaseZoins(-price);
    }
}

let CPUPriceEl = document.getElementById("CPUPrice");
let GPUPriceEl = document.getElementById("GPUPrice");
let BatteryPriceEl = document.getElementById("BatteryPrice");

let CPUPrice = 10;
let GPUPrice = 20;
let BatteryPrice = 30;

function UpgradeCPU() {
    if (playerStats.steel >= CPUPrice) {
        playerStats.increaseStrength(5);
        playerStats.increaseSpeed(1);
        playerStats.increaseHitSpeed(5);
        playerStats.increaseBulletSpeed(5);

        playerStats.increaseSteel(-CPUPrice);
        CPUPrice = Math.floor(CPUPrice * 1.2);
        CPUPriceEl.innerText = CPUPrice;
    }
}

function UpgradeGPU() {
    if (playerStats.steel >= GPUPrice) {

        GPUUpdate.zoinsPerWave += 5;

        playerStats.increaseSteel(-GPUPrice);
        GPUPrice = Math.floor(GPUPrice * 1.2);
        GPUPriceEl.innerText = GPUPrice;
    }
}

function UpgradeBattery() {
    if (playerStats.steel >= BatteryPrice) {
        batteryUpdate.cap += 200;

        playerStats.increaseSteel(-BatteryPrice);
        BatteryPrice = Math.floor(BatteryPrice * 1.2);
        BatteryPriceEl.innerText = BatteryPrice;
    }
}

function BuyLaser() {
    if (playerStats.zoins >= 300) {
        playerStats.increaseZoins(-300);
        playerInput.weapons.push(new Weapon(
            50, new Vector2(122, 44), player.transform, "laser", [{delay: -1, length: 3}, {delay: -1, length: 3}],
            new Vector2(50), "laserProj", [{delay: -1, length: 4}], 10, 1, 700, true, false,
            enemy => {
                console.log(enemy.typeEnemy);
                if (enemy.typeEnemy < 5) {
                    enemy.isItCaged = true;
                }
            }));
    }
}

