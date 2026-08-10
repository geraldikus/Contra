import { Container, Graphics, State } from "pixi.js";
import HeroWeaponUnit from "./HeroWeaponUnit.js";
import Entity from "../Entity.js";

const States = {
  Stay: "stay",
  Jump: "jump",
  FlyDown: "flydown",
};

export default class Hero extends Entity {
  #GRAVITY_FORCE = 0.4; // was 0.2
  #SPEED = 5; // was 2.5
  #JUMP_FORCE = 13; // was 9.5
  #velocityX = 0;
  #velocityY = 0;
  #invincibleUntil = 0;

  #movement = {
    x: 0,
    y: 0,
  };

  #directionContext = {
    left: 0,
    right: 0,
  };

  #prevPoint = {
    x: 0,
    y: 0,
  };

  #state = States.Stay;

  #isLay = false;
  #isStayUp = false;
  isFall = false;
  #heroWeaponUnit;
  type = "hero";

  constructor(view) {
    super(view);

    this.#heroWeaponUnit = new HeroWeaponUnit(this._view);

    this.#state = States.Jump;
    this._view.showJump();
    this.gravitable = true;
    this.isActive = true;
  }

  get bulletContext() {
    return this.#heroWeaponUnit.bulletContext;
  }

  get prevPoint() {
    return this.#prevPoint;
  }

  update(delta = 1) {
    this.#prevPoint.x = this.x;
    this.#prevPoint.y = this.y;

    this.#velocityX = this.#movement.x * this.#SPEED;
    this.x += this.#velocityX * delta;

    if (this.#velocityY > 0) {
      if (!(this.#state == States.Jump || this.#state == States.FlyDown)) {
        this._view.showFall();
        this.isFall = true;
      }
      this.#state = States.FlyDown;
    }

    this.#velocityY += this.#GRAVITY_FORCE * delta; // было: += this.#GRAVITY_FORCE
    this.y += this.#velocityY * delta;

    if (this.isInvincible) {
      const blinkSpeed = 100;
      const phase = Math.floor(performance.now() / blinkSpeed) % 2;
      this._view.alpha = phase === 0 ? 0.3 : 1.0;
    } else {
      this._view.alpha = 1.0;
    }
  }

  damage() {
    this.#movement.x = 0;
    this.#GRAVITY_FORCE = 0;
    this.#velocityX = 0;
    this.#velocityY = 0;
    const deadAnimation = this._view.showAndGetDeadAnimation();
    deadAnimation.onComplete = () => {
      this.dead();
      deadAnimation.removeFromParent();
    };
  }

  stay(platformY) {
    if (this.#state == States.Jump || this.#state == States.FlyDown) {
      const fakeButtonsContext = {};
      fakeButtonsContext.arrowLeft = this.#movement.x == -1;
      fakeButtonsContext.arrowRight = this.#movement.x == 1;
      fakeButtonsContext.arrowDown = this.#isLay;
      fakeButtonsContext.arrowUp = this.#isStayUp;
      this.#state = States.Stay;
      this.setView(fakeButtonsContext);
      this.isFall = false;
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

  throwDown() {
    this.#state = States.Jump;
    this._view.showFall();
    this.isFall = true;
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

  setView(buttonContext) {
    this._view.flip(this.#movement.x);
    this.#isLay = buttonContext.arrowDown;
    this.#isStayUp = buttonContext.arrowUp;

    this.#heroWeaponUnit.setBulletAngle(buttonContext, this.isJumpState());

    if (this.isJumpState() || this.#state == States.FlyDown) {
      return;
    }

    if (buttonContext.arrowLeft || buttonContext.arrowRight) {
      if (buttonContext.arrowUp) {
        this._view.showRunUp();
      } else if (buttonContext.arrowDown) {
        this._view.showRunDown();
      } else {
        if (buttonContext.shoot) {
          this._view.showRunShoot();
        } else {
          this._view.showRun();
        }
      }
    } else {
      if (buttonContext.arrowUp) {
        this._view.showStayUp();
      } else if (buttonContext.arrowDown) {
        this._view.showLay();
      } else {
        this._view.showStay();
      }
    }
  }

  reset() {
    this.#GRAVITY_FORCE = 0.4;
    this.#velocityX = 0;
    this.#velocityY = 0;
    this.#movement.x = 0;
    this.#movement.y = 0;
    this.#directionContext.left = 0;
    this.#directionContext.right = 0;
    this.#state = States.Jump;
    this.isFall = false;
    this._view.reset();
    this._view.showJump();
    this.resuraction();
  }

  setInvincible(ms) {
    this.#invincibleUntil = performance.now() + ms;
  }

  get isInvincible() {
    return performance.now() < this.#invincibleUntil;
  }
}
