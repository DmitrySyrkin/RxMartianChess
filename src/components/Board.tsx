import React, { Component } from "react";
import { Field, FieldProps, Figure } from "./Field";
import { calculateState } from "./BoardStateCalculator";

export type BoardProps = {
  isRedTurn: boolean;
  figures: Figure[][];
  selected?: { row: number; col: number };
  redScore: number;
  blueScore: number;
  isGameEnd?: boolean;
};

export class Board extends React.Component<BoardProps, BoardProps> {
  constructor(props: BoardProps) {
    super(props);
    this.state = {
      isRedTurn: props.isRedTurn,
      figures: props.figures,
      selected: null,
      redScore: props.redScore,
      blueScore: props.blueScore,
    };
  }

  renderField(props: FieldProps) {
    return (
      <Field
        row={props.row}
        col={props.col}
        isSelected={props.isSelected}
        figure={props.figure}
        onClick={() => this.handleClick(props.row, props.col)}
      />
    );
  }

  handleClick(row: number, col: number) {
    if (this.state.isGameEnd == true) {
      return;
    }

    this.setState(calculateState(this.state, row, col));
    console.log(`${row}:${col}`);
  }

  getFieldProps(row: number, col: number): FieldProps {
    return {
      row: row,
      col: col,
      figure: this.state.figures[row][col],
      isSelected:
        this.state.figures[row][col] != Figure.None &&
        row == this.state.selected?.row &&
        col == this.state.selected?.col,
    };
  }

  renderRows() {
    let list: JSX.Element[] = [];
    for (let row: number = 0; row < 8; row++) {
      let oneRow: JSX.Element[] = [];
      for (let col: number = 0; col < 4; col++)
        oneRow.push(this.renderField(this.getFieldProps(row, col)));
      list.push(<div className="board-row">{oneRow}</div>);
    }
    return list;
  }

  render() {
    let status = "Current player: " + (this.state.isRedTurn ? "Red" : "Blue");
    let score = `Score: Red ${this.state.redScore} - Blue ${this.state.blueScore}`;
    let winnerText =
      this.state.isGameEnd == true
        ? `Winner: ${
            this.state.redScore > this.state.blueScore ? "RED" : "BLUE"
          }`
        : null;
    return (
      <div>
        <div className="status">{status}</div>
        <div className="score">{score}</div>
        <div className="winner">{winnerText}</div>
        {this.renderRows()}
      </div>
    );
  }
}
