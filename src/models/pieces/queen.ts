import { diagonal, horizontal, vertical } from "../moves";
import Piece from "./piece";

export class Queen extends Piece {
  static fen = "q";

  moveTypes() {
    return [vertical(), horizontal(), diagonal()];
  }
}
