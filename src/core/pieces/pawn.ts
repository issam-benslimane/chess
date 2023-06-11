import { enPassant } from "../moves/enpassant";
import { bottomDiagonal, down, topDiagonal, up } from "../moves/basic-moves";
import Piece from "./piece";

export class Pawn extends Piece {
  static fen = "p";

  moveTypes() {
    return this.color === "white" ? this.whiteMoves() : this.blackMoves();
  }

  blackMoves() {
    return [
      up({ depth: this.moved ? 1 : 2, take: false }),
      topDiagonal({ depth: 1, move: false }),
      enPassant(),
    ];
  }

  whiteMoves() {
    return [
      down({ depth: this.moved ? 1 : 2, take: false }),
      bottomDiagonal({ depth: 1, move: false }),
      enPassant(),
    ];
  }
}
