import Board from "../board/board";
import Piece from "../pieces/piece";
import Position from "../position";
import { Positions } from "../types";
import { isEnPassant } from "./enpassant";
import { isCheck } from "./isCheck";

export class Move {
  board: Board;
  origin: Position;
  target?: Position;
  constructor(board: Board, origin: Positions, target?: Positions) {
    this.board = board;
    this.origin = Position.parse(origin);
    this.target = target ? Position.parse(target) : undefined;
  }

  movePiece(target?: Position) {
    target = target || this.target;
    if (!target) throw new Error("Please provide a target");
    const actions: { from: Position; to?: Position }[] = [];
    if (isEnPassant(this.board, this.origin, target)) {
      const lastMovedPosition = this.board.lastMoved?.to as Position;
      actions.push({ from: lastMovedPosition });
    }
    return this.board.placePiece(this.origin, target, actions);
  }

  getLegalMoves() {
    const moves = this.getPieceMoves();
    return moves.filter((target) => !isCheck(this.board, this.origin, target));
  }

  getPieceMoves() {
    const piece = this.board.pieceAt(this.origin) as Piece;
    const moveTypes = piece.moveTypes();
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
