"use strict";

let folders = [];
folders.push(CPU);
class Folder extends GameObject {
    constructor() {
        let kvdX = randomInteger(3);
        let kvdY = randomInteger(3);
        if (kvdX == 1 && kvdY == 1) {
            kvdX += randomInteger(2) * 2 - 1;
        }
        let x = kvdX * memory / 3 + memory / 6 + randomInteger(memory / 4) - memory / 8 - memory / 2;
        let y = kvdY * memory / 3 + memory / 6 + randomInteger(memory / 4) - memory / 8 - memory/2;
        super(new Vector2(x,y),
            new Vector2(200 + randomInteger(50), 200 + randomInteger(50)));
        this.imageID = 'folderImage';
        this.hp = currentWave+10;
        this.hpMax = currentWave + 10;
        
        //folders.push(this);

        /*this.transform.Update = () => {
            if (typeof this.Update !== "undefined") this.Update();

            if (this.hp <= 0) {

                folders.splice(this.enemyIdx, 1);
                for (let i = this.enemyIdx; i < folders.length; i++) {
                    folders[i].enemyIdx = i;
                }

                this.Destroy();
            }
        }*/

        this.animator = this.AddComponent(Animator);
        this.animator.stages = [{ delay: 1, length: 1 }, { delay: 1, length: 1 }];
        this.animator.image = this.imageID;

        this.animator.Play(0);

        this.animator.Draw = () => {
            if (this.hp>0) {
                context.fillStyle = 'lime';
                context.lineWidth = 6;
                context.fillRect(this.transform.position.x - screenOffset.x - this.transform.scale.x / 2, this.transform.position.y - screenOffset.y - this.transform.scale.y / 2 - 15,
                    this.transform.scale.x * (this.hp / this.hpMax), 30);
                context.strokeRect(this.transform.position.x - screenOffset.x - this.transform.scale.x / 2, this.transform.position.y - screenOffset.y - this.transform.scale.y / 2 - 15,
                    this.transform.scale.x, 30);
            }
        }
        //console.log(this.animator.Draw);
    }
    LateUpdate() {
        
    }
}