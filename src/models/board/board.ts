import { initialPlacement } from "../constants";
import { fromFen } from "../fen";
import { legalMoves } from "../legal_moves";
import { King } from "../pieces/king";
import Piece from "../pieces/piece";
import Position from "../position";
import { PieceColor, Positions } from "../types";
import Square from "./square";

export default class Board {
  squares: Square[];
  previousVersion: null | Board;

  static start(color: PieceColor = "white") {
    return fromFen(initialPlacement[color]);
  }

  static fen(sequence: string) {
    return fromFen(sequence);
  }

  constructor(squares: Square[], previousVersion: null | Board = null) {
    this.squares = squares;
    this.previousVersion = previousVersion;
  }

  legalMovesAt(pos: Positions) {
    const square = this.squareAt(pos);
    if (square?.piece == null) return null;
    return legalMoves(this, square);
  }

  placePiece(origin: Positions, target: Positions) {
    if (!this.allowPiecePlacement(origin, target)) return this;
    return this.changePiecePosition(origin, target);
  }

  allowPiecePlacement(origin: Positions, target: Positions) {
    const p1 = Position.parse(origin);
    const p2 = Position.parse(target);
    return this.legalMovesAt(p1)?.some((move) => move.equals(p2));
  }

  changePiecePosition(origin: Positions, target: Positions) {
    const originSquare = this.squareAt(origin);
    const targetSquare = this.squareAt(target);
    const newSquares = this.squares.map((s) => {
      if (s === originSquare) return s.setPiece(null);
      if (s === targetSquare) return s.setPiece(originSquare?.piece!);
      return s;
    });

    return new Board(newSquares, this);
  }

  squareAt(pos: Positions) {
    const position = Position.parse(pos);
    return this.squares.find((s) => s.position.equals(position));
  }

  pieceAt(pos: Positions) {
    return this.squareAt(pos)?.piece?.color;
  }

  getNonEmptySquares(pieceColor?: PieceColor) {
    return this.squares.filter((s) =>
      pieceColor ? s.piece?.color === pieceColor : s.piece
    );
  }

  getPieces(color?: PieceColor): Piece[] {
    return this.getNonEmptySquares(color).map((s) => s.piece!);
  }

  kingSquare(color: PieceColor): Square {
    return this.getNonEmptySquares(color).find((s) => s.piece instanceof King)!;
  }

  checkMate(color: PieceColor) {
    return this.getNonEmptySquares(color).every(
      (s) => this.legalMovesAt(s.position)!.length === 0
    );
  }
}
