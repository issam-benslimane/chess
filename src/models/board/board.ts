import { Position } from "../position";
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

  squareAt(pos: string) {
    const position = Position.parse(pos);
    return this.squares.find((s) => s.position.equals(position));
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
