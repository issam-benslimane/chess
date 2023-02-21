import Piece from "../pieces/piece";
import Position from "../position";

export default class Square {
  position: Position;
  piece: Piece | null;
  constructor(x: number, y: number, piece: Piece | null = null) {
    this.position = new Position(x, y);
    this.piece = piece;
  }

  setPiece(piece: Piece | null) {
    const { x, y } = this.position;
    return new Square(x, y, piece);
  }

  isEmpty() {
    return this.piece == null;
  }
}
