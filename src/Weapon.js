export default class Weapon {
  #currentGunStrategy;
  #bulletFactory;

  #count = 0;
  #limit = 10;

  #isFire = false;
  #bulletContext;

  constructor(bulletFactory) {
    this.#bulletFactory = bulletFactory;
    this.#currentGunStrategy = this.#defaultGunStrategy;
  }

  update(bulletContext) {
    if (this.#isFire == false) {
      return;
    }
    if (this.#count % this.#limit == 0) {
      this.#currentGunStrategy(bulletContext);
    }
    this.#count++;
  }

  setWeapon(type) {
    switch (type) {
      case 1:
        this.#currentGunStrategy = this.#defaultGunStrategy;
        break;
      case 2:
        this.#currentGunStrategy = this.#spreadGunStrategy;
        break;
    }
  }

  startFire() {
    this.#isFire = true;
  }

  stopFire() {
    this.#isFire = false;
    this.#count = 0;
  }

  #defaultGunStrategy(bulletContext) {
    this.#limit = 30;
    this.#bulletFactory.createBullet(bulletContext);
  }

  #spreadGunStrategy(bulletContext) {
    this.#limit = 100;
    let angleShift = -20;
    for (let i = 0; i < 5; i++) {
      const localBulletContext = {
        x: bulletContext.x,
        y: bulletContext.y,
        angle: bulletContext.angle + angleShift,
        type: bulletContext.type,
      };

      this.#bulletFactory.createSpreadGunBullet(localBulletContext);
      angleShift += 10;
    }
  }
}
