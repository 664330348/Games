import { configureStore } from "@reduxjs/toolkit";
import counterReducer from "../features/counter/counterSlice";
import TicTacToeReducer from "../TicTacToe/TTTSlice";
import MazeReducer from "../Maze/MazeSlice";

export const store = configureStore({
  reducer: {
    counter: counterReducer,
    TicTacToe: TicTacToeReducer,
    Maze: MazeReducer,
  },
});
