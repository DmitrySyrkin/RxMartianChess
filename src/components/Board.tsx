import React, { Component } from "react";
import { Field, FieldProps } from "./Field";
import { Figure } from "./Figure";
import { getMove, updateState } from "./BoardStateCalculator";
import { aiEnabled, getNextMove } from "./AI";
import { Position } from "./Position";
import { gameInfo } from "./Documentation";
import "./../main.scss";

export type BoardState = {
  position: Position;
  selected?: { row: number; col: number };
  isGameEnd: boolean;
};

export class Board extends React.Component<Position, BoardState> {
  constructor(props: Position) {
    super(props);
    this.state = {
      position: props,
      selected: null,
      isGameEnd: false,
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

    this.setState(
      updateState(this.state, getMove(this.state.selected, row, col))
    );

    if (aiEnabled) {
      this.setState(updateState(this.state, getNextMove(this.state.position)));
    }
  }

  getFieldProps(row: number, col: number): FieldProps {
    return {
      row: row,
      col: col,
      figure: this.state.position.figures[row][col],
      isSelected:
        this.state.position.figures[row][col] != Figure.None &&
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

  getWinnerText() {
    if (this.state.isGameEnd != true) {
      return <td />;
    } else {
      return (
        <td className="center border">
          <h1>{`Winner is ${
            this.state.position.redScore > this.state.position.blueScore
              ? "RED"
              : "BLUE"
          }`}</h1>
        </td>
      );
    }
  }

  render() {
    let status =
      "Current player: " + (this.state.position.isRedTurn ? "Red" : "Blue");
    let score = `Score: Red ${this.state.position.redScore} - Blue ${this.state.position.blueScore}`;

    return (
      <table>
        <tr>
          <td rowSpan={2} className="board">
            {this.renderRows()}
          </td>
          <td>
            <table>
              <tr>
                <td className="minor center border">{status}</td>
                <td className="minor center border">{score}</td>
                <td>{this.getWinnerText()}</td>
              </tr>
              <tr>{gameInfo()}</tr>
            </table>
          </td>
        </tr>
      </table>
    );
  }
}
