import { bottomDiagonal, down, topDiagonal, up } from "../moves";
import Piece from "./piece";

export default class Pawn extends Piece {
  moveTypes() {
    return this.color === "white" ? this.whiteMoves() : this.blackMoves();
  }

  blackMoves() {
    return [
      up({ depth: this.moved ? 1 : 2, take: false }),
      topDiagonal({ depth: 1, move: false }),
    ];
  }

  whiteMoves() {
    return [
      down({ depth: this.moved ? 1 : 2, take: false }),
      bottomDiagonal({ depth: 1, move: false }),
    ];
  }

  toFen(): string {
    return this.color === "white" ? "P" : "p";
  }
}
