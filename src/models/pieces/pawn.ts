import { custom, topDiagonal } from "../moves";
import { Directions } from "../types";
import Piece from "./piece";

export default class Pawn extends Piece {
  direction: Directions = this.color === "white" ? "up" : "down";

  moves() {
    const verticalMove = custom({ depth: this.moved ? 1 : 2 }, this.direction);
    return [verticalMove, topDiagonal({ depth: 1 })];
  }

  toFen(): string {
    return this.color === "white" ? "P" : "p";
  }
}
