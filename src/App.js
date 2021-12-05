import React from 'react';
import { Outlet, Link } from "react-router-dom";
import './App.css';

export default function App() {
  return (
    <div>
      <h1>Home page</h1>
      <nav
        style={{
          borderBottom: "solid 1px",
          paddingBottom: "1rem"
        }}
      >
        <Link to="/TicTacToe">TicTacToe</Link> |{" "}
        <Link to="/Maze">Maze</Link>|{" "}
        <Link to="/Canvas">Canvas</Link>
      </nav>
      <Outlet />
    </div>
  );
}
