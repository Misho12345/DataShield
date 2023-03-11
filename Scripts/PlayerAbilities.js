
class MegaScan extends GameObject {

}


input.AddAction("Space", _ => { abilities.push(new currentAbilitySelected())}, undefined, undefined);
class FireWall extends GameObject {
    constructor() {
        super(new Vector2(playerInput.transform.position.x, playerInput.transform.position.y), new Vector2(2000, 2000));
        this.imageID = 'firewallImage';
        this.nevlizal = true;
        this.timeLeft = 1500;
        this.transform.Update = () => {
            if (typeof this.Update !== "undefined") this.Update();
            //console.log(this.timeLeft);
            if (this.timeLeft < 1470 && this.timeLeft > 0 && this.nevlizal) {
                this.animator.Play(1);
                this.nevlizal = false;
                //if (this.timeLeft % 30 == 0) {
                //    this.animator.frame = (this.animator.frame + 1) % 4;
                //}
                //console.log(this.animator.stage);
            } else if (this.timeLeft == 0) {
                this.animator.Play(2);
            } else if (this.timeLeft <= -60){
                this.Destroy();
            }

        }

        this.animator = this.AddComponent(Animator);
        let stages = [{ delay: 0.1, length: 4 }, { delay: 0.3, length: 4 }, { delay: 0.2, length: 4 }];
        this.animator.stages = stages;
        this.animator.image = this.imageID;
        //this.transform.rotation = angleRotat;
        this.animator.Play(0);
    }
    Update() {
        this.timeLeft--;
        for (let i = 0; i < enemies.length; i++) {
            //console.log("dsa")
            if (areColliding(this.transform, enemies[i].transform)) {
                enemies[i].hp = -1;
            }
        }
    }
}
let currentAbilitySelected = FireWall;
let abilities = [];