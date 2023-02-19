import Board from "../board/board";
import Square from "../board/square";

let board: Board;

beforeEach(() => {
  board = Board.empty();
});

describe("squares", () => {
  test("should be an array", () => {
    expect(board.squares instanceof Array).toBeTruthy();
  });

  test("each square should be instance of Square", () => {
    expect(board.squares[0] instanceof Square).toBeTruthy();
  });
});
