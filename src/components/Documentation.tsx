import React from "react";

export const gameInfo = () => {
  return (
    <td className="top" colSpan={3}>
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
        <a href="https://en.wikipedia.org/wiki/Martian_chess" target="_blank">
          Wiki
        </a>
      </p>
      <p>
        <a href="https://www.youtube.com/watch?v=AQa6KIQuwj4" target="_blank">
          YouTube - HowToPlay
        </a>
        &nbsp;(basically, this is where I've got first info on Martian Chess :))
      </p>
      <h2>Rules (via Wiki):</h2>
      <p>
        The pieces move as follows:
        <ul>
          <li>
            Pawns move one space diagonally in any direction. (Unlike chess
            pawns, they may move backwards.)
          </li>
          <li>
            Drones move one or two spaces horizontally or vertically, without
            jumping. (Like chess rooks, but with limited range.)
          </li>
          <li>
            Queens move any distance horizontally, vertically, or diagonally,
            without jumping. (The same as chess queens.)
          </li>
        </ul>
        As in chess, a square may contain no more than one piece, and a piece is
        captured when an enemy piece lands on the square it occupies. The
        capturing player removes the piece and puts it aside for later scoring.
      </p>
      <p>
        The game ends when one player runs out of pieces (i.e., their territory
        becomes empty). Players then compute their scores by adding up the point
        values of the pieces they captured: queen = 3, drone = 2, pawn = 1. The
        player with the highest total wins the game.
      </p>
      <h2> Source code</h2>
      <p>
        Source code can be found on
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
        learn React. Basically, TicTacToe React JS tutorial was rewriten to TS
        first and then I reused PyMartianChess logic (that I created while
        learning Python). I wish to believe that you'll enjoy the game.
      </p>
      <p>Sincerely yours, Dmitry Syrkin.</p>
    </td>
  );
};
