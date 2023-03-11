"use strict";

let gameObjects = [];


class GameObject {
    idx;
    components = [];


    constructor(position = Vector2.zero, scale = Vector2.one, rotation = 0) {
        this.idx = gameObjects.length;
        gameObjects.push(this);

        this.transform = this.AddComponent(Transform);

        this.transform.position = position.copy;
        this.transform.scale = scale.copy;
        this.transform.rotation = rotation;
    }

    UpdateComponents(idx) {
        for (let i = idx; i < this.components.length; i++) {
            this.components[i].idx = i;
        }
    }


    AddComponent(Type) {
        const component = new Type;

        this.components.push(component);

        component.idx = this.components.length - 1;
        component.gameObject = this;
        component.transform = this.transform;

        return component;
    }

    FindComponent(type) {
        const found = this.components.find(component => component instanceof type);
        return typeof found !== "undefined" ? found.idx : undefined;
    }

    RemoveComponent(type) {
        if (type instanceof Transform) {
            return;
        }

        const foundIdx = this.FindComponent(type);

        if (typeof foundIdx !== "undefined") {
            this.components.splice(foundIdx);
            this.UpdateComponents(foundIdx);
        }
    }

    GetComponent(type) {
        return this.components[this.FindComponent(type)];
    }

    GetComponents(type) {
        const components = [];

        for (const component of this.components)
            if (component instanceof type)
                components.push(component);

        return components;
    }

    Destroy() {
        gameObjects.splice(this.idx,1);
        for (let i = this.idx; i < gameObjects.length; i++) {
            gameObjects[i].idx = i;
        }

        if (typeof this.OnDestroyed !== "undefined") this.OnDestroyed();

        delete this;
    }
}
