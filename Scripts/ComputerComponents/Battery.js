"use strict";

let battery = new GameObject(new Vector2(-180, -45), new Vector2(670, 351));
let batteryUI = document.getElementById("ui-battery");

class Battery {
    cap = 1000;
    charge = 1000;
    cooldown = 0;

    Update() {
        if (this.cooldown > 0) {
            this.cooldown -= deltaTime;
            return;
        }

        this.cooldown = 3;

        let percentage = this.charge / this.cap;

        if (percentage > 0.75) batteryAnimator.Play(0);
        else if (percentage < 0.75 && percentage > 0.5) batteryAnimator.Play(1);
        else if (percentage < 0.5 && percentage > 0.25) batteryAnimator.Play(2);
        else if (percentage < 0.25 && percentage > 0) batteryAnimator.Play(3);
        else batteryAnimator.Play(4)

        batteryUI.src = "Images/UI/Battery/battery" + batteryAnimator.stage + ".png";
    }
}
let batteryUpdate = battery.AddComponent(Battery);
let batteryAnimator = battery.AddComponent(Animator);

batteryAnimator.stages = [
    { delay: 0.2, length: 5 },
    { delay: 0.2, length: 5 },
    { delay: 0.2, length: 5 },
    { delay: 0.2, length: 5 },
    { delay: 0.2, length: 1 }
];

batteryAnimator.image = "batteryImage";
batteryUpdate.Update();

