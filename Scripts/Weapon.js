"use strict";

class Weapon extends GameObject {
    constructor(offset, scale, parent, image, stages, bulletScale, bulletImage, bulletStages, bulletSpeed, dmg, cooldown, constantAnimation, draw, OnEnemyHit) {
        super(Vector2.zero, scale);

        this.offset = offset;
        this.parent = parent;

        this.animator = this.AddComponent(Animator);
        this.animator.stages = stages;
        this.animator.image = image;
        this.animator.draw = draw;

        this.constantAnimation = constantAnimation;
        if (!constantAnimation) {
            this.animator.playOnce = true;
            this.animator.Play(0, false);
        }
        else this.animator.Play(0);

        this.dmg = dmg;
        this.cooldown = cooldown;

        this.inCooldown = false;

        this.bulletScale = bulletScale;
        this.bulletImage = bulletImage;
        this.bulletStages = bulletStages;
        this.bulletSpeed = bulletSpeed;

        this.bullets = [];

        this.OnEnemyHit = OnEnemyHit;
    }

    Update() {
        this.transform.position.Set(this.parent.position);

        this.bullets.forEach(bullet => {
            enemies.forEach(enemy => {
                if (areColliding(bullet.transform, enemy.transform)) {
                    this.DestroyBullet(bullet.bulletIdx);
                    enemy.hp -= this.dmg * playerStats.strength / 100;
                    if (enemy.hp > 0 && typeof this.OnEnemyHit !== "undefined") this.OnEnemyHit(enemy);
                }
            });
        });

        let mouse = GetMousePos();
        let angle = angleCalc(this.transform.position.x, this.transform.position.y, mouse.x, mouse.y);
        this.offsetVec = new Vector2(Math.cos(angle), Math.sin(angle));
        let weaponOffset = this.offsetVec.copy;
        weaponOffset.Scale(this.offset)

        this.offsetVec.Scale(this.transform.scale.x / 2);

        if (angle >= Math.PI * 0.5 && angle <= Math.PI * 1.5) {
            if (this.animator.stage !== 0) {
                this.animator.Play(0, this.constantAnimation);
            }
        }
        else if (this.animator.stage !== 1) {
            this.animator.Play(1, this.constantAnimation);
        }

        this.transform.position.Add(this.offsetVec.x / 4 + weaponOffset.x, this.offsetVec.y / 4 + 20 + weaponOffset.y);

        this.transform.rotation = angle;

        if (mouseClicked) this.Shoot();
    }

    DestroyBullet(idx) {
        this.bullets[idx].Destroy();
        this.bullets.splice(idx, 1);
        for (let i = idx; i < this.bullets.length; i++) {
            this.bullets[i].bulletIdx = idx;
        }
    }

    Shoot() {
        if (this.inCooldown) return;
        this.inCooldown = true;
        setTimeout(() => this.inCooldown = false, this.cooldown / playerStats.hitSpeed * 100);

        let bullet = new GameObject(this.transform.position, this.bulletScale);
        bullet.transform.position.Add(this.offsetVec);
        bullet.bulletIdx = this.bullets.length;
        this.bullets.push(bullet);

        let animator = bullet.AddComponent(Animator);
        animator.stages = this.bulletStages;
        animator.image = this.bulletImage;
        animator.Play(0);

        if (!this.constantAnimation)
            this.animator.Play();

        bullet.direction = Vector2.Subtraction(GetMousePos(), this.transform.position).normalized;
        bullet.direction.Scale(this.bulletSpeed * playerStats.bulletSpeed / 100);

        bullet.transform.Update = () => {
            bullet.transform.position.Add(bullet.direction);
        }

        setTimeout(() => {if (bullet) this.DestroyBullet(bullet.bulletIdx)}, 10000);
    }
}
