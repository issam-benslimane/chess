import { bottomDiagonal, down, topDiagonal, up } from "../moves";
import { Directions } from "../types";
import Piece from "./piece";

export default class Pawn extends Piece {
  moveTypes() {
    return this.color === "white" ? this.whiteMoves() : this.blackMoves();
  }

  blackMoves() {
    return [up({ depth: this.moved ? 1 : 2 }), topDiagonal({ depth: 1 })];
  }

  whiteMoves() {
    return [down({ depth: this.moved ? 1 : 2 }), bottomDiagonal({ depth: 1 })];
  }

  toFen(): string {
    return this.color === "white" ? "P" : "p";
  }
}
