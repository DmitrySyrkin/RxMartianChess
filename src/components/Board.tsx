import React, { Component } from "react";
import { Field } from "./Field";

export type BoardProps = {
  xIsNext: boolean;
};

export class Board extends React.Component<BoardProps, BoardProps> {
  constructor(props: BoardProps) {
    super(props);
    this.state = {
      xIsNext: props.xIsNext,
    };
  }

  renderField(row: number, col: number) {
    return (
      <Field row={row} col={col} onClick={() => this.handleClick(row, col)} />
    );
  }

  handleClick(row: number, col: number) {
    this.setState({ xIsNext: !this.state.xIsNext });
    console.log(`${row}:${col}`);
  }

  renderRows() {
    let list: JSX.Element[] = [];
    for (let row: number = 0; row < 8; row++) {
      let oneRow: JSX.Element[] = [];
      for (let col: number = 0; col < 4; col++)
        oneRow.push(this.renderField(row, col));
      list.push(<div className="board-row">{oneRow}</div>);
    }
    return list;
  }

  render() {
    let status = "Next player: " + (this.state.xIsNext ? "X" : "O");

    return (
      <div>
        <div className="status">{status}</div>
        {this.renderRows()}
      </div>
    );
  }
}
