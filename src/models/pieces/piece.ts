import { PieceColor } from "../types";

export default abstract class Piece {
  color: PieceColor;
  moved: boolean;
  constructor(color: PieceColor, moved: boolean = false) {
    this.color = color;
    this.moved = moved;
  }

  enemyColor() {
    return this.color === "black" ? "white" : "black";
  }

  isEnemy(piece: Piece) {
    return this.color !== piece.color;
  }

  move() {
    const Piece = this.constructor;
    return new Piece(this.color, true);
  }

  abstract moveTypes();
}
