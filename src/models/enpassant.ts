import Board from "./board/board";
import Square from "./board/square";
import Position from "./position";

export function enPassant() {
  return (Board: Board, square: Square) => {
    const moves: Position[] = [];
    return moves;
  };
}
