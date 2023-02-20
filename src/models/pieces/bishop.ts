import Square from "../board/square";
import Piece from "./piece";

export default class Bishop extends Piece {
  moves() {
    return [
      {
        targets: [
          [1, 1],
          [-1, -1],
          [-1, 1],
          [-1, 1],
        ],
        validation: (square: Square) => {
          const piece = square.piece;
          if (piece == null) return { move: square.position };
          if (this.isEnemy(piece)) return { capture: square.position };
          return null;
        },
        extends: true,
      },
    ];
  }

  toFen(): string {
    return this.color === "white" ? "B" : "b";
  }
}
