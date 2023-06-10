import { SIZE, initialPlacement } from "../constants";
import { fromFen } from "../fen";
import { King } from "../pieces";
import Piece from "../pieces/piece";
import Position from "../position";
import { PieceColor, Positions } from "../types";

export default class Board {
  cells: (Piece | null)[];
  lastMoved?: { piece: Piece; from: Position; to: Position };

  static start(color: PieceColor = "white") {
    return fromFen(initialPlacement[color]);
  }

  static fen(sequence: string) {
    return fromFen(sequence);
  }

  constructor(
    cells: (Piece | null)[],
    lastMoved?: { piece: Piece; from: Position; to: Position }
  ) {
    this.cells = cells;
    this.lastMoved = lastMoved;
  }

  placePiece(origin: Positions, target: Positions) {
    const piece = this.pieceAt(origin) as Piece;
    this.lastMoved = {
      piece,
      from: Position.parse(origin),
      to: Position.parse(target),
    };
    this.updateCell(origin, null);
    this.updateCell(target, piece);
    piece.move();
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
