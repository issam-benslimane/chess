import { custom } from "../moves";
import { Directions } from "../types";
import Piece from "./piece";

export default class Knight extends Piece {
  moves() {
    const directions: Directions[][] = [
      ["up", "up", "right"],
      ["up", "up", "left"],
      ["up", "right", "right"],
      ["up", "left", "left"],
      ["down", "down", "right"],
      ["down", "down", "left"],
      ["down", "right", "right"],
      ["down", "left", "right"],
    ];
    return custom({ depth: 1 }, directions);
  }

  toFen(): string {
    return this.color === "white" ? "N" : "n";
  }
}
