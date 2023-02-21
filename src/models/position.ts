import { getCharCode } from "./helpers";
import { Positions } from "./types";

export default class Position {
  x: number;
  y: number;

  static parse(pos: Positions) {
    if (pos instanceof Position) return pos;
    if (typeof pos === "string") {
      const [file, rank] = pos.split("");
      return new Position(getCharCode(file), Number(rank) - 1);
    }
    if (Array.isArray(pos)) {
      return new Position(...pos);
    }
    return new Position(pos.x, pos.y);
  }

  constructor(x: number, y: number) {
    this.x = x;
    this.y = y;
  }

  equals(other_position: Position) {
    return this.x === other_position.x && this.y === other_position.y;
  }

  plus(other_position: Position) {
    return new Position(this.x + other_position.x, this.y + other_position.y);
  }

  times(factor: number) {
    return new Position(this.x * factor, this.y * factor);
  }

  left() {
    return new Position(this.x - 1, this.y);
  }

  right() {
    return new Position(this.x + 1, this.y);
  }

  up() {
    return new Position(this.x, this.y + 1);
  }

  down() {
    return new Position(this.x, this.y - 1);
  }
}
