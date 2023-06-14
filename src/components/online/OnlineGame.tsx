import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import ChessBoard from "../Board";
import { socket } from "../../socket";
import { Player } from "../../types";
import Chat from "./Chat";

const OnlineGame = () => {
  const gameId = useParams().gameId as string;
  const [player, setPlayer] = useState<Player>();

  useEffect(() => {
    function onStartGame(player: Player) {
      setPlayer(player);
    }
    socket.on("start_game", onStartGame);
    socket.emit("join_game", gameId);
    socket.emit("start_game", gameId);

    return () => {
      socket.off("start_game", onStartGame);
    };
  }, []);

  return (
    <div>
      <div className="container">
        <ChessBoard
          key={player?.color || "white"}
          gameStarted={player !== undefined}
          color={player?.color}
        />
        <div>
          {player ? (
            <Chat player={player} />
          ) : (
            <p>Waiting for your opponent...</p>
          )}
        </div>
      </div>
    </div>
  );
};

export default OnlineGame;
