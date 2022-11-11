import { BoardProps } from "./Board";
import { Figure } from "./Field";

export const calculateState = (
  state: BoardProps,
  clickedRow: number,
  clickedCol: number
) => {
  let updatedFigures = state.figures.slice();
  let updatedSelected = state.selected;
  let updatedIsRedTurn = state.isRedTurn;

  if (state.selected == null) {
    if (belongsToCurrentPlayer(clickedRow, state.isRedTurn)) {
      updatedSelected = { row: clickedRow, col: clickedCol };
    }
  } else if (
    updatedSelected.row == clickedRow &&
    updatedSelected.col == clickedCol
  ) {
    updatedSelected = null;
  }

  if (
    state.selected != null &&
    belongsToCurrentPlayer(clickedRow, state.isRedTurn) &&
    updatedFigures[clickedRow][clickedCol] == Figure.None
  ) {
    updatedFigures[clickedRow][clickedCol] =
      updatedFigures[state.selected.row][state.selected.col];
    updatedFigures[state.selected.row][state.selected.col] = Figure.None;
    updatedSelected = null;
    updatedIsRedTurn = !updatedIsRedTurn;
  }

  return {
    isRedTurn: updatedIsRedTurn,
    figures: updatedFigures,
    selected: updatedSelected,
  };
};

const belongsToCurrentPlayer = (clickedRow: number, isRedTurn: boolean) => {
  return (clickedRow > 3 && isRedTurn) || (clickedRow < 4 && !isRedTurn);
};
