import Board from "../board/board";
import Square from "../board/square";

const initialBoard = () => Board.start();
const randomBoard = () =>
  Board.fen("rkb13r/p2pBpNp/n4n2/1p1NP2P/6P1/3P4/P1P1K2R/q5b1");
const checkBoard = () => Board.fen("b3B3/8/8/3K/8/8/8/K7");

describe("squares", () => {
  let board = initialBoard();
  test("should be an array", () => {
    expect(board.squares instanceof Array).toBeTruthy();
  });

  test("each square should be instance of Square", () => {
    expect(board.squares[0] instanceof Square).toBeTruthy();
  });
});

describe("legal moves", () => {
  describe("when square is empty", () => {
    let board = initialBoard();
    test("should return undefined", () => {
      expect(board.legalMovesAt("a3")).toBeUndefined();
    });
  });

  describe("when not causing check", () => {
    let board = randomBoard();
    describe("pawn moves", () => {
      test("when no enemy is in diagonal", () => {
        let moves = board.legalMovesAt("a2");
        expect(moves).toHaveLength(2);
      });
      test("when an enemy is in diagonal", () => {
        let moves = board.legalMovesAt("e5");
        expect(moves).toHaveLength(2);
      });
    });
    test("rook moves", () => {
      let moves = board.legalMovesAt("h2");
      expect(moves).toHaveLength(5);
    });
    test("knight moves", () => {
      let moves = board.legalMovesAt("d5");
      expect(moves).toHaveLength(7);
    });
    test("bishop moves", () => {
      let moves = board.legalMovesAt("e7");
      expect(moves).toHaveLength(7);
    });
    test("queen moves", () => {
      let moves = board.legalMovesAt("a1");
      expect(moves).toHaveLength(10);
    });
    test("king moves", () => {
      let moves = board.legalMovesAt("e2");
      expect(moves).toHaveLength(7);
    });
  });

  describe("when king is in check", () => {
    let board = checkBoard();
    test("king can move into a safe position", () => {
      let moves = board.legalMovesAt("e8");
      expect(moves).toHaveLength(1);
    });

    test("other pieces could move if they end check", () => {
      let moves = board.legalMovesAt("d5");
      expect(moves).toHaveLength(6);
    });

    test("other pieces should not move otherwise", () => {
      let moves = board.legalMovesAt("a1");

      expect(moves).toHaveLength(0);
    });
  });
});
