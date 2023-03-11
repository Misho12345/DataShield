"use strict";

let CPU = new GameObject(new Vector2(-185, 305), new Vector2(190));

class CPUClass {
    updates = 0;

    Update() {
        this.updates++;
        if (CPUAnimator.frame === 0) {
            CPUAnimator.Pause();
            setInterval(() => CPUAnimator.Play(), 10000 + randomInteger(20000));
            CPUAnimator.frame = 1;
        }
    }
}
let CPUUpdate = CPU.AddComponent(CPUClass);
let CPUAnimator = CPU.AddComponent(Animator);
CPUAnimator.stages = [{ delay: 0.2, length: 5 }];
CPUAnimator.image = "CPUImage";
CPUAnimator.Play(0);