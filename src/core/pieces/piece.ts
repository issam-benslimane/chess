import Board from "../board/board";
import Position from "../position";
import { Direction, PieceColor } from "../types";

export default abstract class Piece {
  color: PieceColor;
  moved: boolean;
  direction: Direction;

  constructor(color: PieceColor, moved = false) {
    this.color = color;
    this.moved = moved;
    this.direction = this.color === "white" ? "down" : "up";
  }

  enemyColor() {
    return this.color === "black" ? "white" : "black";
  }

  isEnemy(piece: Piece) {
    return this.color !== piece.color;
  }

  move() {
    this.moved = true;
  }

  abstract moveTypes();
}
