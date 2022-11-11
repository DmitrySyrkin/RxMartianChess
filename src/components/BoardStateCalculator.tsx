import { BoardProps } from "./Board";
import { Figure } from "./Field";

const belongsToCurrentPlayer = (clickedRow: number, isRedTurn: boolean) => {
  return (clickedRow > 3 && isRedTurn) || (clickedRow < 4 && !isRedTurn);
};

const isValidMove = (
  activeFigure: Figure,
  selected: { row: number; col: number },
  clickedRow: number,
  clickedCol: number,
  figures: Figure[][]
) => {
  switch (activeFigure) {
    // One space at a time, in any of the diagonal directions
    case Figure.Pawn: {
      return (
        Math.max(selected.row, clickedRow) -
          Math.min(selected.row, clickedRow) ==
          1 &&
        Math.max(selected.col, clickedCol) -
          Math.min(selected.col, clickedCol) ==
          1
      );
    }
    case Figure.Drone: {
      //  One or two spaces, on either the horizontal or vertical lines. Jumping is not allowed.
      if (
        selected.row == clickedRow &&
        Math.max(selected.col, clickedCol) -
          Math.min(selected.col, clickedCol) ==
          1
      ) {
        return true;
      }

      if (
        selected.col == clickedCol &&
        Math.max(selected.row, clickedRow) -
          Math.min(selected.row, clickedRow) ==
          1
      ) {
        return true;
      }

      if (
        selected.row == clickedRow &&
        Math.max(selected.col, clickedCol) -
          Math.min(selected.col, clickedCol) ==
          2 &&
        figures[selected.row][Math.min(selected.col, clickedCol) + 1] ==
          Figure.None
      ) {
        return true;
      }

      if (
        selected.col == clickedCol &&
        Math.max(selected.row, clickedRow) -
          Math.min(selected.row, clickedRow) ==
          2 &&
        figures[Math.min(selected.row, clickedRow) + 1][selected.col] ==
          Figure.None
      ) {
        return true;
      }

      return false;
    }

    case Figure.Queen: {
      // Any distance, in any straight-line direction: horizontally, vertically, or diagonally. Jumping is not allowed.

      if (selected.col == clickedCol) {
        for (
          let r = Math.min(selected.row, clickedRow) + 1;
          r < Math.max(selected.row, clickedRow);
          r++
        ) {
          if (figures[r][selected.col] != Figure.None) {
            return false;
          }
        }
        return true;
      }

      if (selected.row == clickedRow) {
        for (
          let c = Math.min(selected.col, clickedCol) + 1;
          c < Math.max(selected.col, clickedCol) + 1;
          c++
        ) {
          if (figures[selected.row][c] != Figure.None) {
            return false;
          }
        }
        return true;
      }

      if (
        Math.abs(selected.row - clickedRow) ==
        Math.abs(selected.col - clickedCol)
      ) {
        if (Math.abs(selected.row - clickedRow) == 1) {
          return true;
        }

        let slope =
          (selected.col > clickedCol && selected.row > clickedRow) ||
          (selected.col < clickedCol && selected.row < clickedRow)
            ? 1
            : -1;

        for (let i = 1; i < Math.abs(selected.row - clickedRow) - 1; i++) {
          if (
            figures[Math.min(selected.row, clickedRow) + i][
              Math.min(selected.col, clickedCol) + i * slope
            ] != Figure.None
          ) {
            return false;
          }
        }
        return true;
      }

      return false;
    }
  }
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
      (updatedFigures[clickedRow][clickedCol] == Figure.None ||
        (updatedFigures[clickedRow][clickedCol] != Figure.None &&
          !belongsToCurrentPlayer(clickedRow, state.isRedTurn))) &&
      isValidMove(
        updatedFigures[state.selected.row][state.selected.col],
        state.selected,
        clickedRow,
        clickedCol,
        updatedFigures
      )
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
