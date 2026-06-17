import Game from "./Game.js";
import * as PIXI from "pixi.js";

const pixiApp = new PIXI.Application();
await pixiApp.init({
  width: 1024,
  height: 868,
});

const game = new Game(pixiApp);

document.body.appendChild(pixiApp.canvas);
document.addEventListener("keydown", function (key) {
  game.onKeyDown(key);
});
document.addEventListener("keyup", function (key) {
  game.onKeyUp(key);
});

pixiApp.ticker.add(game.update, game);
