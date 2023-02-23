import Square from "./board/square";
import Board from "./board/board";
import { initialPlacement, SIZE } from "./constants";
import { isUppercase } from "./helpers";
import * as pieces from "./pieces/";
import Position from "./position";

export function fromFen(sequence: string): Board {
  const squares = parseFen(sequence).map((v, i) => {
    const { x, y } = Position.parse(i);
    return new Square(x, y, createPiece(v));
  });

  return new Board(squares);
}

function parseFen(sequence: string): Array<string | null> {
  if (!isCorrectFen(sequence)) {
    throw new Error(
      "Cannot parse the given sequence, please provide a valid FEN!"
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

function createPiece(fen: string | null) {
  if (!fen) return null;
  const Piece = findPiece(fen);
  const color = colorFromFen(fen);
  return Piece && new Piece(color);
}

function findPiece(fen: string) {
  let piece = Object.values(pieces).find(
    (p) => p.fen === fen.toLocaleLowerCase()
  );
  return piece;
}

function colorFromFen(fen: string) {
  return isUppercase(fen) ? "white" : "black";
}
