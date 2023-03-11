"use strict";

class Worm extends Enemy {
    constructor(waveN) {
        let posoka = randomInteger(2) * 2 - 1;
        //super('wormHeadImage', 1, randomInteger(memory) - memory / 2, randomInteger(2) * memory - memory / 2, 200, 200);
        if (posoka>0) {
            super('wormHeadImage', 10, posoka * memory / 2, randomInteger(memory) - memory / 2, 150, 200,Math.PI/2,4,2,1);
            //super('wormHeadImage', 10,0,0, 150, 200, Math.PI / 2);
        } else {
            super('wormHeadImage', 10, posoka * memory / 2, randomInteger(memory) - memory / 2, 150, 200, -Math.PI / 2,4,2,1);
        }
        //this.position = new Vector2(randomInteger(memory) - memory / 2, randomInteger(memory) - memory / 2)
        this.position = new Vector2(0, 0);
        this.posoka = posoka;
        this.dmg = waveN;
        this.hp = 10;
        this.updates = 0;
        this.tales = [];
        this.tales.push(new Tale(this));
        for (let i = 0; i < currentWave + 3; i++) {
            this.tales[this.tales.length - 1].transform.position.x -= 100;
            this.tales.push(new Tale(this.tales[this.tales.length-1]));
        }
        
    }

    Update() {
        this.updates++;
        if (this.updates % 30 === 0) {
            if (areColliding(this.transform, player.transform)) {
                playerStats.increaseHp(-1);
            }
            for (let i = 0; i < folders.length; i++) {
                if (areColliding(this.transform, folders[i].transform)) {
                    folders[i].hp -= 1;
                }
            }
            for (let i = this.tales.length-1; i>=0; i--) {
                this.tales[i].transform.chugun();
            }
            this.transform.position.x += 200 * this.posoka;
            if (this.transform.position.x > memory / 2) {
                this.transform.position.x -= memory;
            }
            if (this.transform.position.x < -memory  /2 ) {
                this.transform.position.x += memory;
            }
            //if (this.tales.length < currentWave + 3) {
            //    this.tales.push(new Tale(this.tales[this.tales.length - 1]));
            //}
        }
        

        

        /*
        if (this.transform.position.DistanceFrom(player.transform.position) < 150 && this.zahapahCD < 0) {
            this.animator.stage = 1;

            this.zahapahCD = 300;
        } else if (this.zahapahCD < 150) {

            this.animator.stage = 0;
        }
        if (this.transform.position.DistanceFrom(player.transform.position) > 80) {
            let vec = Vector2.Subtraction(this.transform.position, player.transform.position).normalized;
            vec.Scale(2);
            this.transform.position.Subtract(vec);

        }
        for (let i = 0; i < enemies.length; i++) {
            if (!enemies[i].transform.position.Equals(this.transform.position.y)) {

                if (areCollidingEnemies(this.transform, enemies[i].transform)) {
                    let vec2 = Vector2.Subtraction(this.transform.position, enemies[i].transform.position).normalized;
                    vec2.Scale(3);
                    this.transform.position.Add(vec2);

                    break;
                }
            }
        }*/
    }
}
class Tale extends GameObject {
    constructor(koeSledvan) {
        super(new Vector2(koeSledvan.transform.position.x, koeSledvan.transform.position.x),
            new Vector2(200,100));
        this.follow = koeSledvan;
        this.x = this.follow.transform.position.x-200;
        this.y = this.follow.transform.position.y;

        this.updates = 0;
        
        this.imageID = 'wormTaleImage';

        this.hp = 1;
        this.enemyIdx = enemies.length;
        //enemies.push(this);

        this.transform.chugun = () => {
            this.transform.position.x = this.follow.transform.position.x;
            this.transform.position.y = this.follow.transform.position.y;
           // if (typeof this.Update !== "undefined") this.Update();

            if (this.hp <= 0) {
                //playerStats.increaseZoins(this.typeEnemy);
                //enemies.splice(this.enemyIdx, 1);
                //for (let i = this.enemyIdx; i < enemies.length; i++) {
                //    enemies[i].enemyIdx = i;
                //}
                
                this.Destroy();
            }

        }

        this.animator = this.AddComponent(Animator);
        this.animator.stages = [{ delay: 0.1, length: 1 }];
        this.animator.image = this.imageID;

        this.animator.Play(0);
    }
}