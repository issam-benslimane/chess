import Board from "./board/board";
import Piece from "./pieces/piece";
import Position from "./position";

function memoize(fn: (board: Board, square: Square) => Position[]) {
  let cache = new Map();
  return (board: Board, square: Square): Position[] => {
    const key = generateKey(square.position);

    if (!cache.get("board") || board !== cache.get("board")) {
      cache.clear();
      cache.set("board", board);
    } else {
      const moves = cache.get(key);
      if (moves) return moves;
    }
    const moves = fn(board, square);
    cache.set(key, moves);
    return moves;
  };
}

function generateKey(pos: Position) {
  return `${pos.x},${pos.y}`;
}
