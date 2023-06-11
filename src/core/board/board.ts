import { SIZE, initialPlacement } from "../constants";
import { fromFen } from "../fen";
import { King } from "../pieces";
import Piece from "../pieces/piece";
import Position from "../position";
import { PieceColor, Positions } from "../types";

export default class Board {
  cells: (Piece | null)[];
  lastMoved?: { from: Position; to: Position };

  static start(color: PieceColor = "white") {
    return fromFen(initialPlacement[color]);
  }

  static fen(sequence: string) {
    return fromFen(sequence);
  }

  constructor(
    cells: (Piece | null)[],
    lastMoved?: { from: Position; to: Position }
  ) {
    this.cells = cells;
    this.lastMoved = lastMoved;
  }

  placePiece(
    origin: Position,
    target: Position,
    actions: { from: Position; to?: Position }[] = []
  ) {
    const newCells = this.cells.map((cell, i) => {
      const position = Position.parse(i);
      if (position.equals(origin)) return null;
      if (position.equals(target)) return this.pieceAt(origin)?.move();
      return actions.reduce((v, { from, to }) => {
        if (position.equals(from)) return null;
        if (to && position.equals(to))
          return to ? this.pieceAt(from)?.move() : null;
        return v;
      }, cell);
    });
    return new Board(newCells, {
      from: Position.parse(origin),
      to: Position.parse(target),
    });
  }

  updateCell(pos: Positions, v: Piece | null) {
    const { x, y } = Position.parse(pos);
    this.cells[y * 8 + x] = v;
  }

  pieceAt(pos: Positions) {
    const { x, y } = Position.parse(pos);
    return this.cells[y * 8 + x];
  }

  getPiecePosition(piece: Piece) {
    const index = this.cells.findIndex((cell) => cell === piece);
    return Position.parse(index);
  }

  getPieces(color?: PieceColor): Piece[] {
    return [];
  }

  getNonEmptyCells(color?: PieceColor) {
    return this.cells.filter((cell) => {
      if (!cell) return false;
      if (color) return cell.color === color;
      return true;
    }) as Piece[];
  }

  kingPosition(color: PieceColor) {
    const cell = this.cells.find(
      (cell) => cell && cell.color === color && cell instanceof King
    ) as Piece;
    return this.getPiecePosition(cell);
  }

  inBound(pos: Positions) {
    const { x, y } = Position.parse(pos);
    return x >= 0 && y >= 0 && x < SIZE && y < SIZE;
  }
}
