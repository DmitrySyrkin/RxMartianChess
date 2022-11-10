import {BoardProps} from "./Board"
import {Figure} from "./Field"

export const calculateState = (state: BoardProps, clickedRow: number, clickedCol: number) => {
    let updatedFigures = state.figures.slice();
    let updatedSelected =
      clickedRow == state.selected?.row &&
      clickedCol == state.selected?.col
        ? null
        : { row: clickedRow, col: clickedCol };
    if (
      state.selected != null &&
      updatedFigures[clickedRow][clickedCol] == Figure.None
    ) {
      updatedFigures[clickedRow][clickedCol] =
        updatedFigures[state.selected.row][state.selected.col];
      updatedFigures[state.selected.row][state.selected.col] =
        Figure.None;
      updatedSelected = null;
    }

    return {
      xIsNext: !state.xIsNext,
      figures: updatedFigures,
      selected: updatedSelected,
    };
  }