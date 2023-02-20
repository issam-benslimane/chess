import Square from "../board/square";
import Piece from "./piece";
import { Position } from "../position";
import Rook from "./rook";

export default class King extends Piece {
  leftRook = this.color === "white" ? "a1" : "a8";
  rightRook = this.color === "white" ? "h1" : "h8";

  moves() {
    return [
      this.defaultMoves(),
      this.leftCastleMoves(),
      this.rightCastleMoves(),
    ];
  }

  defaultMoves() {
    return {
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
    };
  }

  leftCastleMoves(currentTarget = [0, -1]) {
    const rookPosition = Position.parse(this.leftRook);
    return {
      targets: [currentTarget],
      validation: (square: Square) => {
        if (this.moved) return null;
        const piece = square.piece;
        if (square.position.equals(rookPosition)) {
          if (piece == null || !(piece instanceof Rook) || piece.moved)
            return null;
          return { move: square.position.plus(Position.parse([0, 2])) };
        }
        if (piece == null)
          return () => this.leftCastleMoves([0, currentTarget[1] + 1]);
        return null;
      },
    };
  }

  rightCastleMoves(currentTarget = [0, 1]) {
    const rookPosition = Position.parse(this.leftRook);
    return {
      targets: [currentTarget],
      validation: (square: Square) => {
        if (this.moved) return null;
        const piece = square.piece;
        if (square.position.equals(rookPosition)) {
          if (piece == null || !(piece instanceof Rook) || piece.moved)
            return null;
          return { move: square.position.plus(Position.parse([0, 2])) };
        }
        if (piece == null)
          return () => this.leftCastleMoves([0, currentTarget[1] + 1]);
        return null;
      },
    };
  }

  toFen(): string {
    return this.color === "white" ? "K" : "k";
  }
}
