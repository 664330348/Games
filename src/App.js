import React from 'react';
import { Outlet, Link } from "react-router-dom";
import './App.scss';

export default function App() {
  return (
    <div className="App">
      <h1 className="Title">Game Collection</h1>
      <nav 
        style={{
          fontSize:"18px",
          borderBottom: "solid 1px",
          paddingBottom: "1rem",
        }}
      >
        <Link to="/">Home</Link> |{" "}
        <Link to="/TicTacToe">TicTacToe</Link> |{" "}
        <Link to="/Maze">Maze</Link>|{" "}
        <Link to="/Canvas">Canvas</Link>|{" "}
        <Link to="/HuarongRoad">Huarong Road</Link>|{" "}
        <Link to="/Minesweeper">Minesweeper</Link>|{" "}
        <Link to="/Snake">Snake</Link>
      </nav>
      <Outlet />
    </div>
  );
}
