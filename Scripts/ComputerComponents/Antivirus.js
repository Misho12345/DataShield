"use strict";

function angleCalc(cX, cY, x, y) {
    let angle = Math.atan2(y - cY, x - cX);
    if (y >= cY) return angle;
    else return Math.PI * 2 + angle;
}
class Turet extends GameObject {
    constructor(model) {
        super(new Vector2(input.transform.position.x, input.transform.position.y), new Vector2(200, 200));
        this.imageid = 'antivirusImage';
        this.model = model;
        this.updates = 0;

        this.enemyidx = turets.length;
        // enemies.push(this);

        this.transform.Update = () => {
            if (typeof this.Update !== "undefined") this.Update();

            /*if (this.hp <= 0) {

                turets.splice(this.enemyidx, 1);
                for (let i = this.enemyidx; i < turets.length; i++) {
                    turets[i].enemyidx = i;
                }

                this.destroy();
            }*/
        }
        //this.bullets = [];
        this.animator = this.AddComponent(Animator);
        this.animator.stages = [{ delay: 0.1, length: 1 }, { delay: 0.3, length: 1 }, { delay: 0.3, length: 1 }];
        this.animator.image = this.imageid;

        this.animator.Play(0);
        this.animator.Draw = () => {
            //for (let i = 0; i < this.bullets.length; i++) {
               // console.log("dsadsa")
                //this.bullets[i].draw();
            //}
        }
        this.fakeRandomizer = randomInteger(3);
    }

    Update() {
        
        if (batteryUpdate.charge > batteryUpdate.cap / 10) {
            this.updates++;
            if (this.model == 'SX-R226') {
                //console.log("23232");
                //for (let i = 0; i < this.bullets.length; i++) {
                //    this.bullets[i].update();
                //}
                for (let i = 0; i < enemies.length; i++) {
                    //console.log("asd"); 
                    if (this.transform.position.DistanceFrom(enemies[i].transform.position) < 2400 && this.updates % 200 == 0 && enemies[i].animator.stage!=4) {
                        // console.log("dsadsa");
                        batteryUpdate.charge -= 10;
                        wifiBullets.push(new wifiBullet(
                            this.transform.position.x,
                            this.transform.position.y,
                            enemies[i]));
                        return;
                    }
                }
            }
            if (this.model == 'SX-T445') {
                this.animator.Play(1);
                //console.log("23232");
                //for (let i = 0; i < this.bullets.length; i++) {
                //    this.bullets[i].update();
                //}
                for (let i = 0; i < enemies.length; i++) {
                    //console.log("asd"); 
                    if (this.transform.position.DistanceFrom(enemies[i].transform.position) < 1200 && this.updates % 200 == 0 && enemies[i].animator.stage != 4) {
                        // console.log("dsadsa");
                        batteryUpdate.charge -= 10;
                        wifiBullets.push(new wifiBullet(
                            this.transform.position.x,
                            this.transform.position.y,
                            enemies[i]));
                        //return;
                    }
                }
            }
            if (this.model == 'DR-X655') {
                this.animator.Play(2);
                //console.log("23232");
                //for (let i = 0; i < this.bullets.length; i++) {
                //    this.bullets[i].update();
                //}
                for (let i = 0; i < enemies.length; i++) {
                    //console.log("asd"); 
                    if (this.transform.position.DistanceFrom(enemies[i].transform.position) < 1200 && this.updates % 200 == 0 && enemies[i].animator.stage != 4) {
                        // console.log("dsadsa");
                        batteryUpdate.charge -= 10;
                        wifiBullets.push(new wifiBullet(
                            this.transform.position.x,
                            this.transform.position.y,
                            enemies[i]));
                        //return;
                    }
                }
            }

            if (this.model == 'FAKE') {
                this.animator.Play(this.fakeRandomizer);
                batteryUpdate.charge -= 0.05;
            }
        }
    }
}
let wifiBullets = [];
class wifiBullet extends GameObject {
    constructor(x,y,targetVector2) {
        super(new Vector2(x, y), new Vector2(150, 150));
        this.imageid = 'wifiatackImage';

        this.enemyidx = wifiBullets.length-1;

        this.transform.Update = () => {
            if (typeof this.Update !== "undefined") this.Update();
        }
        this.animator = this.AddComponent(Animator);
        this.animator.stages = [{ delay: 0.1, length: 1 }];
        this.animator.image = this.imageid;
        this.targetVector2 = targetVector2
        this.animator.Play(0);
        this.animator.Draw = () => {
            this.Draw();
        }
    }
    Update() {
        this.transform.rotation = Math.PI / 4 + angleCalc(this.transform.position.x,
            this.transform.position.y,
            this.targetVector2.transform.position.x,
            this.targetVector2.transform.position.y);
        //let vec = Vector2.Subtraction(this.transform.position, this.targetVector2).normalized;
        //vec.Scale(10);
        //this.transform.position.Subtract(vec);
        let angle = angleCalc(this.transform.position.x,
            this.transform.position.y,
            this.targetVector2.transform.position.x,
            this.targetVector2.transform.position.y);
        this.transform.position.x += Math.cos(angle)*8;
        this.transform.position.y += Math.sin(angle) * 8;
        if (areColliding(this.transform, this.targetVector2.transform)) {
            this.targetVector2.hp -= 5;
            wifiBullets.splice(this.enemyIdx, 1);
            for (let i = this.enemyIdx; i < wifiBullets.length; i++) {
                wifiBullets[i].enemyIdx = i;
            }

            this.Destroy();
        }
    }
    Draw() {
        //console.log(this.x, this.y);
        context.fillStyle = "lime";
        context.fillRect(this.x,this.y,300,300);
        context.strokeStyle = "blue";
        context.lineWidth = 30;
        context.beginPath();
        context.arc(this.x, this.y, 30, this.angle - Math.PI / 6, this.angle + Math.PI / 6);
        context.stroke();

        context.beginPath();
        context.arc(this.x, this.y, 45, this.angle - Math.PI / 6, this.angle + Math.PI / 6);
        context.stroke();

        context.beginPath();
        context.arc(this.x, this.y, 60, this.angle - Math.PI / 6, this.angle + Math.PI / 6);
        context.stroke();
    }
}