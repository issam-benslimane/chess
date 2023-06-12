import { SIZE, initialPlacement } from "../constants";
import { fromFen } from "../fen";
import { King } from "../pieces";
import Piece from "../pieces/piece";
import Position from "../position";
import { PieceColor, Positions } from "../types";

export default class Board {
  cells: { piece: Piece | null; position: Position }[];
  lastMoved?: { from: Position; to: Position };

  static start(color: PieceColor = "white") {
    return fromFen(initialPlacement[color], color);
  }

  static fen(sequence: string) {
    return fromFen(sequence);
  }

  constructor(
    cells: { piece: Piece | null; position: Position }[],
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
    const newCells = this.cells.map(({ piece, position }) => {
      if (position.equals(origin)) return { piece: null, position };
      if (position.equals(target))
        return { piece: this.pieceAt(origin)?.move(), position };
      return actions.reduce(
        (v, { from, to }) => {
          if (position.equals(from)) return { piece: null, position };
          if (to && position.equals(to))
            return { piece: this.pieceAt(from)?.move(), position };
          return v;
        },
        { piece, position }
      );
    });
    return new Board(newCells, {
      from: origin,
      to: target,
    });
  }

  pieceAt(pos: Positions) {
    const position = Position.parse(pos);
    return this.cells.find((cell) => cell.position.equals(position))?.piece;
  }

  getNonEmptyCells(color?: PieceColor) {
    return this.cells.filter(({ piece }) => {
      if (!piece) return false;
      if (color) return piece.color === color;
      return true;
    }) as { piece: Piece; position: Position }[];
  }

  kingPosition(color: PieceColor) {
    const cell = this.cells.find(
      ({ piece }) => piece && piece.color === color && piece instanceof King
    );
    return cell?.position as Position;
  }

  inBound(pos: Positions) {
    const { x, y } = Position.parse(pos);
    return x >= 0 && y >= 0 && x < SIZE && y < SIZE;
  }
}
