import { createSlice } from "@reduxjs/toolkit";

const initialState = {
    Imageurl: null,
    Difficulty: null,
    WinState: false,
    /* ArrayInit: {
      Easy: [[{r:0,c:0}, {r:0, c:1}, {r:0, c:2}],
          [{r:1,c:0}, {r:1, c:1}, {r:1, c:2}],
          [{r:2,c:0}, {r:2, c:1}, {r:2, c:2}]],

      Normal: [[{r:0,c:0}, {r:0, c:1}, {r:0, c:2}, {r:0, c:3}],
          [{r:1,c:0}, {r:1, c:1}, {r:1, c:2}, {r:1, c:3}],
          [{r:2,c:0}, {r:2, c:1}, {r:2, c:2}, {r:2, c:3}],
          [{r:3,c:0}, {r:3, c:1}, {r:3, c:2}, {r:3, c:3}]],

      Hard: [[{r:0,c:0}, {r:0, c:1}, {r:0, c:2}, {r:0, c:3}, {r:0, c:4}],
      [{r:1,c:0}, {r:1, c:1}, {r:1, c:2}, {r:1, c:3}, {r:1, c:4}],
      [{r:2,c:0}, {r:2, c:1}, {r:2, c:2}, {r:2, c:3}, {r:2, c:4}],
      [{r:3,c:0}, {r:3, c:1}, {r:3, c:2}, {r:3, c:3}, {r:3, c:4}],
      [{r:4,c:0}, {r:4, c:1}, {r:4, c:2}, {r:4, c:3}, {r:4, c:4}]],
    }, */
    Array: null,
    History: [],
    //[{r:clearY, c:clearX}, {r:drawY, c:drawX},{r:imgY, c:imgX}]
};

export const PuzzleSlice = createSlice({
  name: "Puzzle",
  initialState,
  reducers: {
    //input: Imageurl, difficulty
    handleInit: (state, action) => {
        state.Imageurl = action.payload.Imageurl;
        let Arrary_=null;
        if (action.payload.difficulty === "Easy"){
          Arrary_ = [[{r:0,c:0}, {r:0, c:1}, {r:0, c:2}],
          [{r:1,c:0}, {r:1, c:1}, {r:1, c:2}],
          [{r:2,c:0}, {r:2, c:1}, {r:2, c:2}]]
        }else if (action.payload.difficulty === "Normal"){
          Arrary_ = [[{r:0,c:0}, {r:0, c:1}, {r:0, c:2}, {r:0, c:3}],
          [{r:1,c:0}, {r:1, c:1}, {r:1, c:2}, {r:1, c:3}],
          [{r:2,c:0}, {r:2, c:1}, {r:2, c:2}, {r:2, c:3}],
          [{r:3,c:0}, {r:3, c:1}, {r:3, c:2}, {r:3, c:3}]]
        }else if (action.payload.difficulty === "Hard"){
          Arrary_ =[[{r:0,c:0}, {r:0, c:1}, {r:0, c:2}, {r:0, c:3}, {r:0, c:4}],
          [{r:1,c:0}, {r:1, c:1}, {r:1, c:2}, {r:1, c:3}, {r:1, c:4}],
          [{r:2,c:0}, {r:2, c:1}, {r:2, c:2}, {r:2, c:3}, {r:2, c:4}],
          [{r:3,c:0}, {r:3, c:1}, {r:3, c:2}, {r:3, c:3}, {r:3, c:4}],
          [{r:4,c:0}, {r:4, c:1}, {r:4, c:2}, {r:4, c:3}, {r:4, c:4}]]
        }

        let size=Arrary_.length*80, currentX=Arrary_.length-1, currentY=Arrary_.length-1;
        while(size>0){
          let index = Math.floor(Math.random() * 4);
          
          if(index === 0 && currentX+1<Arrary_.length-1){
              //move right
              let temp = Arrary_[currentY][currentX];
              Arrary_[currentY][currentX] = Arrary_[currentY][currentX+1];
              Arrary_[currentY][currentX+1] = temp;
              currentX++;
              size--;
          }else if(index === 1 && currentX-1>=0){
              //move left
              let temp = Arrary_[currentY][currentX];
              Arrary_[currentY][currentX] = Arrary_[currentY][currentX-1];
              Arrary_[currentY][currentX-1] = temp;
              currentX--;
              size--;
          }else if(index === 2 && currentY-1>=0){
              //move up
              let temp = Arrary_[currentY][currentX];
              Arrary_[currentY][currentX] = Arrary_[currentY-1][currentX];
              Arrary_[currentY-1][currentX] = temp;
              currentY--;
              size--;
          }else if(index === 3 && currentY+1<Arrary_.length-1){
              //move down
              let temp = Arrary_[currentY][currentX];
              Arrary_[currentY][currentX] = Arrary_[currentY+1][currentX];
              Arrary_[currentY+1][currentX] = temp;
              currentY++;
              size--;
          }
        }
        state.Array = Arrary_;
        state.History = [];
        state.Difficulty = action.payload.difficulty;
        state.WinState = false;
    },
    //input: row, col
    handleClick: (state, action) => {
      let size = state.Array.length-1;
      let col = action.payload.col, row = action.payload.row
      
      if (col-1 >=0 && state.Array[row][col-1].r===size && state.Array[row][col-1].c===size){
        //move right
        let temp = state.Array[row][col]
        state.Array[row][col]=state.Array[row][col-1];
        state.Array[row][col-1]=temp;

        let push = [];
        push.push({r:row, c:col})
        push.push({r:row, c:col-1});
        push.push(temp);
        state.History=push;
      }else if (col+1 <=size && state.Array[row][col+1].r===size && state.Array[row][col+1].c===size){
        //move left
        let temp = state.Array[row][col]
        state.Array[row][col]=state.Array[row][col+1];
        state.Array[row][col+1]=temp;

        let push = [];
        push.push({r:row, c:col})
        push.push({r:row, c:col+1});
        push.push(temp);
        state.History=push;
      }else if (row-1 >=0 && state.Array[row-1][col].r===size && state.Array[row-1][col].c===size){
        //move up
        let temp = state.Array[row][col]
        state.Array[row][col]=state.Array[row-1][col];
        state.Array[row-1][col]=temp;

        let push = [];
        push.push({r:row, c:col})
        push.push({r:row-1, c:col});
        push.push(temp);
        state.History=push;
      }else if (row+1 <=size && state.Array[row+1][col].r===size && state.Array[row+1][col].c===size){
        //move down
        let temp = state.Array[row][col]
        state.Array[row][col]=state.Array[row+1][col];
        state.Array[row+1][col]=temp;

        let push = [];
        push.push({r:row, c:col})
        push.push({r:row+1, c:col});
        push.push(temp);
        state.History=push;
      }
    },
    //check Win
    handleCheckWin: (state)=>{
      let WinState = true;
      let size = state.Array.length;
      
      for (let i=0; i<size; i++){
        for (let j=0; j<size; j++){
          if(state.Array[i][j].r !== i || state.Array[i][j].c !== j){
            WinState = false;
            i=size;
            j=size;
          }
        }
      }
      
      state.WinState = WinState;
    }
  },
});


export const { handleInit, handleClick, handleCheckWin} = PuzzleSlice.actions;

export const selectPuzzle = (state) => {
  return [state.Puzzle.Imageurl, state.Puzzle.Array,
    state.Puzzle.History, state.Puzzle.WinState];
};
export default PuzzleSlice.reducer;
