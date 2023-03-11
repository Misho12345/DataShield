"use strict";

class Virus extends Enemy {
    hp = 10;

    constructor(waveN) {
        super('NormalEnemyImage', 'NormalEnemy', randomInteger(memory) - memory / 2, randomInteger(2) * memory - memory / 2, 150, 150);
        //this.position = new Vector2(randomInteger(memory) - memory / 2, randomInteger(memory) - memory / 2)
        this.dmg = waveN;
    }

    Update() {
        let vec = Vector2.Subtraction(this.transform.position, player.transform.position).normalized;
        vec.Scale(2);
        this.transform.position.Subtract(vec);

        for (let i = 0; i < enemies.length; i++) {
            if (!enemies[i].transform.position.Equals(this.transform.position.y)) {
                if (areColliding(this.transform, enemies[i].transform)) {
                    vec = Vector2.Subtraction(this.transform.position, enemies[i].transform.position).normalized;
                    vec.Scale(3);
                    this.transform.position.Add(vec);

                    break;
                }
            }
        }

        if (this.transform.position.DistanceFrom(player.transform.position) < 50) {
            console.log("napadnah te");
        }
    }
}