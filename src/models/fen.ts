import Board from "./board/board";
import Square from "./board/square";
import pieces from "./pieces/";

const SIZE = 8;

export function fromFen(sequence: string): Board {
  const squares = parseFen(sequence).map((v, i) => {
    const x = i % SIZE;
    const y = Math.floor(i / SIZE);
    return v ? new Square(x, y, findPiece(v)) : new Square(x, y);
  });
  return new Board(squares);
}

function parseFen(sequence: string): Array<string | null> {
  if (!isCorrectFen(sequence)) {
    throw new Error(
      "Cannot format the given sequence, please provide a valid FEN!"
    );
  }
  const squares = Array(SIZE * SIZE).fill(null);
  let [x, y] = [0, 0];
  for (let v of sequence) {
    if (!isNaN(+v)) {
      x = x + +v;
    } else if (v === "/") {
      y = y + 1;
      x = 0;
    } else {
      squares[x + y * SIZE] = v;
      x = x + 1;
    }
  }
  return squares;
}

function isCorrectFen(sequence: string): boolean {
  return /((([pnbrqkPNBRQK1-8]{1,8})\/?){8})/.test(sequence);
}

function findPiece(v: string) {
  let piece = pieces.find((p) => p.toFen() === v);
  return piece;
}
