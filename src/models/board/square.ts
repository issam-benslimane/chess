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
    const newPiece = piece && piece.move();
    return new Square(x, y, newPiece);
  }

  isEmpty() {
    return this.piece == null;
  }
}
