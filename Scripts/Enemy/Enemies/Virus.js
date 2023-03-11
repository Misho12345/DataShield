"use strict";

class Virus extends Enemy {
    constructor(waveN) {
        let speed = 2;
        super('VirusImage', 3, randomInteger(memory) - memory / 2, randomInteger(2) * memory - memory / 2,150,150,0,4,3,speed);
        //this.position = new Vector2(randomInteger(memory) - memory / 2, randomInteger(memory) - memory / 2)
        this.position = new Vector2(0, 0);
        this.speed = speed;
        this.dmg = waveN;
        this.hp = 10;
        this.zahapahCD = 0;
    }

    Update() {
        

        

        if (this.transform.position.DistanceFrom(player.transform.position) < 150 && this.zahapahCD < 0) {
            this.animator.stage = 1;
            
            this.zahapahCD = 300;
            //this.hp=-1;
        } else if (this.zahapahCD<150) {
            
            this.animator.stage = 0;
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