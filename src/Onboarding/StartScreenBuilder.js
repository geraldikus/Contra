import { Container, Graphics, Text, TextStyle } from "pixi.js";
import createDesktopOnboarding from "./DesktopOnboarding.js";
import createMobileOnboarding from "./MobileOnboarding.js";

export default function buildStartScreen({
  screenWidth,
  screenHeight,
  isTouchDevice,
  onStart,
}) {
  const startScreen = new Container();

  const titleStyle = new TextStyle({
    fontFamily: "Impact",
    fontSize: 48,
    fill: 0xffffff,
    stroke: { color: 0x000000, width: 4 },
  });

  const title = new Text({ text: "WELCOME TO CONTRA", style: titleStyle });
  title.x = screenWidth / 2 - title.width / 2;
  title.y = 80;
  startScreen.addChild(title);

  const controls = isTouchDevice
    ? createMobileOnboarding()
    : createDesktopOnboarding();
  controls.x = screenWidth / 2 - controls.width / 2;
  controls.y = title.y + title.height + 40;
  startScreen.addChild(controls);

  const buttonWidth = 220;
  const buttonHeight = 50;
  const button = new Container();

  const bg = new Graphics()
    .roundRect(0, 0, buttonWidth, buttonHeight, 8)
    .fill(0x222222)
    .stroke({ color: 0xffffff, width: 2 });

  const buttonStyle = new TextStyle({
    fontFamily: "Impact",
    fontSize: 24,
    fill: 0xffffff,
  });

  const buttonText = new Text({ text: "START", style: buttonStyle });
  buttonText.x = (buttonWidth - buttonText.width) / 2;
  buttonText.y = (buttonHeight - buttonText.height) / 2;
  button.addChild(bg, buttonText);

  button.x = screenWidth / 2 - buttonWidth / 2;
  button.y = controls.y + controls.height + 50;

  button.eventMode = "static";
  button.cursor = "pointer";
  button.on("pointerdown", onStart);

  startScreen.addChild(button);

  return startScreen;
}
