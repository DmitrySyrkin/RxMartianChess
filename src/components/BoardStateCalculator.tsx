import { Figure } from "./Figure";
import { BoardState } from "./Board";
import { Position } from "./Position";
import { Move } from "./Move";

const belongsToCurrentPlayer = (clickedRow: number, isRedTurn: boolean) => {
  return (clickedRow > 3 && isRedTurn) || (clickedRow < 4 && !isRedTurn);
};

const isValidMove = (move: Move, figures: Figure[][]) => {
  let activeFigure = figures[move.src.row][move.src.col];
  let selected = move.src;
  let { clickedRow, clickedCol } = {
    clickedRow: move.dest.row,
    clickedCol: move.dest.col,
  };

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
          c < Math.max(selected.col, clickedCol);
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

        if (slope == 1) {
          for (
            let i = Math.min(selected.row, clickedRow) + 1,
              j = Math.min(selected.col, clickedCol) + 1;
            i < Math.abs(selected.row - clickedRow);
            i++, j++
          ) {
            if (figures[i][j] != Figure.None) {
              return false;
            }
          }
          return true;
        } else if (slope == -1) {
          for (
            let i = Math.min(selected.row, clickedRow) + 1,
              j = Math.max(selected.col, clickedCol) - 1;
            i < Math.abs(selected.row - clickedRow);
            i++, j--
          ) {
            if (figures[i][j] != Figure.None) {
              return false;
            }
          }
          return true;
        }

        return false;
      }
    }
  }
  return false;
};

const isGameEnd = (position: Position) => {
  let startRow = position.isRedTurn ? 4 : 0;
  let endRow = position.isRedTurn ? 8 : 4;
  for (let i = startRow; i < endRow; i++) {
    for (let j = 0; j < 4; j++) {
      if (position.figures[i][j] != Figure.None) return false;
    }
  }
  return true;
};

const getSelectionChanged = (
  state: BoardState,
  clickedRow: number,
  clickedCol: number
) => {
  let selectionChanged = false;
  let updatedSelected = state.selected;

  if (state.selected == null) {
    if (belongsToCurrentPlayer(clickedRow, state.position.isRedTurn)) {
      updatedSelected = { row: clickedRow, col: clickedCol };
      selectionChanged = true;
    }
  } else if (
    updatedSelected.row == clickedRow &&
    updatedSelected.col == clickedCol
  ) {
    updatedSelected = null;
    selectionChanged = true;
  } else if (
    belongsToCurrentPlayer(clickedRow, state.position.isRedTurn) &&
    state.position.figures[clickedRow][clickedCol] != Figure.None
  ) {
    updatedSelected = { row: clickedRow, col: clickedCol };
  }

  return {
    selectionChanged,
    updatedSelected,
  };
};

export const getMove = (
  selected: { row: number; col: number },
  clickedRow: number,
  clickedCol: number
) => {
  return { src: selected, dest: { row: clickedRow, col: clickedCol } };
};

export const updateState = (state: BoardState, move: Move) => {
  let { selectionChanged, updatedSelected } = getSelectionChanged(
    state,
    move.dest.row,
    move.dest.col
  );

  if (selectionChanged) {
    return {
      position: state.position,
      selected: updatedSelected,
      isGameEnd: isGameEnd(state.position),
    };
  }

  let updatedFigures = state.position.figures.slice();
  let updatedIsRedTurn = state.position.isRedTurn;
  let updatedRedScore = state.position.redScore;
  let updateBlueScore = state.position.blueScore;

  if (
    (updatedFigures[move.dest.row][move.dest.col] == Figure.None ||
      (updatedFigures[move.dest.row][move.dest.col] != Figure.None &&
        !belongsToCurrentPlayer(move.dest.row, state.position.isRedTurn))) &&
    isValidMove(move, updatedFigures)
  ) {
    let clickedFigure = updatedFigures[move.dest.row][move.dest.col];

    if (clickedFigure != Figure.None) {
      let value =
        clickedFigure == Figure.Queen
          ? 3
          : clickedFigure == Figure.Drone
          ? 2
          : 1;
      if (state.position.isRedTurn) {
        updatedRedScore += value;
      } else {
        updateBlueScore += value;
      }
    }

    updatedFigures[move.dest.row][move.dest.col] =
      updatedFigures[state.selected.row][state.selected.col];
    updatedFigures[state.selected.row][state.selected.col] = Figure.None;
    updatedSelected = null;
    updatedIsRedTurn = !updatedIsRedTurn;
  }

  return {
    position: {
      isRedTurn: updatedIsRedTurn,
      figures: updatedFigures,

      redScore: updatedRedScore,
      blueScore: updateBlueScore,
    },
    selected: updatedSelected,
    isGameEnd: isGameEnd(state.position),
  };
};
