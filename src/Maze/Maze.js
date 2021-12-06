import React, { useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { selectMaze, handleInit, handleMove } from "./MazeSlice";
import * as images from "./images";

export default function Maze() {
  const dispatch = useDispatch();
  const [StartGameState, setStartGameState] = useState(false);
  const [ArrayInit, Array] = useSelector(selectMaze);
  const [peopleX, setPeopleX] = useState(null);
  const [peopleY, setPeopleY] = useState(null);
  const [dw, setDw] = useState(null);


  //CaseBlank: move to an empty place  
  const ClearAndDrawInCaseB = (context, X, Y, EndX,EndY,diffX, diffY,
    moveX,moveY,moveNX,moveNY,img1,img2,img3,img4)=>{
    setStartGameState(false)
    dispatch(handleMove({ px: moveX, py: moveY, nx: moveNX, ny: moveNY }));
    let imgs = [img1, img2, img3, img4];
    
    for (let i=0; i<4; i++){
      setTimeout(() => {
        context.clearRect(X * dw + diffX*i, Y * dw + diffY*i, dw, dw);
        context.drawImage(imgs[i], X * dw + diffX*(i+1), Y * dw + diffY*(i+1), dw, dw);
      }, 100*i);
    }
   
    //display X Y location
    setTimeout(() => {
      setStartGameState(true)
      setPeopleX(EndX)
      setPeopleY(EndY)
     }, 400); 
  }
   //CaseEnd: move to end place 
  const ClearAndDrawInCaseE = (context, X, Y, EndX,EndY, diffX, diffY,
    moveX,moveY,moveNX,moveNY,img1,img2,img3,img4,canvasW,canvasH)=>{
    setStartGameState(false)
    dispatch(handleMove({ px: moveX, py: moveY, nx: moveNX, ny: moveNY }));
    let imgs = [img1, img2, img3, img4];
    
    for (let i=0; i<4; i++){
      setTimeout(() => {
        context.clearRect(X * dw + diffX*i, Y * dw + diffY*i, dw, dw);
        context.drawImage(imgs[i], X * dw + diffX*(i+1), Y * dw + diffY*(i+1), dw, dw);
        context.drawImage(images.imgEnd, EndX* dw, EndY* dw, dw, dw);
      }, 100*i);
    }

    setTimeout(() => {
      context.clearRect(EndX * dw , EndY * dw , dw, dw);
      context.drawImage(images.imgEnd, EndX* dw, EndY* dw, dw, dw);
      context.drawImage(imgs[3], EndX * dw , EndY * dw, dw, dw);
      context.drawImage(images.imgWin,canvasW / 2 - 150,canvasH / 2 - 100,300,200);
    }, 400);
  }

  const RunGame = (e) => {
    if (StartGameState === true) {
      let canvas = document.getElementById("MazeCanvas");
      let context = canvas.getContext("2d");
      const canvasInfo = canvas.getBoundingClientRect();
      let x = Math.floor((e.clientX - canvasInfo.left) / dw); //column
      let y = Math.floor((e.clientY - canvasInfo.top) / dw); //row
      
      if (Array[y][x] === "b") {
        if (x - 1 >= 0 ? Array[y][x - 1] === "p" : false) {
          //moveRight
          ClearAndDrawInCaseB(context, x - 1, y ,x,y,dw/4, 0, y,x - 1,y,x,images.Right001,images.Right002,images.Right003,images.Right004)
        } else if (x + 1 < Array[0].length ? Array[y][x + 1] === "p" : false) {
          //moveLeft
          ClearAndDrawInCaseB(context, x + 1, y ,x,y, -dw/4, 0, y,x + 1,y,x,images.Left001,images.Left002,images.Left003,images.Left004)
        } else if (y - 1 >= 0 ? Array[y - 1][x] === "p" : false) {
          //moveDown
          ClearAndDrawInCaseB(context, x, y-1, x,y, 0,dw/4, y-1,x,y,x,images.Right001,images.Right002,images.Right003,images.Right004)
        } else if (y + 1 < Array.length ? Array[y + 1][x] === "p" : false) {
          //moveUp
          ClearAndDrawInCaseB(context, x, y+1, x,y, 0,-dw/4, y+1,x,y,x,images.Left001,images.Left002,images.Left003,images.Left004)
        }
      } else if (Array[y][x] === "e") {
        if (x - 1 >= 0 ? Array[y][x - 1] === "p" : false) {
          ClearAndDrawInCaseE(context, x - 1, y ,x,y,dw/4, 0, y,x - 1,y,x,
            images.Right001,images.Right002,images.Right003,images.Right004,canvas.width,canvas.height)

        } else if (x + 1 < Array[0].length ? Array[y][x + 1] === "p" : false) {
          ClearAndDrawInCaseE(context, x + 1, y ,x,y, -dw/4, 0, y,x + 1,y,x,
            images.Right001,images.Right002,images.Right003,images.Right004,canvas.width,canvas.height)
  
        } else if (y - 1 >= 0 ? Array[y - 1][x] === "p" : false) {
          ClearAndDrawInCaseE(context, x, y-1, x,y, 0,dw/4, y-1,x,y,x,
            images.Right001,images.Right002,images.Right003,images.Right004,canvas.width,canvas.height)

        } else if (y + 1 < Array.length ? Array[y + 1][x] === "p" : false) {
          ClearAndDrawInCaseE(context, x, y+1, x,y, 0,-dw/4, y+1,x,y,x,
            images.Right001,images.Right002,images.Right003,images.Right004,canvas.width,canvas.height)
        }
      }
    }
  };

  const StartGame = () => {
    let size = {Easy: 70, Normal: 50, Hard:40}

    let index = Math.floor(Math.random() * 3);
    let myselect = document.getElementById("Select");
    let selectIndex = myselect.selectedIndex;

    let difficulty = myselect.options[selectIndex].value;
    let size_ = size[difficulty]
    setDw(size_)
    dispatch(handleInit({ difficulty: difficulty, index: index }));

    let canvas = document.getElementById("MazeCanvas");
    let context = canvas.getContext("2d");
    canvas.width = ArrayInit[difficulty][index][0].length * size_;
    canvas.height = ArrayInit[difficulty][index].length * size_;
    //context.clearRect(0, 0, canvas.width, canvas.height);

    for (let i = 0; i < ArrayInit[difficulty][index].length; i++) {
      for (let j = 0; j < ArrayInit[difficulty][index][0].length; j++) {
        if (ArrayInit[difficulty][index][i][j] === "w") {
          context.drawImage(images.imgWall, j * size_, i * size_, size_, size_);
        } else if (ArrayInit[difficulty][index][i][j] === "p") {
          setPeopleX(j);
          setPeopleY(i);
          context.drawImage(images.imgPeople, j * size_, i * size_, size_, size_);
        } else if (ArrayInit[difficulty][index][i][j] === "e") {
          context.drawImage(images.imgEnd, j * size_, i * size_, size_, size_);
        }
      }
    }
    
    setTimeout(()=>{
      setStartGameState(true);
    },500)
  };


  return (
    <div>
      <h1> Maze </h1>
      <p>X:{peopleX} <br/> Y:{peopleY}</p>
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
