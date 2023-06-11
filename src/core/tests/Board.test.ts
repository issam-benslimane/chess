import Board from "../board/board";
import Piece from "../pieces/piece";

describe("cells", () => {
  let board = Board.start();
  test("should be an array", () => {
    expect(board.cells instanceof Array).toBeTruthy();
  });

  test("each cell should have either a Piece or be null", () => {
    expect(
      board.cells.every((cell) => cell instanceof Piece || cell === null)
    ).toBeTruthy();
  });

  describe("starting position", () => {
    test("first two and last rows should have a Piece", () => {
      expect(
        board.cells.slice(0, 16).every((cell) => cell instanceof Piece)
      ).toBeTruthy();
      expect(
        board.cells.slice(-16).every((cell) => cell instanceof Piece)
      ).toBeTruthy();
    });
  });
});
