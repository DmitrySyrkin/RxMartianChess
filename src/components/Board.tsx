import React, { Component } from "react";
import { Square } from "./Square";

export class Board extends React.Component<
  {},
  { squares: any[]; xIsNext: boolean }
> {
  constructor(props: {}) {
    super(props);
    this.state = {
      squares: Array(9).fill(null),
      xIsNext: true,
    };
  }

  renderSquare(i: number) {
    return (
      <Square
        col={i}
        row={i}
        value={this.state.squares[i]}
        onClick={() => this.handleClick(i)}
      />
    );
  }

  handleClick(i: number) {
    if (this.calculateWinner(this.state.squares) || this.state.squares[i]) {
      return;
    }

    const squares = this.state.squares.slice();
    squares[i] = this.state.xIsNext ? "X" : "0";
    this.setState({ squares: squares, xIsNext: !this.state.xIsNext });
  }

  calculateWinner(squares: any[]) {
    const lines = [
      [0, 1, 2],
      [3, 4, 5],
      [6, 7, 8],
      [0, 3, 6],
      [1, 4, 7],
      [2, 5, 8],
      [0, 4, 8],
      [2, 4, 6],
    ];
    for (let i = 0; i < lines.length; i++) {
      const [a, b, c] = lines[i];
      if (
        squares[a] &&
        squares[a] === squares[b] &&
        squares[a] === squares[c]
      ) {
        return squares[a];
      }
    }
    return null;
  }

  render() {
    const winner = this.calculateWinner(this.state.squares);
    let status;
    if (winner) {
      status = "Winner: " + winner;
    } else {
      status = "Next player: " + (this.state.xIsNext ? "X" : "O");
    }

    const boardRow = Array.from(Array(8).keys()).map((m) => (
      <div className="board-row">
        {this.renderSquare(m * 3 + 0)}
        {this.renderSquare(m * 3 + 1)}
        {this.renderSquare(m * 3 + 2)}
        {this.renderSquare(m * 3 + 3)}
      </div>
    ));
    return (
      <div>
        <div className="status">{status}</div>
        {boardRow}
      </div>
    );
  }
}
