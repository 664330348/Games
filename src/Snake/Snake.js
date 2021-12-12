import React, {useState} from "react";
import { useSelector, useDispatch } from "react-redux";
import { selectSnake, handleInit, changeDirection, moveToEmptyPlace, moveToApple} from "./SnakeSlice";

import "./Snake.scss";
import * as images from "./images";

export default function Snake() {
    const dispatch = useDispatch();
    const [Array, Snake, speed, direction] = useSelector(selectSnake);

    const [GmaeTimeOut, setGameTimeOut] = useState(null);
    const [points, setPoints] = useState(0);

    const dw=35; 
    const imageMap = [images.imgblue, images.imgblack, images.imgred, images.imggameover, images.imgwin]
    //0:empty; 1:snake body; 2:apple; 3:gameover; 4:win

    const StartGame =()=>{
        let array = InitialArray();
        //AddStartLocation(array);
        let row = Math.floor(Math.random() * 10);
        let col = Math.floor(Math.random() * 20);
        array[row][col]=1;

        
        //AddAppleLocation(array);
        while (true){
            let row = Math.floor(Math.random() * 10);
            let col = Math.floor(Math.random() * 20);
            if(array[row][col]===0){ 
                array[row][col]=2;
                break;
            }
        }

        SetUpDirection(row,col)

        let myselect = document.getElementById("Select");
        let selectIndex = myselect.selectedIndex;
        let speed_ = Number(myselect.options[selectIndex].value);
        //Initial store data
        dispatch(handleInit({array:array, snake:[{row:row, col:col}], speed:speed_}))
        

        let canvas = document.getElementById("SnakeGame");
        let context = canvas.getContext("2d");
        context.clearRect(0,0, canvas.width, canvas.height)
        for (let i=0; i<10; i++){
            for(let j=0; j<20; j++){
                context.drawImage(imageMap[array[i][j]], j * dw+1, i * dw+1, dw-2, dw-2);
            }
        }

        canvas.focus();
        setPoints(0);

        if (GmaeTimeOut !== null){
            clearTimeout(GmaeTimeOut)
        }
        setGameTimeOut(setTimeout(()=>{
            document.getElementById("handleMove").click();
        },(-200*speed_+1200)))
    }

    //initial an array with all 0
    const InitialArray =()=>{
        let array = [];
        for (let i = 0; i<10; i++){
            let arrary_ = [];
            arrary_.length = 20;
            arrary_.fill(0);
            array.push(arrary_)
        }

        return array;
    }


    //initial snake moving direction
    const SetUpDirection =(row, col)=>{
        let direction1=0, direction2=0, left_right=0, up_down=0;
        //let 0=left, 1=up, 2=right, 3=down
        let left_=col-10, right_=10-col, up_=row-5, down_=5-row
        if (left_ - right_ >=0){
            direction1 = 0;
            left_right = left_ - right_;
        }else{
            direction1 = 2;
            left_right = right_ - left_;
        }

        if (up_ - down_ >=0){
            direction2 = 1;
            up_down = up_ - down_;
        }else{
            direction2 = 3;
            up_down = down_ - up_;
        }

        if (left_right - up_down >=0){
            dispatch(changeDirection({direction:direction1}))
        }else{
            dispatch(changeDirection({direction:direction2}))
        }
    }

    const handleMove = ()=>{

        let SnakeHeadNextRow, SnakeHeadNextCol;
        if (direction === 0){
            console.log("move left")
            SnakeHeadNextRow = Snake[0].row;
            SnakeHeadNextCol = Snake[0].col;
            SnakeHeadNextCol--;
        }else if (direction === 1){
            console.log("move up")
            SnakeHeadNextRow = Snake[0].row;
            SnakeHeadNextCol = Snake[0].col;
            SnakeHeadNextRow--;
        }else if (direction === 2){
            console.log("move right")
            SnakeHeadNextRow = Snake[0].row;
            SnakeHeadNextCol = Snake[0].col;
            SnakeHeadNextCol++;
        }else if (direction === 3){
            console.log("move down")
            SnakeHeadNextRow = Snake[0].row;
            SnakeHeadNextCol = Snake[0].col;
            SnakeHeadNextRow++;
        }

        let canvas = document.getElementById("SnakeGame");
        let context = canvas.getContext("2d");
        

        let GameContinue = true; 
        //case1: hit wall
        if(SnakeHeadNextRow<0 || SnakeHeadNextRow>=Array.length || SnakeHeadNextCol<0 || SnakeHeadNextCol>= Array[0].length){
            console.log("hit wall")
            context.drawImage(imageMap[3],canvas.width / 2 - 225,canvas.height / 2 - 150,450,300);
            GameContinue = false;
        }
        //case2: hit body
        else if (Array[SnakeHeadNextRow][SnakeHeadNextCol] === 1){
            console.log("hit body")
            context.drawImage(imageMap[3],canvas.width / 2 - 225,canvas.height / 2 - 150,450,300);
            GameContinue = false;
        }
        //case3: move to empty place
        else if(Array[SnakeHeadNextRow][SnakeHeadNextCol] === 0){
            //clear old tail
            context.drawImage(imageMap[0], Snake[Snake.length-1].col* dw+1, Snake[Snake.length-1].row* dw+1, dw-2, dw-2)
            //draw a new head 
            context.drawImage(imageMap[1], SnakeHeadNextCol* dw+1, SnakeHeadNextRow* dw+1, dw-2, dw-2);

            dispatch(moveToEmptyPlace({head:{row:SnakeHeadNextRow, col:SnakeHeadNextCol}}))
        }
        //case4: eat apple 
        else if (Array[SnakeHeadNextRow][SnakeHeadNextCol] === 2){
            //replace apple as the new head 
            context.drawImage(imageMap[1], SnakeHeadNextCol* dw+1, SnakeHeadNextRow* dw+1, dw-2, dw-2);

            //create an empty collection
            let array=[];
            //array=[[row,col][row,col],....]
            for (let i=0; i<Array.length; i++){
                for(let j=0; j<Array[0].length; j++){
                    if(Array[i][j]===0){
                        let t = [i,j];
                        array.push(t)
                    }
                }
            }
            //if this is the last apple, game finishd
            if (array.length===0){
                console.log("win")
                context.drawImage(imageMap[4],canvas.width / 2 - 225,canvas.height / 2 - 150,450,300);
                GameContinue = false;
            }
            //else, keep play
            else{
                 let index = Math.floor(Math.random() * array.length);
                let [appleRow,appleCol] = array[index]
                context.drawImage(imageMap[2], appleCol* dw+1, appleRow* dw+1, dw-2, dw-2);
                dispatch(moveToApple({headRow:SnakeHeadNextRow,headCol:SnakeHeadNextCol,appleRow:appleRow, appleCol:appleCol}));
            }
           
            //increase points 
            let point = points;
            point += 10;
            setPoints(point);
        }

        if (GameContinue === true){
            setGameTimeOut(setTimeout(()=>{
                document.getElementById("handleMove").click();
            },(-200*speed+1200)))
        }else{
            clearTimeout(GmaeTimeOut);
        }
        // 1 2 3 4 5
        // 1000 500 300 250 200
        // 1000 800 600 400 200
        
    }

    const changeSnakeDirection=(e)=>{
    // 0=left, 1=up, 2=right, 3=down
        let direction_ = direction;
        //turn left
        if (e.key === "a"){
            if (direction_-1 <0){
                direction_ = 3
            }else{
                direction_--;
            }
            dispatch(changeDirection({direction:direction_}));
        }
        //turn right
        else if (e.key === "d"){
            if (direction_+1 >3){
                direction_ = 0
            }else{
                direction_++;
            }
            dispatch(changeDirection({direction:direction_}));
        }
    }
    
    return (
    <div className="SnakePage">
        <div className="Snake">
            <h3>Snake</h3>
            <button onClick={handleMove} id="handleMove" style={{ display: "none" }}> handleMove</button>
            <div className="SnakeMiddle">
                <select id="Select" className="form-select form-select-lg" 
                    style={{width:"135px",color:"blue", backgroundColor:"#e5edfa", borderColor:"#458ffd"}}>
                    <option value={1}> Speed 1 </option>
                    <option value={2}> Speed 2 </option>
                    <option value={3}> Speed 3 </option>
                    <option value={4}> Speed 4 </option>
                    <option value={5}> Speed 5 </option>
                </select>

                <p>point: {points}</p>

                <button  onClick={StartGame} className="btn btn-outline-primary btn-lg">Start Game</button>
            </div>

            <div className="SnakeCanvas">
            <canvas id="SnakeGame" 
                width={700} height={350}
                 style={{ border: "2px solid"}}
                 tabIndex="0"
                 onKeyDown={changeSnakeDirection}> A drawing of something </canvas>
            </div>
        </div>
        </div>
  );
}
