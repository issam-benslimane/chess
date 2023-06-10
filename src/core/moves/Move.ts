import Board from "../board/board";
import Piece from "../pieces/piece";
import Position from "../position";
import { Positions } from "../types";
import { isCheck } from "./isCheck";

export class Move {
  board: Board;
  origin: Position;
  target?: Position;
  piece: Piece;
  constructor(board: Board, origin: Positions, target?: Positions) {
    this.board = board;
    this.origin = Position.parse(origin);
    this.target = target ? Position.parse(target) : undefined;
    this.piece = board.pieceAt(origin) as Piece;
  }

  movePiece(target?: Position) {
    if (target) this.board.placePiece(this.origin, target);
    else if (this.target) this.board.placePiece(this.origin, this.target);
    else throw new Error("Please provide a target");
  }

  getLegalMoves() {
    const moves = this.getPieceMoves();
    return moves.filter((target) => !isCheck(this.board, this.origin, target));
  }

  getPieceMoves() {
    const moveTypes = this.piece.moveTypes();
    const origin = this.origin;
    const board = this.board;
    function iterate(moveTypes) {
      if (typeof moveTypes === "function") return moveTypes(origin, board);
      return moveTypes.reduce(
        (result, type) => result.concat(iterate(type)),
        []
      );
    }
    return iterate(moveTypes) as Position[];
  }
}
