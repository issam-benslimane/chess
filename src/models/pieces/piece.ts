import Position from "../position";
import { CoordsTuple, PieceColor } from "../types";

export default abstract class Piece {
  color: string;
  moved: false;
  constructor(color: PieceColor) {
    this.color = color;
    this.moved = false;
  }

  isEnemy(piece: Piece) {
    return this.color !== piece.color;
  }

  abstract toFen(): string;
  abstract moveTypes();
}
