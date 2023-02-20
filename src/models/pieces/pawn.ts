import Square from "../board/square";
import { Position } from "../position";
import Piece from "./piece";

export default class Pawn extends Piece {
  direction: number = this.color === "white" ? 1 : -1;

  moves() {
    return [...this.nonCaptureMoves(), ...this.captureMoves()];
  }

  nonCaptureMoves() {
    const targets = this.moved
      ? [[0, this.direction]]
      : [
          [0, this.direction],
          [-1, this.direction * 2],
        ];
    const validation = (square: Square) => {
      if (square.isEmpty()) return { move: square.position };
      return null;
    };
    return [{ targets, validation }];
  }

  captureMoves() {
    const leftCapture = {
      targets: [[-1, this.direction]],
      validation: (square: Square) => {
        const piece = square.piece;
        if (piece == null) return () => this.LeftEnPassantMoves();
        if (this.isEnemy(piece)) return { capture: square.position };
        return null;
      },
    };
    const rightCapture = {
      targets: [[1, this.direction]],
      validation: (square: Square) => {
        const piece = square.piece;
        if (piece == null) return () => this.RightEnPassantMoves();
        if (this.isEnemy(piece)) return { capture: square.position };
        return null;
      },
    };
    return [leftCapture, rightCapture];
  }

  RightEnPassantMoves() {
    return {
      targets: [[1, 0]],
      validation: (square: Square) => {
        const piece = square.piece;
        if (piece && this.isEnpassant(piece)) {
          return [
            {
              move: square.position.plus(Position.parse([0, this.direction])),
              capture: square.position,
            },
          ];
        }
        return null;
      },
    };
  }

  LeftEnPassantMoves() {
    return {
      targets: [[-1, 0]],
      validation: (square: Square) => {
        const piece = square.piece;
        if (piece && this.isEnpassant(piece)) {
          return {
            move: square.position.plus(Position.parse([0, this.direction])),
            capture: square.position,
          };
        }
        return { type: "none" };
      },
    };
  }

  isEnpassant(piece: Piece) {
    return piece instanceof Pawn && this.isEnemy(piece);
  }

  toFen(): string {
    return this.color === "white" ? "P" : "p";
  }
}
