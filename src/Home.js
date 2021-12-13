import React from 'react';
import {Link } from "react-router-dom";
import * as images from "./images/images";
import "./Home.scss";

const Collection = [
    {id:0, Title:"TicTacToe",Content:"Two players who take turns marking the spaces in a 3x3 grid with X or O.",link:"/TicTacToe"},
    {id:1, Title:"Maze",Content:"A maze is a path or collection of paths, typically from an entrance to a goal.",link:"/Maze"},
    {id:2, Title:"Huarong Road",Content:"The player is not allowed to remove blocks, and only slide blocks horizontally and vertically.",link:"/HuarongRoad"},
    {id:3, Title:"Minesweeper",Content:"The objective of the game is to clear a rectangular board containing hidden bombs without detonating any of them.",link:"/Minesweeper"},
    {id:4, Title:"Snake",Content:"The player maneuvers a line that grows in length, with the line itself being a primary obstacle.",link:"/Snake"},
]



export default function Home (){
    const imagesMap =[images.imgTicTacToe, images.imgMaze, images.imgPuzzle, images.imgMinesweeper, images.imgSnake]
    
    const Display = Collection.map(each =>(
        <div className="card" key={each.id} style={{width: "18rem", minWidth:"300px",marginTop:"25px"}}>
            <img src={imagesMap[each.id]} className="card-img-top" alt="..." style={{width: "300",height:"300px"}}/>
            <div className="card-body">
                <h5 className="card-title">{each.Title}</h5>
                <p className="card-text" style={{width:"250px"}}>{each.Content}</p>
            </div>
            <div className="card-body">
                <Link className="card-link" to={each.link} style={{fontSize:"18px"}}>{each.Title}</Link>
            </div>
        </div>
    ))

    return (
    <div className="Homepage">
        {Display}
    </div>
    )
}