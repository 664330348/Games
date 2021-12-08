import { configureStore } from "@reduxjs/toolkit";
import counterReducer from "../features/counter/counterSlice";
import TicTacToeReducer from "../TicTacToe/TTTSlice";
import MazeReducer from "../Maze/MazeSlice";
import PuzzleReducer from "../Puzzle/PuzzleSlice";

export const store = configureStore({
  reducer: {
    counter: counterReducer,
    TicTacToe: TicTacToeReducer,
    Maze: MazeReducer,
    Puzzle: PuzzleReducer,
  },
});
