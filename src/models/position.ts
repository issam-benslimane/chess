import { SIZE } from "./constants";
import { getCharCode, toChar } from "./helpers";
import { Positions } from "./types";

export default class Position {
  x: number;
  y: number;

  static parse(pos: Positions) {
    if (pos instanceof Position) return pos;
    let x: number, y: number;
    if (typeof pos === "string") {
      const [file, rank] = pos.split("");
      x = getCharCode(file);
      y = SIZE - Number(rank);
    } else if (typeof pos === "number") {
      x = pos % SIZE;
      y = Math.floor(pos / SIZE);
    } else if (Array.isArray(pos)) {
      [x, y] = pos;
    } else {
      x = pos.x;
      y = pos.y;
    }
    if (x < 0 || y < 0 || x >= SIZE || y >= SIZE)
      throw new Error("Please provide a valid position!");

    return new Position(x, y);
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
