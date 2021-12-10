import React, {useState} from "react";
import { useSelector, useDispatch } from "react-redux";
import { selectMinesweeper, handleInit, handleClick1to8, handleClickZero
,handleAddFlag, handleRemoveFlag, handleCheckWin} from "./MinesweeperSlice";

import "./Minesweeper.scss";
import * as images from "./images";


export default function Minesweeper() {
    const dispatch = useDispatch();
    const [ArrayInit, Array, OpenArea, Flags, WinState] = useSelector(selectMinesweeper);
    const [inGame, setInGame] = useState(false);
    const [flags, setFlags] = useState(0);
    const [bombs, setBombs] = useState(0);
    /* const [ClickX, setClickX] = useState(null);
    const [ClickY, setClickY] = useState(null); */

    const imageMap = [images.img0, images.img1, images.img2, images.img3, images.img4, 
                    images.img5, images.img6, images.img7, images.img8, 
                    images.imgbomb, images.imgflag, images.imgblank, images.imgwin, images.imggameover]
                //index 9:imgbom; 10:imgflag; 11:imgblank; 12:imgwin; 13:imggameover
    const StartGame = () => {
        //[row, col, bombs]
        let size = {Easy: [4,8,5], Normal: [6,12,10], Hard:[8,16,20]}

        let myselect = document.getElementById("Select");
        let selectIndex = myselect.selectedIndex;
        let difficulty = myselect.options[selectIndex].value;

        let row=size[difficulty][0], col=size[difficulty][1], bombs=size[difficulty][2];
        setBombs(bombs);
        setFlags(bombs);

        let array = InitialArray(row, col);
        FillinBombs(array, bombs)
        dispatch(handleInit({array: array}))

        let canvas = document.getElementById("MinesweeperGame");
        let context = canvas.getContext("2d");
        context.clearRect(0,0, canvas.width, canvas.height)
        let sizeX = canvas.width/col, sizeY = canvas.height/row;

        for (let i=0; i<row; i++){
            for(let j=0; j<col; j++){
                context.drawImage(imageMap[11], j * sizeX+1, i * sizeY+1, sizeX-2, sizeY-2);
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

    const LeftClick = (e)=>{
        if (inGame === true){
            let canvas = document.getElementById("MinesweeperGame");
            let context = canvas.getContext("2d");
            const canvasInfo = canvas.getBoundingClientRect();
            let sizeX = canvas.width/Array[0].length, sizeY = canvas.height/Array.length;

            let diffw = (canvasInfo.right-canvasInfo.left) /  Array[0].length;  
            let diffy = (canvasInfo.bottom-canvasInfo.top) /  Array.length;

            let col = Math.floor((e.clientX - canvasInfo.left) / diffw); //column
            let row = Math.floor((e.clientY - canvasInfo.top) / diffy); //row

            /* setClickX(col);
            setClickY(row); */

            //make sure not click on the flag 
            if (Flags[row][col] !== 10){
                //case1 click bomb => game over
                if (Array[row][col] === 9){
                    context.clearRect(0,0,canvas.width, canvas.height);
                    for (let i=0; i<ArrayInit.length; i++){
                        for(let j=0; j<ArrayInit[0].length; j++){
                            context.drawImage(imageMap[ArrayInit[i][j]], j * sizeX+1, i * sizeY+1, sizeX-2, sizeY-2);
                        }
                    }
                    setInGame(false);
                    context.drawImage(imageMap[13],canvas.width / 2 - 225,canvas.height / 2 - 150,450,300);
                    console.log("game over")
                }
                //case2 click-value between 1-8 => game continue and update store data 
                else if(Array[row][col]>=1 && Array[row][col]<9){
                    dispatch(handleClick1to8({row:row, col:col}));
                    context.drawImage(imageMap[Array[row][col]], col * sizeX+1, row * sizeY+1, sizeX-2, sizeY-2);
                }
                //case3 click-value 0 => open near areas, game continue and update store data 
                else if(Array[row][col] === 0){
                    dispatch(handleClickZero({row:row, col:col}));
                    setTimeout(()=>{
                        document.getElementById("ClickZero").click();
                    },50)
                }

                setTimeout(()=>{
                    dispatch(handleCheckWin());
                },50)

                setTimeout(()=>{
                    document.getElementById("CheckWin").click();
                },100)
            }
        }
    }

    const RightClick =(e)=>{
        if (inGame === true){
            let canvas = document.getElementById("MinesweeperGame");
            let context = canvas.getContext("2d");
            const canvasInfo = canvas.getBoundingClientRect();
            let sizeX = canvas.width/Array[0].length, sizeY = canvas.height/Array.length;

            let diffw = (canvasInfo.right-canvasInfo.left) /  Array[0].length;  
            let diffy = (canvasInfo.bottom-canvasInfo.top) /  Array.length;

            let col = Math.floor((e.clientX - canvasInfo.left) / diffw); //column
            let row = Math.floor((e.clientY - canvasInfo.top) / diffy); //row

            /* setClickX(col);
            setClickY(row); */

            let flag_ = flags;
            if(Flags[row][col] !== 10 && Array[row][col] !== -1 && flag_ >0){
                dispatch(handleAddFlag({row:row, col:col}))
                flag_--
                setFlags(flag_);
                context.drawImage(imageMap[10], col * sizeX+1, row * sizeY+1, sizeX-2, sizeY-2);
            }
            else if (Flags[row][col] === 10){
                dispatch(handleRemoveFlag({row:row, col:col}))
                flag_++
                setFlags(flag_);
                context.drawImage(imageMap[11], col * sizeX+1, row * sizeY+1, sizeX-2, sizeY-2);
            }
        }
    }

    const CheckWin=()=>{
        if (WinState===true){
            let canvas = document.getElementById("MinesweeperGame");
            let context = canvas.getContext("2d");
            context.drawImage(imageMap[12],canvas.width / 2 - 225,canvas.height / 2 - 150,450,300);
            console.log("winnnn")

            setInGame(false);
        }
    }

    const ClickZero=()=>{
        let canvas = document.getElementById("MinesweeperGame");
        let context = canvas.getContext("2d");
        let sizeX = canvas.width/Array[0].length, sizeY = canvas.height/Array.length;
        
        for (let i=0; i<OpenArea.length; i++){
        context.drawImage(imageMap[OpenArea[i].val], OpenArea[i].col * sizeX+1, OpenArea[i].row * sizeY+1, sizeX-2, sizeY-2);
        } 
    }

    return(
        <div className="MinesweeperPage">
        <div className="Minesweeper">
            <h3>Minesweeper</h3>
            <button onClick={ClickZero} id="ClickZero" style={{ display: "none" }}>Click Zero</button>
            <button onClick={CheckWin} id="CheckWin" style={{ display: "none" }}>Click Win</button>

            <div className="MinesweeperMiddle">
                <select id="Select" className="form-select form-select-lg" 
                    style={{width:"135px",color:"blue", backgroundColor:"#e5edfa", borderColor:"#458ffd"}}>
                    <option value="Easy"> Easy </option>
                    <option value="Normal"> Normal </option>
                    <option value="Hard"> Hard </option>
                </select>

                <p>{flags} / {bombs} 🚩</p>

                <button  onClick={StartGame} className="btn btn-outline-primary btn-lg">Start Game</button>
            </div>

            <div className="MinesweeperCanvas">
            <canvas id="MinesweeperGame" onClick={LeftClick}
                onContextMenu={RightClick}
                width={700} height={350}
                 style={{ border: "2px solid"}}> A drawing of something </canvas>
            </div>
        </div>
        </div>
    )
}