import { BoardProps } from "./Board";
import { Figure } from "./Field";

const belongsToCurrentPlayer = (clickedRow: number, isRedTurn: boolean) => {
  return (clickedRow > 3 && isRedTurn) || (clickedRow < 4 && !isRedTurn);
};

const isValidMove = (activeFigure: Figure, figures: Figure[][]) => {
  return true;
};

export const calculateState = (
  state: BoardProps,
  clickedRow: number,
  clickedCol: number
) => {
  let updatedFigures = state.figures.slice();
  let updatedSelected = state.selected;
  let updatedIsRedTurn = state.isRedTurn;

  // select
  if (state.selected == null) {
    if (belongsToCurrentPlayer(clickedRow, state.isRedTurn)) {
      updatedSelected = { row: clickedRow, col: clickedCol };
    }
  } else {
    if (
      updatedSelected.row == clickedRow &&
      updatedSelected.col == clickedCol
    ) {
      updatedSelected = null;
    } else if (
      belongsToCurrentPlayer(clickedRow, state.isRedTurn) &&
      updatedFigures[clickedRow][clickedCol] != Figure.None
    ) {
      updatedSelected = { row: clickedRow, col: clickedCol };
    } else if (
      updatedFigures[clickedRow][clickedCol] == Figure.None ||
      (updatedFigures[clickedRow][clickedCol] != Figure.None &&
        !belongsToCurrentPlayer(clickedRow, state.isRedTurn) &&
        isValidMove(updatedFigures[state.selected.row][state.selected.col], updatedFigures))
    ) {
      updatedFigures[clickedRow][clickedCol] =
        updatedFigures[state.selected.row][state.selected.col];
      updatedFigures[state.selected.row][state.selected.col] = Figure.None;
      updatedSelected = null;
      updatedIsRedTurn = !updatedIsRedTurn;
    }
  }

  return {
    isRedTurn: updatedIsRedTurn,
    figures: updatedFigures,
    selected: updatedSelected,
  };
};
