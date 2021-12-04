import React, { useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { selectMaze, handleInit, handleMove } from "./MazeSlice";
import "./images";

import imgPeople_ from "./images/people.jpg";
import imgEnd_ from "./images/end.png";
import imgWall_ from "./images/wall.png";
import win_ from "./images/Win.png";
import Right001_ from "./images/Right001.png";
import Right002_ from "./images/Right002.png";
import Right003_ from "./images/Right003.png";
import Right004_ from "./images/Right004.png";
import Left001_ from "./images/Left001.png";
import Left002_ from "./images/Left002.png";
import Left003_ from "./images/Left003.png";
import Left004_ from "./images/Left004.png";

const Right001 = new Image();
Right001.src = Right001_;
const Right002 = new Image();
Right002.src = Right002_;
const Right003 = new Image();
Right003.src = Right003_;
const Right004 = new Image();
Right004.src = Right004_;


const Left001 = new Image();
Left001.src = Left001_;
const Left002 = new Image();
Left002.src = Left002_;
const Left003 = new Image();
Left003.src = Left003_;
const Left004 = new Image();
Left004.src = Left004_;

const imgPeople = new Image();
imgPeople.src = imgPeople_;
const imgEnd = new Image();
imgEnd.src = imgEnd_;
const imgWall = new Image();
imgWall.src = imgWall_;
const imgWin = new Image();
imgWin.src = win_;

export default function Maze() {
  const dispatch = useDispatch();
  const [StartGameState, setStartGameState] = useState(false);
  const [ArrayInit, Array] = useSelector(selectMaze);
  const [dw] = [80];


  const ClearAndDraw = (context,clearX,clearY,drawX,drawY,moveX,moveY,moveNX,moveNY,direction,cases,img1,img2,img3,img4,canvasW, canvasH
  ) => {
    setStartGameState(false)
    dispatch(handleMove({ px: moveX, py: moveY, nx: moveNX, ny: moveNY }));
    let imgs = [img1, img2, img3, img4];
    let diff = dw / 4;
    if (direction ? direction === "right" : false) {
      for (let i=0; i<4; i++){
        setTimeout(() => {
          context.clearRect(clearX * dw + diff*i, clearY * dw, dw, dw);
          context.drawImage(imgs[i], clearX * dw + diff*(i+1), clearY * dw, dw, dw);
        }, 100*i);
      }
    }else if (direction ? direction === "left" : false) {
      for (let i=0; i<4; i++){
        setTimeout(() => {
          context.clearRect(clearX * dw - diff*i, clearY * dw, dw, dw);
          context.drawImage(imgs[i], clearX * dw - diff*(i+1), clearY * dw, dw, dw);
        }, 100*i);
      }
    }
    else {
      context.clearRect(clearX * dw, clearY * dw, dw, dw);
      context.drawImage(imgPeople, drawX * dw, drawY * dw, dw, dw);
      dispatch(handleMove({ px: moveX, py: moveY, nx: moveNX, ny: moveNY }));
    }

    /* if (cases ==="b"){
       setTimeout(() => {
     setStartGameState(true)
    }, 500); */
    if(cases ==="e"){
      setTimeout(() => {
        context.drawImage(imgWin,canvasW / 2 - 150,canvasH / 2 - 100,300,200);
       }, 400);
    }else{
      setTimeout(() => {
        setStartGameState(true)
       }, 400); 
    }
   
  };


  const RunGame = (e) => {
    if (StartGameState === true) {
      let canvas = document.getElementById("MazeCanvas");
      let context = canvas.getContext("2d");
      const canvasInfo = canvas.getBoundingClientRect();

      let x = Math.floor((e.clientX - canvasInfo.left) / dw);
      let y = Math.floor((e.clientY - canvasInfo.top) / dw);

      if (Array[y][x] === "b") {
        if (x - 1 >= 0 ? Array[y][x - 1] === "p" : false) {
          //moveRight
          ClearAndDraw(context,x - 1,y,x,y,y,x - 1,y,x,"right","b",Right001,Right002,Right003,Right004,
          );
        } else if (x + 1 < Array[0].length ? Array[y][x + 1] === "p" : false) {
          //moveLeft
          ClearAndDraw(context, x + 1, y, x, y, y, x + 1, y, x,"left","b",Left001,Left002,Left003,Left004,);
        } else if (y - 1 >= 0 ? Array[y - 1][x] === "p" : false) {
          //moveDown
          ClearAndDraw(context, x, y - 1, x, y, y - 1, x, y, x);
        } else if (y + 1 < Array.length ? Array[y + 1][x] === "p" : false) {
          //moveUp
          ClearAndDraw(context, x, y + 1, x, y, y + 1, x, y, x);
        }
      } else if (Array[y][x] === "e") {
        if (x - 1 >= 0 ? Array[y][x - 1] === "p" : false) {
          ClearAndDraw(context, x - 1, y, x, y, y, x - 1, y, x,"right","e",Right001,Right002,Right003,Right004,canvas.width,canvas.height);
        
        } else if (x + 1 < Array[0].length ? Array[y][x + 1] === "p" : false) {
          ClearAndDraw(context, x + 1, y, x, y, y, x + 1, y, x,"left","e",Left001,Left002,Left003,Left004,canvas.width,canvas.height);
  
        } else if (y - 1 >= 0 ? Array[y - 1][x] === "p" : false) {
          ClearAndDraw(context, x, y - 1, x, y, y - 1, x, y, x);
       
        } else if (y + 1 < Array.length ? Array[y + 1][x] === "p" : false) {
          ClearAndDraw(context, x, y + 1, x, y, y + 1, x, y, x);

        }
      }
    }
  };

  const StartGame = () => {
    let index = Math.floor(Math.random() * 3);
    let myselect = document.getElementById("Select");
    let selectIndex = myselect.selectedIndex;

    let difficulty = myselect.options[selectIndex].value;
    dispatch(handleInit({ difficulty: difficulty, index: index }));

    let canvas = document.getElementById("MazeCanvas");
    let context = canvas.getContext("2d");
    canvas.width = ArrayInit[difficulty][index][0].length * dw;
    canvas.height = ArrayInit[difficulty][index].length * dw;
    //context.clearRect(0, 0, canvas.width, canvas.height);

    let px ,py; 

    for (let i = 0; i < ArrayInit[difficulty][index].length; i++) {
      for (let j = 0; j < ArrayInit[difficulty][index][0].length; j++) {
        if (ArrayInit[difficulty][index][i][j] === "w") {
          context.drawImage(imgWall, j * dw, i * dw, dw, dw);
        } else if (ArrayInit[difficulty][index][i][j] === "p") {
          py=i; px=j;
          context.drawImage(imgPeople, j * dw, i * dw, dw, dw);
        } else if (ArrayInit[difficulty][index][i][j] === "e") {
          context.drawImage(imgEnd, j * dw, i * dw, dw, dw);
        }
      }
    }

    setStartGameState(true);
  };


  return (
    <div>
      <h1> Maze </h1>
      <select id="Select">
        <option value="Easy"> Easy </option>
        <option value="Normal"> Normal </option>
        <option value="Hard"> Hard </option>
      </select>

      <button onClick={StartGame}>StartGame</button>
      <br />
      <canvas
        id="MazeCanvas"
        tabIndex="0"
        width="100"
        height="100"
        style={{ border: "2px solid" }}
        onClick={RunGame}
      ></canvas>
    </div>
  );
}
