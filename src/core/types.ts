import Position from "./position";

export type TuplePosition = [x: number, y: number];

export type ObjectPosition = { x: number; y: number };

export type Positions =
  | string
  | number
  | TuplePosition
  | ObjectPosition
  | Position;

export type Direction = "up" | "down" | "left" | "right";

export type MoveOption = { depth: number; take: boolean; move: boolean };

export type PieceColor = "white" | "black";

export type Player = "humain" | "computer";
