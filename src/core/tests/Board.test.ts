import Board from "../board/board";
import Piece from "../pieces/piece";

describe("cells", () => {
  let board = Board.start();
  test("should be an array", () => {
    expect(board.cells instanceof Array).toBeTruthy();
  });

  test("each cell should be an object that have a piece and it's position", () => {
    expect(
      board.cells.every(
        (cell) =>
          Object.prototype.hasOwnProperty.call(cell, "position") &&
          Object.prototype.hasOwnProperty.call(cell, "piece")
      )
    ).toBeTruthy();
  });

  test("each piece should have either a Piece or be null", () => {
    expect(
      board.cells.every(
        (cell) => cell.piece instanceof Piece || cell.piece === null
      )
    ).toBeTruthy();
  });

  describe("starting position", () => {
    test("first two and last rows should have a Piece", () => {
      expect(
        board.cells.slice(0, 16).every((cell) => cell.piece instanceof Piece)
      ).toBeTruthy();
      expect(
        board.cells.slice(-16).every((cell) => cell.piece instanceof Piece)
      ).toBeTruthy();
    });
  });
});
