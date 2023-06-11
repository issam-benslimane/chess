import Board from "../board/board";
import { Move } from "../moves/Move";
import { King, Rook } from "../pieces";

const randomBoard = () =>
  Board.fen("r1b4r/p2pBpNp/n1k2n2/1p1NP2P/6P1/3P4/P1P1K2R/q5b1");
const kingInCheck = () => Board.fen("b3B3/8/8/3K/8/8/8/P7");
const checkMateBoard = () => Board.fen("4R2k/8/7K/8/8/8/8/8");
const enPassantBoard = () => Board.fen("k6K/8/8/8/2p5/8/3P4/8");
const castlingBoard = () => Board.fen("8/8/8/8/8/8/8/R3K2R");

describe("legal moves", () => {
  describe("when a move does not cause check", () => {
    let board = randomBoard();
    describe("pawn moves", () => {
      test("when no enemy is in diagonal", () => {
        let moves = new Move(board, "a2").getLegalMoves();
        expect(moves).toHaveLength(2);
      });
      test("when an enemy is in diagonal", () => {
        let moves = new Move(board, "e5").getLegalMoves();
        expect(moves).toHaveLength(2);
      });
      test("en passant", () => {
        let board = enPassantBoard();
        let firstMove = new Move(board, "d2", "d4");
        board = firstMove.movePiece();
        let secondMove = new Move(board, "c4", "d3");
        let moves = secondMove.getLegalMoves();
        expect(moves).toHaveLength(3);
        board = secondMove.movePiece();
        expect(board.pieceAt("d4")).toBeNull();
      });
    });
    test("rook moves", () => {
      let moves = new Move(board, "h2").getLegalMoves();
      expect(moves).toHaveLength(5);
    });
    test("knight moves", () => {
      let moves = new Move(board, "d5").getLegalMoves();
      expect(moves).toHaveLength(7);
    });
    test("bishop moves", () => {
      let moves = new Move(board, "e7").getLegalMoves();
      expect(moves).toHaveLength(7);
    });
    test("queen moves", () => {
      let moves = new Move(board, "a1").getLegalMoves();
      expect(moves).toHaveLength(10);
    });
    describe("king moves", () => {
      test("normal moves", () => {
        let moves = new Move(board, "c6").getLegalMoves();
        expect(moves).toHaveLength(2);
      });
      test("castling", () => {
        let board = castlingBoard();
        let move = new Move(board, "e1", "g1");
        let moves = move.getLegalMoves();
        expect(moves).toHaveLength(7);
        board = move.movePiece();
        expect(board.pieceAt("g1")).toBeInstanceOf(King);
        expect(board.pieceAt("f1")).toBeInstanceOf(Rook);
      });
    });
  });

  describe("when king is in check", () => {
    let board = kingInCheck();
    test("king can move into a safe position", () => {
      let moves = new Move(board, "d5").getLegalMoves();
      expect(moves).toHaveLength(6);
    });

    test("other pieces could move if they end check", () => {
      let moves = new Move(board, "e8").getLegalMoves();
      expect(moves).toHaveLength(1);
    });

    test("other pieces should not move otherwise", () => {
      let moves = new Move(board, "a1").getLegalMoves();
      expect(moves).toHaveLength(0);
    });
  });
});
