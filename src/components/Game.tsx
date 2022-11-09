import React, { Component } from "react";
import { Board, BoardProps } from "./Board";

const startingBoard: BoardProps = { 
  xIsNext: true,
};

export class Game extends React.Component {
  render() {
    return (
      <div className="game">
        <div className="game-board">
          <Board xIsNext={startingBoard.xIsNext} />
        </div>
        <div className="game-info">
          <div>{/* status */}</div>
          <ol>{/* TODO */}</ol>
        </div>
      </div>
    );
  }
}
