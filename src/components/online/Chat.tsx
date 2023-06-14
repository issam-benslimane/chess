import React, { useCallback, useEffect, useState } from "react";
import { socket } from "../../socket";
import { useParams } from "react-router-dom";
import { Player } from "../../types";

type Props = {
  player: Player;
};

type Message = { body: string; isOpponent: boolean };

const Chat = ({ player }: Props) => {
  const [messages, setMessages] = useState<Message[]>([]);
  const [text, setText] = useState("");
  const gameId = useParams().gameId as string;
  const messagesRef = useCallback(
    (node: HTMLDivElement) => {
      if (!node) return;
      node.scrollTo(0, node.scrollHeight);
    },
    [messages]
  );

  useEffect(() => {
    function onMessage(data: Message) {
      setMessages(messages.concat(data));
    }
    socket.on("message", onMessage);

    return () => {
      socket.off("message", onMessage);
    };
  }, [messages]);

  function handleSubmit(ev: React.FormEvent<HTMLFormElement>) {
    ev.preventDefault();
    setMessages(messages.concat({ body: text, isOpponent: false }));
    socket.emit("message", gameId, player.color, text);
    setText("");
  }

  return (
    <div className="chat">
      <h2>Chat</h2>
      <div ref={messagesRef} className="messages">
        {messages.map(({ body, isOpponent }, key) => (
          <p key={key}>
            <span>{isOpponent ? "Opponent" : "You"}:</span>
            <span>{body}</span>
          </p>
        ))}
      </div>
      <form onSubmit={handleSubmit}>
        <input
          type="text"
          placeholder="Send a message..."
          value={text}
          onChange={(ev) => setText(ev.target.value)}
        />
      </form>
    </div>
  );
};

export default Chat;
