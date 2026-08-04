// import { BaseTexture, Spritesheet, Assets } from "pixi.js";

// export default class AssetsFactory {
//   #spritesheet;

//   constructor() {
//     this.#spritesheet = new Spritesheet(
//       BaseTexture.from("./assets/atlas.png"),
//       Assets.cashe.get("./assets/atlas.json").data,
//     );
//     this.#spritesheet.parse();
//   }
// }

import { Assets } from "pixi.js";
export default class AssetsFactory {
  #spritesheet;
  constructor() {
    this.#spritesheet = Assets.cache.get("./assets/atlas.json");
  }

  getTexture(textureName) {
    return this.#spritesheet.textures[textureName];
  }

  getAnimationTextures(animationName) {
    return this.#spritesheet.animations[animationName];
  }
}
