import Board from "./board/board";
import Position from "./position";
import { Direction } from "./types";

export function toChar(n: number) {
  return String.fromCharCode(97 + n);
}

export function getCharCode(char: string) {
  return char.charCodeAt(0) - 97;
}

export function isUppercase(char: string) {
  return char === char.toUpperCase();
}

export function isString(s: unknown): s is string {
  return typeof s === "string" || s instanceof String;
}

export function isMultiDimArray<T>(arr: unknown): arr is T[][] {
  return Array.isArray(arr) && arr[0] && arr[0][0];
}

export function isNotEmpty<T>(v: T | null | undefined): v is T {
  return v !== null && v !== undefined;
}

export function getPositionFromDirections(
  position: Position,
  directions: Direction[]
) {
  return directions.reduce((final, d) => final[d](), position);
}
