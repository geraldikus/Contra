import Hero from "./Entity/Hero.js";
import Platform from "./Entity/Platforms/Platform.js";
import PlatformFactory from "./Entity/Platforms/PlatformFactory.js";

export default class Game {
  #pixiApp;
  #hero;
  #platforms = [];

  constructor(pixiApp) {
    this.#pixiApp = pixiApp;

    this.#hero = new Hero();
    this.#hero.x = 100;
    this.#hero.y = 50;
    this.#pixiApp.stage.addChild(this.#hero);

    const platformFactory = new PlatformFactory(this.#pixiApp);

    // const platfom1 = new Platform();
    // platfom1.x = 50;
    // platfom1.y = 400;
    // this.#pixiApp.stage.addChild(platfom1);

    // const platfom2 = new Platform();
    // platfom2.x = 200;
    // platfom2.y = 450;
    // this.#pixiApp.stage.addChild(platfom2);

    // const platfom3 = new Platform();
    // platfom3.x = 400;
    // platfom3.y = 400;
    // this.#pixiApp.stage.addChild(platfom3);

    this.#platforms.push(platformFactory.createPlatform(50, 400));
    this.#platforms.push(platformFactory.createPlatform(200, 450));
    this.#platforms.push(platformFactory.createPlatform(400, 400));
  }

  update() {
    const prevPoint = {
      x: this.#hero.x,
      y: this.#hero.y,
    };

    this.#hero.update();

    for (let i = 0; i < this.#platforms.length; i++) {
      if (!this.isCheckAABB(this.#hero, this.#platforms[i])) {
        continue;
      }

      const currY = this.#hero.y;
      this.#hero.y = prevPoint.y;

      if (!this.isCheckAABB(this.#hero, this.#platforms[i])) {
        this.#hero.stay();
        continue;
      }

      this.#hero.y = currY;
      this.#hero.x = prevPoint.x;
    }
  }

  isCheckAABB(entity, area) {
    if (
      entity.x < area.x + area.width &&
      entity.x + entity.width > area.x &&
      entity.y < area.y + area.height &&
      entity.y + entity.height > area.y
    ) {
      // console.log("Collision");
      return true;
    }
  }

  onKeyDown(key) {
    const LEFT = 37;
    const RIGHT = 39;
    const UP = 38;
    const DOWN = 40;
    const A = 65;
    const S = 83;

    if (key.keyCode == LEFT) {
      this.#hero.startLeftMove();
    }

    if (key.keyCode == RIGHT) {
      this.#hero.startRightMove();
    }

    if (key.keyCode == S) {
      this.#hero.jump();
    }
  }

  onKeyUp(key) {
    const LEFT = 37;
    const RIGHT = 39;
    const UP = 38;
    const DOWN = 40;
    const A = 65;
    const S = 83;

    if (key.keyCode == LEFT) {
      this.#hero.stopLeftMove();
    }

    if (key.keyCode == RIGHT) {
      this.#hero.stopRightMove();
    }
  }
}
