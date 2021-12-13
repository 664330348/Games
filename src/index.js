import React from "react";
import ReactDOM from "react-dom";
import { BrowserRouter, Routes, Route} from "react-router-dom";
import "./index.css";
import App from "./App";
import { store } from "./app/store";
import { Provider } from "react-redux";
import * as serviceWorker from "./serviceWorker";

import TTT from "./TicTacToe/TTT";
import Maze from "./Maze/Maze";
import Canvas from "./Canvas";
import HuarongRoad from "./Puzzle/Puzzle";
import Minesweeper from "./Minesweeper/Minesweeper";
import Snake from "./Snake/Snake";

import Home from "./Home";

ReactDOM.render(
  <React.StrictMode>
    <Provider store={store}>
      <BrowserRouter>
        <Routes> 
          <Route path="/" element={<App/>} >
            <Route index element={<Home/>} />
            <Route path="/TicTacToe" element={<TTT/>} />
            <Route path="/Maze" element={<Maze/>} />
            <Route path="/Canvas" element={<Canvas/>} />
            <Route path="/HuarongRoad" element={<HuarongRoad/>} />
            <Route path="/Minesweeper" element={<Minesweeper/>} />
            <Route path="/Snake" element={<Snake/>} />
            {/* The "*" has special meaning here. It will match only when no other routes do. */}
            <Route path="*" element={  
              <main style={{ padding: "1rem" }}>
                <p>There's nothing here!</p>
              </main>}
            />
          </Route>
        </Routes>
      </BrowserRouter>
    </Provider>
  </React.StrictMode>,
  document.getElementById("root")
);

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.register();
