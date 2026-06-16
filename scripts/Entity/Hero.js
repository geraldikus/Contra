import { Container, Graphics } from "pixi.js";

export default class Hero extends Container {
  #GRAVITY_FORCE = 0.03;
  #velocityX = 0;
  #velocityY = 0;

  constructor() {
    super();
    const view = new Graphics();

    view
      .setStrokeStyle({ width: 1, color: 0xff0000 })
      .rect(0, 0, 20, 60)
      .stroke();

    this.addChild(view);
  }

  update() {
    this.#velocityY += this.#GRAVITY_FORCE;
    this.y += this.#velocityY;
  }

  stay() {
    this.#velocityY = 0;
  }
}
