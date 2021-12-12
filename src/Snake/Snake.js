import React, {useState} from "react";
import { useSelector, useDispatch } from "react-redux";
import { selectSnake, handleInit, changeDirection, moveToEmptyPlace} from "./SnakeSlice";

import "./Snake.scss";
import * as images from "./images";

export default function Snake() {
    const dispatch = useDispatch();
    const [Array, Snake, difficulty, direction] = useSelector(selectSnake);

    const dw=35; 
    const imageMap = [images.imgblue, images.imgblack, images.imgred,]

    const StartGame =()=>{
        let array = InitialArray();
        //AddStartLocation(array);
        let row = Math.floor(Math.random() * 10);
        let col = Math.floor(Math.random() * 20);
        array[row][col]=1;

        AddAppleLocation(array);
        SetUpDirection(row,col)

        let myselect = document.getElementById("Select");
        let selectIndex = myselect.selectedIndex;
        let difficulty_ = Number(myselect.options[selectIndex].value);
        //Initial store data
        dispatch(handleInit({array:array, snake:[{row:row, col:col}], difficulty:difficulty_}))
        

        let canvas = document.getElementById("SnakeGame");
        let context = canvas.getContext("2d");
        context.clearRect(0,0, canvas.width, canvas.height)
        for (let i=0; i<10; i++){
            for(let j=0; j<20; j++){
                context.drawImage(imageMap[array[i][j]], j * dw+1, i * dw+1, dw-2, dw-2);
            }
        }

        setTimeout(()=>{
            document.getElementById("handleMonve").click();
        },1000)
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
    //initial snake location
    /* const AddStartLocation =(array)=>{
        let row = Math.floor(Math.random() * 10);
        let col = Math.floor(Math.random() * 20);

        array[row][col]=1;
    }  */ 
    // add a apple location
    const AddAppleLocation =(array)=>{
        let stop = false;
       
        while (!stop){
            let row = Math.floor(Math.random() * 10);
            let col = Math.floor(Math.random() * 20);

            if(array[row][col]===0){
                array[row][col]=2;
                stop=true;
            }
        }
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
        

        //case1: hit wall
        if(SnakeHeadNextRow<0 || SnakeHeadNextRow>=Array.length || SnakeHeadNextCol<0 || SnakeHeadNextCol>= Array[0].length){
            console.log("hit wall")
        }
        //case1: move to empty place
        else if(Array[SnakeHeadNextRow][SnakeHeadNextCol] === 0){
            context.drawImage(imageMap[0], Snake[Snake.length-1].col* dw+1, Snake[Snake.length-1].row* dw+1, dw-2, dw-2)
            context.drawImage(imageMap[1], SnakeHeadNextCol* dw+1, SnakeHeadNextRow* dw+1, dw-2, dw-2);

            dispatch(moveToEmptyPlace({head:{row:SnakeHeadNextRow, col:SnakeHeadNextCol}}))
        }

        canvas.focus();
        setTimeout(()=>{
            document.getElementById("handleMonve").click();
        },1000)
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
            <button onClick={handleMove} id="handleMonve" style={{ display: "none" }}> handleMonve</button>
            <div className="SnakeMiddle">
                <select id="Select" className="form-select form-select-lg" 
                    style={{width:"135px",color:"blue", backgroundColor:"#e5edfa", borderColor:"#458ffd"}}>
                    <option value={1}> Easy </option>
                    <option value={2}> Normal </option>
                    <option value={3}> Hard </option>
                </select>

                <p>point</p>

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
