import { Server } from "socket.io";
import { PieceColor, Positions } from "../../core/types";

const io = new Server(8080, { cors: { origin: "http://localhost:3000" } });

const games = new Map<
  string,
  {
    inviter: { id: string; color: PieceColor };
    opponent?: { id: string; color: PieceColor };
  }
>();

io.on("connect", (socket) => {
  socket.on("link_id", (color: PieceColor) => {
    const randomId = generateId();
    socket.emit("link_id", randomId);
    games.set(randomId, { inviter: { id: socket.id, color } });
  });

  socket.on("join_game", (gameId: string) => {
    const game = games.get(gameId);
    if (!game) socket.emit("invalid_id");
    else if (socket.id === game.inviter.id) return;
    else if (game.opponent) socket.emit("user_playing");
    else {
      const color = game.inviter.color === "white" ? "black" : "white";
      Object.assign(game, { opponent: { id: socket.id, color } });
      games.set(gameId, game);
      socket.to(game.inviter.id).emit("join_game", gameId);
    }
  });

  socket.on("start_game", (gameId: string) => {
    const game = games.get(gameId);
    if (!game) return;
    if (!game.opponent) return;
    socket.emit(
      "start_game",
      game.inviter.id === socket.id ? game.inviter : game.opponent
    );
  });

  socket.on(
    "move_piece",
    (
      gameId: string,
      turn: PieceColor,
      origin: Positions,
      target: Positions
    ) => {
      const game = games.get(gameId);
      if (!game) return;
      if (!game.opponent) return;
      const opponent =
        game.opponent.color === turn ? game.inviter : game.opponent;
      socket.to(opponent.id).emit("move_piece", origin, target);
    }
  );

  socket.on("message", (gameId: string, color: PieceColor, body: string) => {
    const game = games.get(gameId);
    if (!game) return;
    if (!game.opponent) return;
    const opponent =
      game.opponent.color === color ? game.inviter : game.opponent;
    socket.to(opponent.id).emit("message", { body, isOpponent: true });
  });
});

function generateId() {
  let id = "";
  const LETTERS = "azertyuiopqsdfghjklmAZERTYUIOPQSDFGHJKLMWXCVBN";
  const NUMBERS = "123456789";
  for (let i = 0; i < 4; i++) {
    const current = Math.random() < 0.5 ? LETTERS : NUMBERS;
    id += current[Math.floor(Math.random() * current.length)];
  }
  return id;
}
