import { Container } from "pixi.js";
import createKeyBox, {
  createControlRow,
  createJoystickHint,
} from "./KeyBox.js";

export default function createMobileOnboarding() {
  const container = new Container();
  const rowGap = 16;
  const buttonSize = 56;
  const keyColumnWidth = buttonSize;

  const rows = [
    createControlRow(
      [createJoystickHint(48)],
      "— move & aim",
      12,
      keyColumnWidth,
    ),
    createControlRow(
      [
        createKeyBox("JUMP", {
          width: buttonSize,
          height: buttonSize,
          shape: "circle",
          fontSize: 12,
        }),
      ],
      "— jump",
      12,
      keyColumnWidth,
    ),
    createControlRow(
      [
        createKeyBox("SHOOT", {
          width: buttonSize,
          height: buttonSize,
          shape: "circle",
          fontSize: 11,
        }),
      ],
      "— shoot",
      12,
      keyColumnWidth,
    ),
  ];

  let y = 0;

  for (const row of rows) {
    row.x = 0;
    row.y = y;
    container.addChild(row);
    y += buttonSize + rowGap;
  }

  return container;
}
