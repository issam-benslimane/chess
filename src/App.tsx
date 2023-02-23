import React, { useState } from "react";
import ChessBoard from "./components/Board";
import Home from "./components/Home";
import { PieceColor, Player } from "./models/types";

function App() {
  const [status, setStatus] = useState("preparing");
  const [current, setCurrent] = useState<PieceColor>("white");
  const [players, setPlayers] = useState<Record<PieceColor, Player>>({
    white: "humain",
    black: "computer",
  });

  const startGame = () => {
    setStatus("playing");
  };

  const gameOver = () => {
    setStatus("game-over");
  };

  function switchTurn() {
    setCurrent(current === "white" ? "black" : "white");
  }

  return (
    <div className="bg-neutral-800 h-screen grid place-items-center">
      {status === "preparing" && (
        <Home players={players} startGame={startGame} />
      )}
      <ChessBoard status={status} switchTurn={switchTurn} current={current} />
    </div>
  );
}

export default App;
