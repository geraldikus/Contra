import { Container, Graphics } from "pixi.js";

export default class BulletView extends Container {
  #collisionBox = {
    x: 0,
    y: 0,
    width: 0,
    height: 0,
  };

  constructor() {
    super();
    const view = new Graphics();

    this.#collisionBox.width = 5;
    this.#collisionBox.height = 5;
    view
      .setStrokeStyle({ width: 1, color: 0xffff00 })
      .rect(0, 0, 5, 5)
      .stroke();

    this.addChild(view);
  }

  get collisionBox() {
    this.#collisionBox.x = this.x;
    this.#collisionBox.y = this.y;

    return this.#collisionBox;
  }
}
