import AssetsFactory from "./AssetsFactory.js";
import Game from "./Game.js";
import * as PIXI from "pixi.js";

const pixiApp = new PIXI.Application();
await pixiApp.init({
  width: 1024,
  height: 768,
});

pixiApp.ticker.maxFPS = 60;

await PIXI.Assets.load("./assets/atlas.json");

const assets = new AssetsFactory();

const game = new Game(pixiApp, assets);

document.body.appendChild(pixiApp.canvas);
document.addEventListener("keydown", (key) => {
  game.keyboardProcessor.onKeyDown(key);
});
document.addEventListener("keyup", (key) => {
  game.keyboardProcessor.onKeyUp(key);
});

pixiApp.ticker.add((ticker) => {
  game.update(ticker.deltaTime);
}, game);

// pixiApp.ticker.add(game.update, game);

// pixiApp.ticker.add((ticker) => {
//   if (ticker.lastTime % 60 < 1) {
//     console.log("FPS:", ticker.FPS.toFixed(1), "delta:", ticker.deltaTime);
//   }
//   game.update();
// }, game);
