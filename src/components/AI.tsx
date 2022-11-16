import { Position } from "./Position";
import { Move } from "./Move";

export const getNextMove = (position: Position) => {
  let move: Move = { src: { row: 0, col: 0 }, dest: { row: 0, col: 0 } };
  return move;
};

export const aiEnabled: boolean = false;
