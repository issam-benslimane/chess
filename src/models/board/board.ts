import Position from "../position";
import { Positions } from "../types";
import Square from "./square";
const SIZE = 8;

export default class Board {
  squares: Square[];

  static empty() {
    return new Board(createSquares());
  }

  constructor(squares: Square[]) {
    this.squares = squares;
  }

  squareAt(pos: Positions) {
    const position = Position.parse(pos);
    return this.squares.find((s) => s.position.equals(position));
  }

  inBound(pos: Positions) {
    const position = Position.parse(pos);
    const { x, y } = position;
    return x >= 0 && y >= 0 && x < SIZE && y < SIZE;
  }
}

function createSquares() {
  const squares: Square[] = [];
  for (let y = 0; y < SIZE; y++) {
    for (let x = 0; x < SIZE; x++) {
      squares.push(new Square(x, y));
    }
  }
  return squares;
}
