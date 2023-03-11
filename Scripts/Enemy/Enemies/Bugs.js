"use strict";

class Bug extends Enemy {
    constructor(waveN) {
        let speed = 3;
        super('hlebarkaImage', 1, randomInteger(memory) - memory / 2, randomInteger(2) * memory - memory / 2, 200, 100, 0,8,3,speed);
        //this.position = new Vector2(randomInteger(memory) - memory / 2, randomInteger(memory) - memory / 2)
        this.position = new Vector2(0, 0);
        this.dmg = waveN;
        this.hp = 10;
        this.speed = speed;
        this.zahapahCD = 0;
        this.x = this.transform.position.x;
        this.y = this.transform.position.y;
    }

    Update() {

        this.transform.rotation = angleCalc(this.transform.position.x,
            this.transform.position.y,
            playerInput.transform.position.x,
            playerInput.transform.position.y) + Math.PI;

        if (this.transform.position.DistanceFrom(player.transform.position) > 150) {
            
        }
        if (this.transform.position.DistanceFrom(player.transform.position) < 150 && this.zahapahCD < 0) {
            this.animator.stage = 1;
            this.x = this.transform.position.x;
            this.y = this.transform.position.y;
            this.zahapahCD = 300;
            //this.hp=-1;
        } else if (this.zahapahCD < 150) {
            //this.transform.position.x = this.x;
            //this.transform.position.y = this.y;
            this.animator.stage = 0;
        }
        if (this.animator.stage == 1) {
            let randOffsetbug = 50;
            this.transform.position.x += randomInteger(randOffsetbug) - randOffsetbug/2;
            this.transform.position.y += randomInteger(randOffsetbug) - randOffsetbug / 2;
        }
        if (this.transform.position.DistanceFrom(player.transform.position) > 80) {
            let vec = Vector2.Subtraction(this.transform.position, player.transform.position).normalized;
            vec.Scale(this.speed);
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
        }
        this.zahapahCD--;
    }
}