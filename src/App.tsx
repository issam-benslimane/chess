import React, { useState } from "react";
import ChessBoard from "./components/Board";
import { PieceColor } from "./core/types";

function App() {
  const [current, setCurrent] = useState<PieceColor>("white");
  function switchTurn() {
    setCurrent(current === "white" ? "black" : "white");
  }

  return (
    <div className="bg-neutral-800 h-screen grid place-items-center">
      <ChessBoard switchTurn={switchTurn} current={current} />
    </div>
  );
}

export default App;
