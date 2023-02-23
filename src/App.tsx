import React, { useState } from "react";
import ChessBoard from "./components/Board";
import Gameover from "./components/GameOver";
import Home from "./components/Home";
import { PieceColor, Player } from "./models/types";

function App() {
  const [status, setStatus] = useState("preparing");
  const [current, setCurrent] = useState<PieceColor>("white");
  const [players, setPlayers] = useState<Record<PieceColor, Player>>({
    white: "humain",
    black: "humain",
  });

  const startGame = () => {
    setStatus("playing");
  };

  const restart = () => {
    setStatus("preparing");
    setCurrent("white");
  };

  const gameOver = () => {
    setStatus("gameover");
  };

  function switchTurn() {
    setCurrent(current === "white" ? "black" : "white");
  }

  return (
    <div className="bg-neutral-800 h-screen grid place-items-center">
      {status === "preparing" && (
        <Home players={players} startGame={startGame} />
      )}
      {status === "gameover" && (
        <Gameover winner={current} startGame={startGame} restart={restart} />
      )}
      {status === "playing" && (
        <ChessBoard
          status={status}
          switchTurn={switchTurn}
          current={current}
          gameOver={gameOver}
        />
      )}
    </div>
  );
}

export default App;
