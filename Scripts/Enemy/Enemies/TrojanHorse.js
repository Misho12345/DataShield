"use strict";

class Kon extends Enemy {
    constructor(waveN) {
        super('konImage', 5, randomInteger(memory) - memory / 2, randomInteger(2) * memory - memory / 2, 150, 150, 0, 4,5,1);
        //this.position = new Vector2(randomInteger(memory) - memory / 2, randomInteger(memory) - memory / 2)
        this.position = new Vector2(0, 0);
        this.dmg = waveN;
        this.hp = 10;
        this.zahapahCD = 0;
        this.neGledaNalqvo = 0;
        this.target = folders[randomInteger(folders.length)];
    }

    Update() {

        if (angleCalc(this.transform.position.x,
            this.transform.position.y,
            this.target.transform.position.x,
            this.target.transform.position.y) >= Math.PI / 2) {
            this.neGledaNalqvo = 2;
        } else {
            this.neGledaNalqvo = 0;
        }


        if (this.transform.position.DistanceFrom(this.target.transform.position) < 150 && this.zahapahCD < 0) {
            this.animator.stage = 1 + this.neGledaNalqvo;
            this.target.hp--;
            this.zahapahCD = 300;
            //this.hp=-1;
        } else if (this.zahapahCD < 150) {

            this.animator.stage = 0 + this.neGledaNalqvo;
        }
        if (this.transform.position.DistanceFrom(this.target.transform.position) > 80) {
            let vec = Vector2.Subtraction(this.transform.position, this.target.transform.position).normalized;
            vec.Scale(2);
            //console.log(vec);
            
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
        if (this.transform.position.DistanceFrom(this.target.transform.position) > 300) {
            this.animator.stage = 4;
        }
    }
}