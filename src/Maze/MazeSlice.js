import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  ArrayInit: {
    Easy: [
      [
        ["p", "b", "w", "w", "w", "w", "w", "w"],
        ["w", "b", "b", "b", "b", "b", "b", "w"],
        ["w", "w", "w", "w", "w", "w", "b", "w"],
        ["w", "w", "w", "w", "w", "w", "b", "b"],
        ["w", "w", "w", "w", "w", "w", "w", "e"],
      ],
      [
        ["p", "b", "w", "w", "w", "w", "w", "w"],
        ["w", "b", "b", "b", "w", "w", "w", "w"],
        ["w", "w", "w", "b", "w", "w", "w", "w"],
        ["w", "w", "w", "b", "w", "w", "w", "w"],
        ["w", "w", "w", "b", "b", "b", "b", "e"],
      ],
      [
        ["p", "b", "w", "w", "w", "w", "w", "w"],
        ["w", "b", "b", "b", "w", "w", "w", "w"],
        ["w", "w", "w", "b", "b", "b", "w", "w"],
        ["w", "w", "w", "w", "w", "b", "b", "w"],
        ["w", "w", "w", "w", "w", "w", "b", "e"],
      ],
    ],
    Normal: [
      [
        ["p", "b", "w", "w", "w", "w", "w", "w", "w", "w", "w", "w"],
        ["w", "b", "b", "b", "b", "b", "b", "b", "b", "b", "b", "b"],
        ["w", "b", "w", "w", "w", "w", "b", "w", "w", "w", "w", "b"],
        ["w", "b", "w", "b", "w", "w", "b", "w", "w", "b", "w", "b"],
        ["w", "b", "w", "b", "w", "w", "b", "w", "w", "b", "w", "b"],
        ["w", "b", "b", "b", "b", "b", "b", "w", "w", "b", "w", "w"],
        ["w", "w", "w", "w", "w", "w", "b", "b", "b", "b", "b", "e"],
      ],
      [
        ["p", "b", "w", "w", "w", "w", "w", "w", "w", "w", "w", "w"],
        ["w", "b", "b", "b", "b", "b", "b", "b", "b", "b", "b", "b"],
        ["w", "b", "w", "w", "w", "w", "b", "w", "w", "w", "w", "b"],
        ["w", "b", "w", "b", "w", "w", "b", "w", "w", "b", "w", "b"],
        ["w", "b", "w", "b", "w", "w", "b", "w", "w", "b", "w", "b"],
        ["w", "b", "b", "b", "b", "b", "b", "w", "w", "b", "w", "b"],
        ["w", "w", "w", "w", "w", "w", "b", "b", "b", "b", "w", "e"],
      ],
      [
        ["p", "b", "w", "w", "w", "w", "w", "w", "w", "w", "w", "w"],
        ["w", "b", "b", "b", "b", "b", "b", "b", "b", "b", "b", "b"],
        ["w", "b", "w", "w", "w", "w", "b", "w", "w", "b", "w", "w"],
        ["w", "b", "w", "b", "w", "w", "b", "w", "w", "b", "w", "w"],
        ["w", "b", "w", "b", "w", "w", "b", "w", "w", "b", "w", "w"],
        ["w", "b", "b", "b", "b", "b", "b", "w", "w", "b", "b", "b"],
        ["w", "w", "w", "w", "w", "w", "b", "b", "b", "w", "w", "e"],
      ],
    ],
    Hard: [
      [
        ["p", "b", "w", "w", "b", "w", "b", "w", "w", "w", "w", "w", "w", "w", "w", "w"],
        ["w", "b", "b", "b", "b", "b", "b", "b", "b", "b", "b", "b", "b", "b", "b", "b"],
        ["w", "b", "w", "w", "w", "w", "b", "w", "w", "w", "w", "b", "w", "w", "w", "b"],
        ["w", "b", "w", "b", "w", "w", "b", "w", "w", "b", "w", "b", "w", "w", "w", "b"],
        ["w", "b", "w", "b", "w", "w", "b", "w", "w", "b", "w", "b", "w", "e", "b", "b"],
        ["w", "b", "b", "b", "b", "b", "b", "w", "b", "b", "w", "w", "w", "w", "w", "w"],
        ["w", "w", "b", "w", "w", "w", "b", "b", "b", "w", "b", "w", "w", "b", "w", "w"],
        ["w", "b", "b", "b", "b", "w", "b", "w", "w", "w", "b", "w", "w", "b", "w", "w"],
        ["w", "w", "w", "w", "w", "w", "b", "b", "b", "b", "b", "b", "b", "b", "b", "b"],
      ],
      [
        ["p", "b", "w", "w", "b", "w", "b", "w", "w", "w", "w", "w", "w", "w", "w", "w"],
        ["w", "b", "b", "b", "b", "b", "b", "b", "b", "b", "b", "b", "b", "b", "b", "b"],
        ["w", "b", "w", "w", "w", "w", "b", "w", "w", "w", "w", "b", "w", "b", "w", "b"],
        ["w", "b", "w", "b", "w", "w", "b", "w", "w", "b", "w", "b", "b", "b", "w", "b"],
        ["w", "b", "w", "b", "w", "w", "b", "w", "w", "b", "w", "b", "w", "w", "w", "b"],
        ["w", "b", "b", "b", "b", "b", "b", "w", "b", "b", "b", "w", "b", "w", "w", "b"],
        ["w", "w", "b", "w", "b", "w", "b", "b", "b", "w", "b", "w", "b", "b", "b", "b"],
        ["w", "b", "b", "b", "b", "w", "b", "w", "w", "w", "b", "w", "w", "w", "w", "w"],
        ["w", "w", "w", "w", "w", "w", "b", "b", "b", "w", "b", "b", "b", "b", "b", "e"],
      ],
      [
        ["p", "b", "w", "w", "w", "w", "w", "w", "w", "w", "w", "w", "w", "w", "w", "w"],
        ["w", "b", "b", "b", "b", "b", "b", "b", "b", "b", "b", "b", "b", "b", "b", "b"],
        ["w", "b", "w", "w", "w", "w", "b", "w", "w", "b", "w", "b", "w", "w", "w", "b"],
        ["w", "b", "w", "b", "w", "w", "b", "w", "w", "w", "w", "w", "w", "w", "w", "w"],
        ["w", "b", "w", "b", "w", "w", "w", "w", "b", "b", "b", "b", "b", "b", "b", "b"],
        ["w", "b", "b", "b", "b", "b", "b", "w", "b", "w", "w", "w", "w", "w", "w", "b"],
        ["w", "w", "b", "w", "w", "w", "b", "w", "b", "w", "b", "w", "e", "b", "w", "b"],
        ["w", "b", "b", "b", "b", "w", "b", "w", "b", "w", "b", "w", "w", "b", "w", "b"],
        ["w", "w", "w", "w", "b", "b", "b", "b", "b", "b", "b", "w", "b", "b", "b", "b"],
      ],
    ],
  },
  Array: null,
};

export const MazeSlice = createSlice({
  name: "Maze",
  initialState,
  reducers: {
    //action.difficulty ={easy, normal, hard} action.index={0,1,2}
    handleInit: (state, action) => {
      state.Array =
        state.ArrayInit[action.payload.difficulty][action.payload.index];
    },
    //action.payload.px  action.payload.py action.payload.nx action.payload.ny
    handleMove: (state, action) => {
      state.Array[action.payload.nx][action.payload.ny] = "p";
      state.Array[action.payload.px][action.payload.py] = "b";
    },
  },
});


export const { handleInit, handleMove } = MazeSlice.actions;

export const selectMaze = (state) => {
  return [state.Maze.ArrayInit, state.Maze.Array];
};
export default MazeSlice.reducer;
