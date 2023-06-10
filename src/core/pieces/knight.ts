import { custom } from "../moves/basic-moves";
import { Direction } from "../types";
import Piece from "./piece";

export class Knight extends Piece {
  static fen = "n";

  moveTypes() {
    const directions: Direction[][] = [
      ["up", "up", "right"],
      ["up", "up", "left"],
      ["up", "right", "right"],
      ["up", "left", "left"],
      ["down", "down", "right"],
      ["down", "down", "left"],
      ["down", "right", "right"],
      ["down", "left", "left"],
    ];
    return custom(directions, { depth: 1 });
  }
}
