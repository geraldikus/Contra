import Entity from "../../../Entity";

export default class Tourelle extends Entity {
  #target;
  #bulleteFactory;
  #timeCounter = 0;
  #health = 5;

  type = "enemy";

  constructor(view, target, bulleteFactory) {
    super(view);

    this.#target = target;
    this.#bulleteFactory = bulleteFactory;
  }

  update() {
    if (this.#target.isDead) {
      return;
    }

    let angle = Math.atan2(this.#target.y - this.y, this.#target.x - this.x);
    this._view.gunRotation = angle;

    this.#fire(angle);
  }

  damage() {
    this.#health--;
    if (this.#health < 1) {
      this.dead();
    }
  }

  #fire(angle) {
    this.#timeCounter++;

    if (this.#timeCounter < 150) {
      return;
    }
    const bulletContext = {};
    bulletContext.x = this.x;
    bulletContext.y = this.y;
    bulletContext.angle = (angle / Math.PI) * 180;
    bulletContext.type = "enemyBullet";

    this.#bulleteFactory.createBullet(bulletContext);

    this.#timeCounter = 0;
  }
}
