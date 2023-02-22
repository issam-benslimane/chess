import { custom } from "../moves";
import { Directions } from "../types";
import Piece from "./piece";

export default class Knight extends Piece {
  moveTypes() {
    const directions: Directions[][] = [
      ["up", "up", "right"],
      ["up", "up", "left"],
      ["up", "right", "right"],
      ["up", "left", "left"],
      ["down", "down", "right"],
      ["down", "down", "left"],
      ["down", "right", "right"],
      ["down", "left", "left"],
    ];
    return custom({ depth: 1 }, directions);
  }

  toFen(): string {
    return this.color === "white" ? "N" : "n";
  }
}
