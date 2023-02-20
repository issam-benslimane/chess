import Square from "../board/square";
import Piece from "./piece";

export default class Knight extends Piece {
  moves() {
    return [
      {
        targets: [
          [2, 1],
          [2, -1],
          [-2, 1],
          [-2, -1],
          [1, 2],
          [-1, 2],
          [1, -2],
          [-1, -2],
        ],
        validation: (square: Square) => {
          const piece = square.piece;
          if (piece == null) return { move: square.position };
          if (this.isEnemy(piece)) return { capture: square.position };
          return null;
        },
      },
    ];
  }

  toFen(): string {
    return this.color === "white" ? "N" : "n";
  }
}
