"use strict";

let player = new GameObject(Vector2.zero, new Vector2(150));
let playerAnimator = player.AddComponent(Animator);

playerAnimator.stages = [
    {delay: 0.15, length: 4},
    {delay: 0.15, length: 4},
    {delay: 0.15, length: 4}
];

playerAnimator.image = "player";
playerAnimator.Play(0);

class PlayerInput {
    #velocity = new Vector2();

    lookingDir = 2;
    #maxOffset = 100;

    weaponIdx = 0;
    weapons = [new Weapon(
        5, new Vector2(120, 38), player.transform, "magnum", [{delay: 0.05, length: 4}, {delay: 0.05, length: 4}],
        new Vector2(20), "magnumBullet", [{delay: 0.03, length: 5}], 10, 5, 800, false, true)];

    Awake() {
        input.AddAction("KeyW", undefined, _ => this.#velocity.y = -1, _ => this.#velocity.y = 0);
        input.AddAction("KeyA", _ => this.lookingDir = 1, _ => this.#velocity.x = -1, _ => this.#velocity.x = 0);
        input.AddAction("KeyS", undefined, _ => this.#velocity.y = 1, _ => this.#velocity.y = 0);
        input.AddAction("KeyD", _ => this.lookingDir = 0, _ => this.#velocity.x = 1, _ => this.#velocity.x = 0);

        input.AddAction("KeyE", _ => {
            if (this.inShopRange) {
                shopOpened = true;
                shopMenu.style.display = "flex";
            }
        });

        input.AddAction("ShiftLeft", _ => this.ChangeWeapon());
    }

    ChangeWeapon() {
        this.weapons[this.weaponIdx].animator.draw = false;

        this.weaponIdx++;

        if (this.weaponIdx >= this.weapons.length) this.weaponIdx = 0;
        else if (this.weaponIdx < 0) this.weaponIdx = this.weapons.length - 1;

        this.weapons[this.weaponIdx].animator.draw = true;
    }

    Update() {
        if (this.#velocity.Equals(Vector2.zero)) {
            playerAnimator.stage = 2;
            return;
        }

        playerAnimator.stage = this.lookingDir;

        if (playerAnimator.paused) playerAnimator.Play();

        let prevPlayerMagnitude = Vector2.Subtraction(this.transform.position, screenOffset).magnitude;

        this.#velocity.Normalize();
        this.#velocity.Scale(playerStats.speed * deltaTime * 100);

        this.transform.position.Add(this.#velocity);
        if (    this.transform.position.x - this.transform.scale.x / 2 < -memory / 2) this.transform.position.x = -memory / 2 + this.transform.scale.x / 2;
        else if (this.transform.position.x + this.transform.scale.x / 2 > memory / 2) this.transform.position.x =  memory / 2 - this.transform.scale.x / 2;

        if (    this.transform.position.y - this.transform.scale.y / 2 < -memory / 2) this.transform.position.y = -memory / 2 + this.transform.scale.y / 2;
        else if (this.transform.position.y + this.transform.scale.y / 2 > memory / 2) this.transform.position.y =  memory / 2 - this.transform.scale.y / 2;

        let currPlayerMagnitude = Vector2.Subtraction(this.transform.position, screenOffset).magnitude;

        if (currPlayerMagnitude >= this.#maxOffset && currPlayerMagnitude > prevPlayerMagnitude)
            screenOffset.Add(this.#velocity);
            if (    screenOffset.x - canvas.width / 2 < -memory / 2) screenOffset.x = -memory / 2 + canvas.width / 2;
            else if (screenOffset.x + canvas.width / 2 > memory / 2) screenOffset.x =  memory / 2 - canvas.width / 2;

            if (    screenOffset.y - canvas.height / 2 < -memory / 2) screenOffset.y = -memory / 2 + canvas.height / 2;
            else if (screenOffset.y + canvas.height / 2 > memory / 2) screenOffset.y =  memory / 2 - canvas.height / 2;

    }

    LateUpdate() {
        this.weapons[this.weaponIdx].Update();

        let dist = player.transform.position.DistanceFrom(new Vector2(760, -400)) / 500;
        this.inShopRange = dist < 1;

        if (this.inShopRange) {
            let opacity = 1.2 - dist;
            if (opacity > 0.8) opacity = 0.8;

            context.fillStyle = `rgba(230, 230, 230, ${opacity})`;
            context.font = "50px Orbitron";

            let text = context.measureText("Press E to open the shop");
            context.fillText("Press E to open the shop", 760 - screenOffset.x - text.width / 2, -600 - screenOffset.y);
        }
        
    }
}

let playerInput = player.AddComponent(PlayerInput);

// let laser = ;
