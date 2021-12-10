import { createSlice } from "@reduxjs/toolkit";

const initialState = {
    ArrayInit:null,
    Array:null,
    OpenArea: null, 
    Flags:null,
    WinState: false,
};

export const MinesweeperSlice = createSlice({
  name: "Minesweeper",
  initialState,
  reducers: {
    handleInit: (state, action) => {
      state.ArrayInit = action.payload.array;
      state.Array = action.payload.array;
      state.Flags = action.payload.array;
      state.WinState = false;
    },
    handleClick1to8: (state, action)=>{
      state.Array[action.payload.row][action.payload.col]=-1;
    },
    handleClickZero: (state, action)=>{
      let array=state.Array;
      let openarea = [];
      let maxCol = array[0].length, maxRow = array.length;

      openNear (action.payload.row, action.payload.col)

      function openNear (row, col){
        //val should be zero 
        //{row:row, col:col, val: array[row][col]}
        openarea.push({row:row, col:col, val: array[row][col]});
        array[row][col] = -1;

        //check 8 directions that is next to zero:
        //direction ↖
        if(row-1>=0 && col-1>=0 ){
          //case1: finds zero again
          if (array[row-1][col-1]===0) openNear(row-1, col-1)
          //case2: finds between 1-8
          else if (array[row-1][col-1]>0 && array[row-1][col-1]<9){
            openarea.push({row:row-1, col:col-1, val: array[row-1][col-1]})
            array[row-1][col-1] = -1;
          }
        }

        //direction ↑
        if(row-1>=0 ) {
           //case1: finds zero again
           if (array[row-1][col]===0) openNear(row-1, col)
           //case2: finds between 1-8
           else if (array[row-1][col]>0 && array[row-1][col]<9){
              openarea.push({row:row-1, col:col, val: array[row-1][col]})
              array[row-1][col] = -1;
           }
            
        }

        //direction ↗
        if(row-1>=0 && col+1<maxCol){
           //case1: finds zero again
           if (array[row-1][col+1]===0) openNear(row-1, col+1)
           //case2: finds between 1-8
           else if (array[row-1][col+1]>0 && array[row-1][col+1]<9){
              openarea.push({row:row-1, col:col+1, val: array[row-1][col+1]})
              array[row-1][col+1] = -1;
           }
        }

        //direction ←
        if(col-1>=0) {
          //case1: finds zero again
          if (array[row][col-1]===0) openNear(row, col-1)
          //case2: finds between 1-8
          else if (array[row][col-1]>0 && array[row][col-1]<9){
             openarea.push({row:row, col:col-1, val: array[row][col-1]})
             array[row][col-1] = -1;
          }
        }

        //direction →
        if(col+1<maxCol ) {
          //case1: finds zero again
          if (array[row][col+1]===0) openNear(row, col+1)
          //case2: finds between 1-8
          else if (array[row][col+1]>0 && array[row][col+1]<9){
             openarea.push({row:row, col:col+1, val: array[row][col+1]})
             array[row][col+1] = -1;
          }
        };

        //direction ↙
        if(row+1<maxRow && col-1>=0 ){
          //case1: finds zero again
          if (array[row+1][col-1]===0) openNear(row+1, col-1)
          //case2: finds between 1-8
          else if (array[row+1][col-1]>0 && array[row+1][col-1]<9){
             openarea.push({row:row+1, col:col-1, val: array[row+1][col-1]})
             array[row+1][col-1] = -1;
          }
        }; 

        //direction ↓
        if(row+1<maxRow ) {
          //case1: finds zero again
          if (array[row+1][col]===0) openNear(row+1, col)
          //case2: finds between 1-8
          else if (array[row+1][col]>0 && array[row+1][col]<9){
             openarea.push({row:row+1, col:col, val: array[row+1][col]})
             array[row+1][col] = -1;
          }
        };

        //direction ↘
        if(row+1<maxRow && col+1<maxCol) {
          //case1: finds zero again
          if (array[row+1][col+1]===0) openNear(row+1, col+1)
          //case2: finds between 1-8
          else if (array[row+1][col+1]>0 && array[row+1][col+1]<9){
             openarea.push({row:row+1, col:col+1, val: array[row+1][col+1]})
             array[row+1][col+1] = -1;
          }
        };

        state.OpenArea=openarea;
      }



      //state.Array=Array;
    },
    handleAddFlag:(state,action)=>{
      state.Flags[action.payload.row][action.payload.col] = 10;
    },
    handleRemoveFlag:(state,action)=>{
      state.Flags[action.payload.row][action.payload.col] 
      = state.ArrayInit[action.payload.row][action.payload.col];
    },
    handleCheckWin: (state)=>{
      let WinState = true;
      
      for (let i=0; i<state.Array.length; i++){
        for (let j=0; j<state.Array[0].length; j++){
          if(state.Array[i][j] >= 0 && state.Array[i][j] <9){
            WinState = false;
            break;
          }
        }
      }
      
      state.WinState = WinState;
    }
    
  },
});


export const { handleInit, handleClick1to8, handleClickZero, 
  handleAddFlag, handleRemoveFlag, handleCheckWin} = MinesweeperSlice.actions;

export const selectMinesweeper = (state) => {
  return [state.Minesweeper.ArrayInit, state.Minesweeper.Array, 
    state.Minesweeper.OpenArea, state.Minesweeper.Flags, state.Minesweeper.WinState];
};
export default MinesweeperSlice.reducer;
