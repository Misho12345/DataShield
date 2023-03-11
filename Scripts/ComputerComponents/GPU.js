"use strict";

let GPU = new GameObject(new Vector2(-180, -435), new Vector2(350, 192));

class GPUClass {
    updates = 0;
    zoinsPerWave = 3;
    capacity = 0.01;

    Update() {
        if (batteryUpdate.charge <= 0) {
            GPUAnimator.Pause();
            return;
        }

        if (GPUAnimator.paused) GPUAnimator.Play();
        GPUAnimator.framesDelay = 1 / (10 + batteryUpdate.charge);
        batteryUpdate.charge -= this.capacity;
        /*
        this.updates++;
        this.updates = this.updates % 100;
        if (this.updates  < 33) {
            GPURenderer.imageId = 'GPU1';
        } else if (this.updates > 33 && this.updates < 66) {
            GPURenderer.imageId = 'GPU2';
        } else if (this.updates > 66) {
            GPURenderer.imageId = 'GPU3';
        }
         console.log(this.updates);*/
    }
}

let GPUUpdate = GPU.AddComponent(GPUClass);
//let GPURenderer = GPU.AddComponent(Renderer);
//GPURenderer.imageId = 'GPU';
let GPUAnimator = GPU.AddComponent(Animator);
GPUAnimator.stages = [{delay: 8, length: 3}];
GPUAnimator.image = "GPUImage";
GPUAnimator.Play(0);

