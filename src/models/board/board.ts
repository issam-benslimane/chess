import { initialPlacement } from "../constants";
import { fromFen } from "../fen";
import { legalMoves } from "../legal_moves";
import King from "../pieces/king";
import Position from "../position";
import { PieceColor, Positions } from "../types";
import Square from "./square";

export default class Board {
  squares: Square[];
  previousVersion: null | Board;

  static start() {
    return fromFen(initialPlacement);
  }

  static fen(sequence: string) {
    return fromFen(sequence);
  }

  constructor(squares: Square[], previousVersion: null | Board = null) {
    this.squares = squares;
    this.previousVersion = previousVersion;
  }

  placePiece(origin: Positions, target: Positions) {
    const originSquare = this.squareAt(origin);
    const targetSquare = this.squareAt(target);
    const newSquares = this.squares.map((s) => {
      if (s === originSquare) return s.setPiece(null);
      if (s === targetSquare) return s.setPiece(originSquare?.piece!);
      return s;
    });

    return new Board(newSquares, this);
  }

  legalMovesAt(pos: Positions) {
    const square = this.squareAt(pos);
    if (square?.piece == null) return;
    return legalMoves(this, square);
  }

  squareAt(pos: Positions) {
    const position = Position.parse(pos);
    return this.squares.find((s) => s.position.equals(position));
  }

  squaresByColor(color: PieceColor) {
    return this.squares.filter((s) => s.piece?.color === color);
  }

  kingSquare(color: PieceColor): Square {
    return this.squares.find((s) => s.piece instanceof King)!;
  }
}
