import Game from "./Game.js";
import * as PIXI from "pixi.js";

const _pixiApp = new PIXI.Application();
await _pixiApp.init({
  width: 1024,
  height: 868,
});

const game = new Game(_pixiApp);

_pixiApp.ticker.add(game.update, game);
document.body.appendChild(_pixiApp.canvas);
