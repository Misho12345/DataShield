"use strict";

class Enemy extends GameObject {
    constructor(imageID, typeEnemy,x,y,sizeX,sizeY,angleRotat,frms,rows,speed) {
        super(new Vector2(x, y), new Vector2(sizeX, sizeY));
        this.imageID = imageID;
        this.typeEnemy = typeEnemy;
        this.isItCaged = false;
        this.enemyIdx = enemies.length;
        this.cageAnimator
        enemies.push(this);
        this.speed;
        this.vremeDaMre = 60;
        this.transform.Update = () => {
            if (typeof this.Update !== "undefined") this.Update();
            if (this.isItCaged) {

                this.cageAnimator = this.AddComponent(Animator);
                let stages = [{ delay: 0.1, length: 1 }];
                this.cageAnimator.stages = stages;
                this.cageAnimator.image = 'cageImage';
                this.cageAnimator.Play(0);
                this.cageAnimator.transform.scale.x = 300;
                this.speed = 0;
                this.hp-=0.03;
            }
            if (this.hp <= 0) {
                if (this.imageID === 'wormHeadImage') {
                    for (let i = 0; i < this.tales.length; i++) {
                        this.tales[i].hp = -2;
                        this.tales[i].transform.chugun();
                    }
                    
                }

                this.vremeDaMre--;
                if (this.vremeDaMre === 59) {
                    if (this.imageID !== 'wormHeadImage') {
                        this.animator.Play(2);
                    } else {
                        playerStats.increaseZoins(this.typeEnemy);
                        enemies.splice(this.enemyIdx,1);
                        for (let i = this.enemyIdx; i < enemies.length; i++) {
                            enemies[i].enemyIdx = i;
                        }

                        this.Destroy();
                    }
                }
                if (this.vremeDaMre < 0) {
                    //console.log();
                    playerStats.increaseZoins(this.typeEnemy);
                    enemies.splice(this.enemyIdx, 1);
                    for (let i = this.enemyIdx; i < enemies.length; i++) {
                        enemies[i].enemyIdx = i;
                    }
                    this.Destroy();
                }
            }
        }

        this.animator = this.AddComponent(Animator);
        let stages = [{ delay: 0.1, length: frms }, { delay: 0.3, length: frms }];
        //this.animator.stages = [{ delay: 0.1, length: frms }, { delay: 0.3, length: frms }];
        //console.log(this.animator.stages) /// undefined
        for (let i = 2; i < rows; i++) {
            stages.push({ delay: 0.3, length: frms });
        }
        this.animator.stages = stages;
        this.animator.image = this.imageID;
        this.transform.rotation=angleRotat;
        this.animator.Play(0);

    }

}