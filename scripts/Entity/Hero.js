import { Container, Graphics } from "pixi.js";

export default class Hero extends Container {
  #GRAVITY_FORCE = 1;

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
    this.y += this.#GRAVITY_FORCE;
  }
}
