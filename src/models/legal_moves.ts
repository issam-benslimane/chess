import Board from "./board/board";
import Square from "./board/square";
import Position from "./position";

export function legalMoves(board: Board, square: Square) {
  return generateMoves(board, square).filter((move) =>
    isLegalMove(board, square, move)
  );
}

function isLegalMove(board: Board, originSquare: Square, target: Position) {
  const newBoard = board.placePiece(originSquare.position, target);
  const color = originSquare.piece!.color;
  const enemyColor = originSquare.piece!.enemyColor();
  const kingSquare = newBoard.kingSquare(color);
  const enemySquares = newBoard.squaresByColor(enemyColor);
  return enemySquares.every((s) => {
    const moves = generateMoves(newBoard, s);
    return !isCausingCheck(moves, kingSquare);
  });
}

function isCausingCheck(moves: Position[], kingSquare: Square) {
  return moves.some((move) => move.equals(kingSquare.position));
}

function generateMoves(board: Board, square: Square) {
  const moveTypes = square.piece!.moveTypes();

  return parseMoves(moveTypes, board, square);
}

function parseMoves(moveTypes, board: Board, square: Square): Position[] {
  if (typeof moveTypes === "function") return moveTypes(board, square);
  return moveTypes.reduce(
    (result, type) => result.concat(parseMoves(type, board, square)),
    []
  );
}
