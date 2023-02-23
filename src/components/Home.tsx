import React from "react";
import { PieceColor, Player } from "../models/types";
import Options from "./Options";

type Props = {
  players: Record<PieceColor, Player>;
  startGame: () => void;
};

const Home = ({ players, startGame }: Props) => {
  return (
    <div className="z-50 absolute bg-neutral-100 rounded-md p-5 min-w-[25rem]">
      <h1 className="text-2xl font-medium">Welcome friend.</h1>
      {Object.entries(players).map(([color, player], i) => (
        <Options key={i} color={color as PieceColor} player={player} />
      ))}
      <button
        className="mt-5 w-full bg-neutral-800 text-white text-lg font-medium p-2 rounded-md hover:brightness-125 transition-all"
        onClick={startGame}
      >
        Start
      </button>
    </div>
  );
};

export default Home;
