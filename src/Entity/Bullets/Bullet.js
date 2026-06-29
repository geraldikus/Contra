import { Container, Graphics } from "pixi.js";

export default class Bullet extends Container {
  #SPEED = 10;

  constructor() {
    super();
    const view = new Graphics();
    view
      .setStrokeStyle({ width: 1, color: 0xffff00 })
      .rect(0, 0, 5, 5)
      .stroke();

    this.addChild(view);
  }

  update() {
    this.x += this.#SPEED;
  }
}
