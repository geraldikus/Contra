import Hero from "./Entity/Hero.js";
import Platform from "./Entity/Platform.js";

export default class Game {
  #pixiApp;
  #hero;

  constructor(pixiApp) {
    this.#pixiApp = pixiApp;

    this.#hero = new Hero();
    this.#hero.x = 200;
    this.#hero.y = 200;
    this.#pixiApp.stage.addChild(this.#hero);

    const platform = new Platform();
    platform.x = 100;
    platform.y = 500;
    this.#pixiApp.stage.addChild(platform);
  }

  update() {
    this.#hero.update();
  }
}
