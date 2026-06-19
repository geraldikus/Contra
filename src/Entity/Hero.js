import { Container, Graphics, State } from "pixi.js";

const States = {
  Stay: "stay",
  Jump: "jump",
  FlyDown: "flydown",
};

export default class Hero extends Container {
  #GRAVITY_FORCE = 0.2;
  #SPEED = 2.5;
  #JUMP_FORCE = 9;
  #velocityX = 0;
  #velocityY = 0;

  #movement = {
    x: 0,
    y: 0,
  };

  #directionContext = {
    left: 0,
    right: 0,
  };

  #state = States.Stay;

  #bounds = {
    width: 20,
    height: 90,
  };

  constructor() {
    super();
    const view = new Graphics();

    view
      .setStrokeStyle({ width: 1, color: 0xffff00 })
      .rect(0, 0, 20, 90)
      .rect(0, 30, 60, 10)
      .stroke();

    this.addChild(view);
    view.pivot.x = 10;
    view.x = 10;
    view.scale.x *= -1;
  }

  update() {
    this.#velocityX = this.#movement.x * this.#SPEED;
    this.x += this.#velocityX;

    if (this.#velocityY > 0 && this.isJumpState()) {
      this.#state = States.FlyDown;
    }

    this.#velocityY += this.#GRAVITY_FORCE;
    this.y += this.#velocityY;
  }

  stay(platformY) {
    this.#state = States.Stay;
    this.#velocityY = 0;

    this.y = platformY - this.#bounds.height;
  }

  jump() {
    if (this.#state == States.Jump || this.#state == States.FlyDown) {
      return;
    }
    this.#state = States.Jump;
    this.#velocityY -= this.#JUMP_FORCE;
  }

  isJumpState() {
    return this.#state == States.Jump;
  }

  throwDown() {
    this.#state = States.Jump;
  }

  startLeftMove() {
    this.#directionContext.left = -1;

    if (this.#directionContext.right > 0) {
      this.#movement.x = 0;
      return;
    }

    this.#movement.x = -1;
  }

  startRightMove() {
    this.#directionContext.right = 1;

    if (this.#directionContext.left > 0) {
      this.#movement.x = 0;
      return;
    }

    this.#movement.x = 1;
  }

  stopLeftMove() {
    this.#directionContext.left = 0;
    this.#movement.x = this.#directionContext.right;
  }

  stopRightMove() {
    this.#directionContext.right = 0;
    this.#movement.x = this.#directionContext.left;
  }

  #rect = {
    x: 0,
    y: 0,
    width: 0,
    height: 0,
  };

  getRect() {
    this.#rect.x = this.x;
    this.#rect.y = this.y;
    this.#rect.width = this.#bounds.width;
    this.#rect.height = this.#bounds.height;

    return this.#rect;
  }
}
