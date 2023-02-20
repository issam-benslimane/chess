import Square from "../board/square";
import Piece from "./piece";

export default class Queen extends Piece {
  moves() {
    return [
      {
        targets: [
          [0, 1],
          [0, -1],
          [1, 1],
          [1, -1],
          [-1, 1],
          [-1, -1],
          [1, 0],
          [-1, 0],
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
    return this.color === "white" ? "Q" : "q";
  }
}
