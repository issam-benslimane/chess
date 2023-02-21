import Board from "./board/board";
import Square from "./board/square";
import Position from "./position";

export function legalMoves(board: Board, square: Square) {
  if (square.piece == null) return;
  const moveTypes = square.piece.moveTypes();

  return parseMoves(moveTypes, board, square);
}

function parseMoves(moveTypes, board: Board, square: Square) {
  if (typeof moveTypes === "function") return moveTypes(board, square);
  return moveTypes.reduce(
    (result, type) => result.concat(parseMoves(type, board, square)),
    []
  );
}
