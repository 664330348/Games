import React from "react";
import { useSelector, useDispatch } from "react-redux";
import {
  selectTTT,
  handleClick,
  handleBack,
  handleNewGame,
  checkWin,
} from "./TTTSlice";
import "./TTT.css";

export default function TTT() {
  const dispatch = useDispatch();
  const [history, step, isX, winstate] = useSelector(selectTTT);

  const handleClick_ = (index_) => {
    dispatch(handleClick({ step: step, index: index_, xIsNext: isX }));
    dispatch(checkWin());
  };
  const renderSquare = (index, state) => {
    return (
      <button
        className="square"
        onClick={() => {
          handleClick_(index);
        }}
      >
        {state}
      </button>
    );
  };
  return (
    <div className="TicTacToe">
      <h1> Tic Tac Toe </h1>
      <p>
        {" "}
        {winstate
          ? isX
            ? "Player-O win"
            : "Player-X win"
          : step === 9
          ? "Draw"
          : isX
          ? "Next Player: X"
          : "Next Player: O"}{" "}
      </p>
      <div className="board">
        <div className="board-row">
          {renderSquare(0, history[step][0])}
          {renderSquare(1, history[step][1])}
          {renderSquare(2, history[step][2])}
        </div>
        <div className="board-row">
          {renderSquare(3, history[step][3])}
          {renderSquare(4, history[step][4])}
          {renderSquare(5, history[step][5])}
        </div>
        <div className="board-row">
          {renderSquare(6, history[step][6])}
          {renderSquare(7, history[step][7])}
          {renderSquare(8, history[step][8])}
        </div>
      </div>

      <button
        onClick={() => {
          dispatch(handleBack());
        }}
      >
        Backtrack
      </button>
      <button
        onClick={() => {
          dispatch(handleNewGame());
        }}
      >
        newGame
      </button>
    </div>
  );
}
