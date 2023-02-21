import { legalMoves } from "../legal_moves";
import King from "../pieces/king";
import Piece from "../pieces/piece";
import Position from "../position";
import { PieceColor, Positions } from "../types";
import Square from "./square";
const SIZE = 8;

export default class Board {
  squares: Square[];
  previousVersion: null | Board;

  static empty() {
    return new Board(createSquares());
  }

  constructor(squares: Square[]) {
    this.squares = squares;
    this.previousVersion = null;
  }

  legalMovesAt(pos: Positions) {
    const square = this.squareAt(pos);
    if (square == null) throw new Error("Please provide a valid position!");
    return legalMoves(this, square);
  }

  squareAt(pos: Positions) {
    const position = Position.parse(pos);
    if (!this.inBound(position)) return null;
    return this.squares.find((s) => s.position.equals(position));
  }

  kingPosition(color: PieceColor) {
    return this.squares.find((s) => s.piece instanceof King);
  }

  inBound(pos: Positions) {
    const position = Position.parse(pos);
    const { x, y } = position;
    return x >= 0 && y >= 0 && x < SIZE && y < SIZE;
  }
}

function createSquares() {
  const squares: Square[] = [];
  for (let y = 0; y < SIZE; y++) {
    for (let x = 0; x < SIZE; x++) {
      squares.push(new Square(x, y));
    }
  }
  return squares;
}
