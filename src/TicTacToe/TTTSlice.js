import {createSlice } from '@reduxjs/toolkit';

const initialState = {
  history:[[null,null,null,null,null,null,null,null,null]],
  step:0,
  xIsNext:true,
  win:false
};


export const TTTSlice = createSlice({
  name: 'TicTacToe',
  initialState,
  reducers: {
    handleClick:(state, action) => {
        if (state.history[state.step][action.payload.index] === null && state.win===false){
            let tmpstore = state.history[state.step].slice();
            if (action.payload.xIsNext === true){
                tmpstore[action.payload.index]="X"
            }else{
                tmpstore[action.payload.index]="O"
            }
            state.history.push(tmpstore)
            state.step++;
            state.xIsNext= !state.xIsNext
        }
    },
    handleBack:(state)=>{
        if (state.step>=1 && state.win===false && state.step!==9){
            state.history.pop();
            state.step--;
            state.xIsNext= !state.xIsNext;
        }
    },
    handleNewGame:(state)=>{
        if(state.step>0){
            state.history.length=1;
            state.step=0;
            state.xIsNext=true;
            state.win=false;
        }
    },
    checkWin:(state)=>{
        let tmpstore = state.history[state.step].slice();
        let winlist = [[0,1,2],[3,4,5],[6,7,8],[0,3,6],[1,4,7],[2,5,8],[0,4,8],[2,4,6]]

        for(let i=0; i<8; i++){
            const [a,b,c] = winlist[i];
            if(tmpstore[a] && tmpstore[a]===tmpstore[b] && tmpstore[a]===tmpstore[c]){
                state.win=true;
                break;
            }
        }
    },
  },

});

export const {handleClick, handleBack, handleNewGame, checkWin} = TTTSlice.actions;

export const selectTTT = (state) => {return [state.TicTacToe.history, 
        state.TicTacToe.step, state.TicTacToe.xIsNext, state.TicTacToe.win]};

export default TTTSlice.reducer;
