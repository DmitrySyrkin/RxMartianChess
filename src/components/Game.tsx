import React, { Component } from "react";
import { Board, BoardProps } from "./Board";
import { Figure } from "./Field";

const startingFigures = [
  [Figure.Queen, Figure.Queen, Figure.Drone, Figure.None],
  [Figure.Queen, Figure.Drone, Figure.Pawn, Figure.None],
  [Figure.Drone, Figure.Pawn, Figure.Pawn, Figure.None],
  [Figure.None, Figure.None, Figure.None, Figure.None],
  [Figure.None, Figure.None, Figure.None, Figure.None],
  [Figure.None, Figure.Pawn, Figure.Pawn, Figure.Drone],
  [Figure.None, Figure.Pawn, Figure.Drone, Figure.Queen],
  [Figure.None, Figure.Drone, Figure.Queen, Figure.Queen],
];

const startingBoard: BoardProps = {
  isRedTurn: true,
  figures: startingFigures,
};

export class Game extends React.Component {
  render() {
    return (
      <div className="game">
        <div className="game-board">
          <Board
            isRedTurn={startingBoard.isRedTurn}
            figures={startingBoard.figures}
          />
        </div>
        <div className="game-info">
          <div>{/* status */}</div>
          <ol>{/* TODO */}</ol>
        </div>
      </div>
    );
  }
}
