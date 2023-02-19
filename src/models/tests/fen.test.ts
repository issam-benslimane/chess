import Board from "../board/board";
import { fromFen } from "../fen";

const correctFen = "rnbqkbnr/pppppppp/8/8/8/8/PPPPPPPP/RNBQKBNR";

test("returns a new board object", () => {
  expect(fromFen(correctFen) instanceof Board).toBeTruthy();
});

test("throws an error if the given sequence is invalid", () => {
  expect(() => fromFen("xxx")).toThrowError(
    "Cannot format the given sequence, please provide a valid FEN!"
  );
});
