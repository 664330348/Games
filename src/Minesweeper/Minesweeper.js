import React, {useState} from "react";
import { useSelector, useDispatch } from "react-redux";
import { selectMinesweeper, handleInit} from "./MinesweeperSlice";

import "./Minesweeper.scss";
import * as images from "./images";


export default function Minesweeper() {
    const dispatch = useDispatch();
    const [Array] = useSelector(selectMinesweeper);
    const [inGame, setInGame] = useState(false);
    const [ClickX, setClickX] = useState(null);
    const [ClickY, setClickY] = useState(null);


    const imageMap = [images.img0, images.img1, images.img2, images.img3, images.img4, 
                    images.img5, images.img6, images.img7, images.img8, 
                    images.imgbomb, images.imgflag, images.imgblank]

    const StartGame = () => {
        //[row, col, bombs]
        let size = {Easy: [4,8,5], Normal: [6,12,10], Hard:[8,16,20]}

        let myselect = document.getElementById("Select");
        let selectIndex = myselect.selectedIndex;
        let difficulty = myselect.options[selectIndex].value;

        let row=size[difficulty][0], col=size[difficulty][1], bombs=size[difficulty][2]
        let array = InitialArray(row, col);
        FillinBombs(array, bombs)
        dispatch(handleInit({array: array}))

        let canvas = document.getElementById("MinesweeperGame");
        let context = canvas.getContext("2d");
        context.clearRect(0,0, canvas.width, canvas.height)
        let sizeX = canvas.width/col, sizeY = canvas.height/row;

        for (let i=0; i<row; i++){
            for(let j=0; j<col; j++){
                context.drawImage(imageMap[array[i][j]], j * sizeX+1, i * sizeY+1, sizeX-2, sizeY-2);
            }
        }
        setInGame(true);
    };

    //initial an array with all 0
    const InitialArray =(row, col)=>{
        let array = [];
        for (let i = 0; i<row; i++){
            let arrary_ = [];
            arrary_.length = col;
            arrary_.fill(0);
            array.push(arrary_)
        }

        return array;
    }
    //fill in bombs 
    const FillinBombs = (array, amount)=>{
        let maxCol = array[0].length, maxRow = array.length;
        while(amount>0){
            let x = Math.floor(Math.random() * maxCol);
            let y = Math.floor(Math.random() * maxRow);

            if (array[y][x] !== 9){
                array[y][x] = 9;

                if(y-1>=0 && x-1>=0 && array[y-1][x-1]<9) array[y-1][x-1]++; 
                if(y-1>=0 && array[y-1][x]<9) array[y-1][x]++;
                if(y-1>=0 && x+1<maxCol && array[y-1][x+1]<9) array[y-1][x+1]++;

                if(x-1>=0 && array[y][x-1]<9) array[y][x-1]++; 
                if(x+1<maxCol && array[y][x+1]<9) array[y][x+1]++;

                if(y+1<maxRow && x-1>=0 && array[y+1][x-1]<9) array[y+1][x-1]++; 
                if(y+1<maxRow && array[y+1][x]<9) array[y+1][x]++;
                if(y+1<maxRow && x+1<maxCol && array[y+1][x+1]<9) array[y+1][x+1]++;

                amount--;
            }
        }
    }

    const RunGamebyMouse = (e)=>{
        if (inGame === true){
            let canvas = document.getElementById("MinesweeperGame");
            const canvasInfo = canvas.getBoundingClientRect();
            let diffw = (canvasInfo.right-canvasInfo.left) /  Array[0].length;  
            let diffy = (canvasInfo.bottom-canvasInfo.top) /  Array.length;

            let col = Math.floor((e.clientX - canvasInfo.left) / diffw); //column
            let row = Math.floor((e.clientY - canvasInfo.top) / diffy); //row

            setClickX(col);
            setClickY(row);
        }
    }
    return(
        <div className="MinesweeperPage">
        <div className="Minesweeper">
            <h3>Minesweeper</h3>
             Y:{ClickY} X:{ClickX}
            <div>
                <select id="Select" className="form-select form-select-lg" 
                    style={{width:"120px",color:"blue", backgroundColor:"#e5edfa", borderColor:"#458ffd"}}>
                    <option value="Easy"> Easy </option>
                    <option value="Normal"> Normal </option>
                    <option value="Hard"> Hard </option>
                </select>

                <button  onClick={StartGame} className="btn btn-outline-primary btn-lg">Start Game</button>
            </div>

            <canvas id="MinesweeperGame" onClick={RunGamebyMouse}
                 style={{ border: "2px solid", borderTop:"4px solid"}}> A drawing of something </canvas>
        </div>
        </div>
    )
}