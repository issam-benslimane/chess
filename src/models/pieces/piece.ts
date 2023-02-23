import { PieceColor } from "../types";

export default abstract class Piece {
  color: PieceColor;
  moved: boolean;
  constructor(color: PieceColor) {
    this.color = color;
    this.moved = false;
  }

  enemyColor() {
    return this.color === "black" ? "white" : "black";
  }

  isEnemy(piece: Piece) {
    return this.color !== piece.color;
  }

  abstract moveTypes();
}
