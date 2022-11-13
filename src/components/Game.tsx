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
  redScore: 0,
  blueScore: 0,
};

export class Game extends React.Component {
  render() {
    return (
      <div className="game">
        <h1>Martian Chess</h1>
        <div className="game-board">
          <Board {...startingBoard} />
        </div>
      </div>
    );
  }
}
