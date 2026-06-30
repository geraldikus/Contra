import Game from "./Game.js";
import * as PIXI from "pixi.js";

const pixiApp = new PIXI.Application();
await pixiApp.init({
  width: 1024,
  height: 868,
});

const game = new Game(pixiApp);

document.body.appendChild(pixiApp.canvas);
document.addEventListener("keydown", (key) => {
  game.keyboardProcessor.onKeyDown(key);
});
document.addEventListener("keyup", (key) => {
  game.keyboardProcessor.onKeyUp(key);
});

pixiApp.ticker.add(game.update, game);
