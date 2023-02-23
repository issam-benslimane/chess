import React from "react";
import { PieceColor, Player } from "../models/types";
import Options from "./Options";

type Props = {
  winner: PieceColor;
  startGame: () => void;
  restart: () => void;
};

const Gameover = ({ startGame, winner, restart }: Props) => {
  return (
    <div className="z-50 absolute bg-neutral-100 rounded-md p-5 min-w-[25rem]">
      <h2 className="text-2xl font-medium">And the winner is: {winner}.</h2>

      <button
        className="mt-5 w-full bg-neutral-800 text-white text-lg font-medium p-2 rounded-md hover:brightness-125 transition-all"
        onClick={restart}
      >
        Play Again
      </button>
    </div>
  );
};

export default Gameover;
