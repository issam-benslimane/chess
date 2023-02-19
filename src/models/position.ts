import { getCharCode } from "./helpers";

export class Position {
  x: number;
  y: number;

  static parse(pos: string) {
    const [file, rank] = pos.split("");
    return new Position(getCharCode(file), Number(rank) - 1);
  }

  constructor(x: number, y: number) {
    this.x = x;
    this.y = y;
  }

  equals(position: Position) {
    return this.x === position.x && this.y === position.y;
  }
}
