import React, { Component } from "react";
import { Field, FieldProps, Figure } from "./Field";
import { calculateState } from "./BoardStateCalculator";
import "./../main.scss";

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

  getWinnerText() {
    if (this.state.isGameEnd != true) {
      return <td />;
    } else {
      return (
        <td className="minor center border">
          <h1>{`Winner is ${
            this.state.redScore > this.state.blueScore ? "RED" : "BLUE"
          }`}</h1>
        </td>
      );
    }
  }

  render() {
    let status = "Current player: " + (this.state.isRedTurn ? "Red" : "Blue");
    let score = `Score: Red ${this.state.redScore} - Blue ${this.state.blueScore}`;

    return (
      <table>
        <tr>
          <td rowSpan={4} className="board">
            {this.renderRows()}
          </td>
          <td className="minor center border">{status}</td>
          <td className="top" rowSpan={4}>
            <h2>On MartianChess:</h2>
            <p>
              <a
                href="https://www.looneylabs.com/sites/default/files/literature/MartianChess_Rules5.pdf"
                target="_blank"
              >
                Rules
              </a>
            </p>
            <p>
              <a
                href="https://en.wikipedia.org/wiki/Martian_chess"
                target="_blank"
              >
                Wiki
              </a>
            </p>
            <p>
              <a
                href="https://www.youtube.com/watch?v=AQa6KIQuwj4"
                target="_blank"
              >
                YouTube - HowToPlay
              </a>
              &nbsp;(basically, this is where I've got first info on Martian
              Chess :))
            </p>
            <h2>Rules (via Wiki):</h2>
            <p>
              The pieces move as follows:
              <ul>
                <li>
                  Pawns move one space diagonally in any direction. (Unlike
                  chess pawns, they may move backwards.)
                </li>
                <li>
                  Drones move one or two spaces horizontally or vertically,
                  without jumping. (Like chess rooks, but with limited range.)
                </li>
                <li>
                  Queens move any distance horizontally, vertically, or
                  diagonally, without jumping. (The same as chess queens.)
                </li>
              </ul>
              As in chess, a square may contain no more than one piece, and a
              piece is captured when an enemy piece lands on the square it
              occupies. The capturing player removes the piece and puts it aside
              for later scoring.
            </p>
            <p>
              The game ends when one player runs out of pieces (i.e., their
              territory becomes empty). Players then compute their scores by
              adding up the point values of the pieces they captured: queen = 3,
              drone = 2, pawn = 1. The player with the highest total wins the
              game.
            </p>
            <h2> Source code</h2>
            <p>
              Source code can be found on{" "}
              <a
                href="https://github.com/DmitrySyrkin/RxMartianChess"
                target="_blank"
              >
                https://github.com/DmitrySyrkin/RxMartianChess
              </a>
            </p>
            <h2>Acknowledgements</h2>
            <p>
              Thanks to my beloved family and Sletat.ru team for encouraging me to
              learn React. Basically, TicTacToe React JS tutorial was rewriten
              to TS first and then I reused PyMartianChess logic (that I created
              while learning Python). I wish to believe that you'll enjoy the game.
            </p>
            <p>Sincerely yours, Dmitry Syrkin.</p>
          </td>
        </tr>
        <tr>
          <td className="minor center border">{score}</td>
        </tr>
        <tr>{this.getWinnerText()}</tr>
        <tr>
          <td />
        </tr>
      </table>
    );
  }
}
