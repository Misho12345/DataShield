"use strict";

let Deg2Rad = (v) => v * 0.01745329251;
let Rad2Deg = (v) => v / 0.01745329251;

class Transform {
    position;
    scale;
    rotation;

    get centerPos() { return Vector2.Sum(this.position, Vector2.Scale(this.scale, -0.5)) }
}
