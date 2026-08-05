import { Graphics } from "pixi.js";
import Bullet from "./Bullet.js";
import BulletView from "./BulletView.js";

export default class BulletFactory {
  #worldContainer;
  #entities;

  constructor(worldContainer, entities) {
    this.#worldContainer = worldContainer;
    this.#entities = entities;
  }

  createBullet(bulletContext) {
    const skin = new Graphics();

    skin.rect(0, 0, 5, 5).fill({ color: 0xffffff });

    const view = new BulletView();
    this.#worldContainer.addChild(view);

    const bullet = new Bullet(view, bulletContext.angle);
    view.addChild(skin);
    bullet.x = bulletContext.x;
    bullet.y = bulletContext.y;
    bullet.type = bulletContext.type;

    this.#entities.push(bullet);
  }

  createSpreadGunBullet(bulletContext) {
    const skin = new Graphics();

    skin.circle(0, 0, 6).fill({ color: 0xff2222 });
    skin.circle(-3, -3, 3).fill({ color: 0xdddddd });

    const view = new BulletView();
    this.#worldContainer.addChild(view);

    const bullet = new Bullet(view, bulletContext.angle);
    view.addChild(skin);
    bullet.x = bulletContext.x;
    bullet.y = bulletContext.y;
    bullet.type = bulletContext.type;

    this.#entities.push(bullet);
  }
}
