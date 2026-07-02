import { Container, Graphics, State } from "pixi.js";
import RunnerView from "./RunnerView.js";
import Entity from "../../Entity.js";

const States = {
  Stay: "stay",
  Jump: "jump",
  FlyDown: "flydown",
};

export default class Runner extends Entity {
  #GRAVITY_FORCE = 0.2; // was 0.2
  #SPEED = 2.5;
  #JUMP_FORCE = 9.5; // was 9
  #velocityX = 0;
  #velocityY = 0;

  #movement = {
    x: 0,
    y: 0,
  };

  #prevPoint = {
    x: 0,
    y: 0,
  };

  #state = States.Stay;
  type = "characterEnemy";

  constructor(view) {
    super(view);

    this.#state = States.Jump;
    this._view.showJump();

    this.#movement.x = -1;
  }

  get collisionBox() {
    return this._view.collisionBox;
  }

  get x() {
    return this._view.x;
  }

  set x(value) {
    this._view.x = value;
  }

  get y() {
    return this._view.y;
  }

  set y(value) {
    this._view.y = value;
  }

  get prevPoint() {
    return this.#prevPoint;
  }

  update() {
    this.#prevPoint.x = this.x;
    this.#prevPoint.y = this.y;

    this.#velocityX = this.#movement.x * this.#SPEED;
    this.x += this.#velocityX;

    if (this.#velocityY > 0) {
      if (!(this.#state == States.Jump || this.#state == States.FlyDown)) {
        if (Math.random() > 0.4) {
          this._view.showFall();
        } else {
          this.jump();
        }
      }
      if (this.#velocityY > 0) {
        this.#state = States.FlyDown;
      }
    }

    this.#velocityY += this.#GRAVITY_FORCE;
    this.y += this.#velocityY;
  }

  stay(platformY) {
    if (this.#state == States.Jump || this.#state == States.FlyDown) {
      const fakeButtonsContext = {};
      fakeButtonsContext.arrowLeft = this.#movement.x == -1;
      fakeButtonsContext.arrowRight = this.#movement.x == 1;
      this.#state = States.Stay;
      this.setView(fakeButtonsContext);
    }
    this.#state = States.Stay;
    this.#velocityY = 0;

    this.y = platformY - this._view.collisionBox.height;
  }

  jump() {
    if (this.#state == States.Jump || this.#state == States.FlyDown) {
      return;
    }
    this.#state = States.Jump;
    this.#velocityY -= this.#JUMP_FORCE;
    this._view.showJump();
  }

  isJumpState() {
    return this.#state == States.Jump;
  }

  setView(buttonContext) {
    this._view.flip(this.#movement.x);

    if (this.isJumpState() || this.#state == States.FlyDown) {
      return;
    }

    if (buttonContext.arrowLeft || buttonContext.arrowRight) {
      this._view.showRun();
    }
  }

  removeFromParent() {
    if (this._view.parent != null) {
      this._view.removeFromParent();
    }
  }
}
