import Position from "./position";

export type TuplePosition = [x: number, y: number];

export type ObjectPosition = { x: number; y: number };

export type Positions =
  | string
  | number
  | TuplePosition
  | ObjectPosition
  | Position;

export type Directions = "up" | "down" | "left" | "right";

export type Move = { origin: Position; target: Position };

export type PieceColor = "white" | "black";

export type Player = "humain" | "computer";
