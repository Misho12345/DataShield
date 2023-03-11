"use strict";




class NormalEnemy {}

let barText = document.getElementById("text-under-progress-bar");
let barLen = document.getElementById("progress-bar");

function fibonacci(x) {
    let a = 1, b = 0, temp;

    while (x >= 0) {
        temp = a;
        a += b;
        b = temp;
        x--;
    }

    return b;
}


let enemyTypes = [Worm, Kon, Bug, Virus];
let currentWave = 1;

function randomInteger(x) {
    return Math.floor(Math.random() * x);
}

class Wave {
    timeToNextWave = 30;
    timeToNextWaveMax = 30;
    constructor() {
        input.AddAction("Enter", _ => {
            if (!((this.updates < this.TimeInSeconds * 100) || (this.updates > this.TimeInSeconds * 100 && enemies.length > 0)))
                this.timeToNextWave = -1
        }, undefined, undefined);
    }
    makeWave(stage, TimeInSeconds, isItBoss) {
        this.stage = stage;
        this.TimeInSeconds = TimeInSeconds;
        this.isItBoss = isItBoss;
        this.updates = 0;
        this.enemyCount = fibonacci(stage);
        this.enemyCD = Math.floor(TimeInSeconds * 100 / this.enemyCount);
        this.timeToNextWave = 15 + currentWave * 3;
        this.timeToNextWaveMax = 15 + currentWave * 3;

        currentWave++;
    }

    Update() {
        
        this.updates++;

        //console.log(this.updates);
        if (this.timeToNextWave < 0) {
            this.makeWave(currentWave, currentWave , false);
        }
        if (this.updates > this.TimeInSeconds * 100 && enemies.length > 0) {
            barLen.style.width = enemies.length / this.enemyCount * 100 + '%';
            barText.innerText = 'Enemies left: ' + enemies.length;

            //input.RemoveAction("Enter");
        } else {
            barLen.style.width = this.timeToNextWave / this.timeToNextWaveMax * 100 + '%';
            barText.innerText = `Next wave in ${Math.round(this.timeToNextWave)}s`;

            //folders.push(new Folder());
            
        }
        if (this.updates < this.TimeInSeconds * 100) {
            barLen.style.width = (this.updates / (this.TimeInSeconds * 100)) * 100 + '%';
            barText.innerText = 'GET READY!';
            
            //input.RemoveAction("Enter");
        }
        if (this.updates % this.enemyCD === 0 && this.updates < this.TimeInSeconds * 100) {
            //console.log("dsa323232dsa");
            //this.MakeEnemy(0);
            let randEnemy = randomInteger(enemyTypes.length);
            this.MakeEnemy(randEnemy);
        } else if (!(this.updates < this.TimeInSeconds * 100) && enemies.length === 0) {
            //console.log("dsadsa");
            this.timeToNextWave -= deltaTime;

        }

    }

    MakeEnemy(type) {
        new enemyTypes[type];
    }

}

let wave = battery.AddComponent(Wave);