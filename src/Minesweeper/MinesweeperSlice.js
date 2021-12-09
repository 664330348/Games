import { createSlice } from "@reduxjs/toolkit";

const initialState = {
    Array:null,
};

export const MinesweeperSlice = createSlice({
  name: "Minesweeper",
  initialState,
  reducers: {
    handleInit: (state, action) => {
        state.Array = action.payload.array;
      },
  },
});


export const { handleInit} = MinesweeperSlice.actions;

export const selectMinesweeper = (state) => {
  return [state.Minesweeper.Array];
};
export default MinesweeperSlice.reducer;
