import { diagonal, horizontal, vertical } from "../moves";
import Piece from "./piece";

export default class King extends Piece {
  moves() {
    const depth = 1;
    return [horizontal({ depth }), vertical({ depth }), diagonal({ depth })];
  }

  toFen(): string {
    return this.color === "white" ? "K" : "k";
  }
}
