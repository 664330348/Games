import { createSlice } from "@reduxjs/toolkit";

const initialState = {
    Array: null, // 2D Map
    Snake: null, // [{row:row, col:col},{row:row, col:col}]
    speed: null, // 1 2 3 4 5 
    direction: null, // 0=left, 1=up, 2=right, 3=down
};

export const SnakeSlice = createSlice({
  name: "Snake",
  initialState,
  reducers: {
    handleInit: (state, action) => {
        state.Array = action.payload.array;
        state.Snake = action.payload.snake;
        state.speed = action.payload.speed;
    },
    changeDirection: (state, action) => {
        // 0=left, 1=up, 2=right, 3=down
        state.direction = action.payload.direction;
    },
    //input: action.payload.head {row:row, col:col}
    moveToEmptyPlace: (state, action)=>{
        //old head -> body
        state.Array[state.Snake[0].row][state.Snake[0].col] = 3;
        //add a new head
        state.Snake.unshift(action.payload.head);
        state.Array[action.payload.head.row][action.payload.head.col] = 1;

        let tail = state.Snake.pop();
        state.Array[tail.row][tail.col] = 0;

    },
    moveToApple:(state, action)=>{
      //old head -> body
      state.Array[state.Snake[0].row][state.Snake[0].col] = 3;
      //Snake[....]->snake[head,....]
      state.Snake.unshift({row:action.payload.headRow, col:action.payload.headCol});
      //update Array map 
      state.Array[action.payload.headRow][action.payload.headCol] = 1;
      state.Array[action.payload.appleRow][action.payload.appleCol] = 2;
    },
  },
});


export const {handleInit, changeDirection, moveToEmptyPlace, moveToApple} = SnakeSlice.actions;

export const selectSnake = (state) => {
  return [state.Snake.Array, state.Snake.Snake, state.Snake.speed, state.Snake.direction];
};
export default SnakeSlice.reducer;
