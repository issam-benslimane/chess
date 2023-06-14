import React, { useEffect, useState } from "react";
import ChessBoard from "./Board";
import { Modal, ModalContent, ToggleButton } from "./Modal";
import { BiLink } from "react-icons/bi";
import { FaCheck, FaChessKing } from "react-icons/fa";
import { GiPerspectiveDiceSixFacesRandom } from "react-icons/gi";
import { FcInvite } from "react-icons/fc";
import { FaHandshake } from "react-icons/fa";
import { IoCopy } from "react-icons/io5";
import { socket } from "../socket";
import clsx from "clsx";
import copy from "copy-to-clipboard";
import { PieceColor } from "../core/types";
import { useNavigate } from "react-router-dom";

const Home = () => {
  const [isConnected, setIsConnected] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    function onConnect() {
      setIsConnected(true);
    }

    function onDisconnect() {
      setIsConnected(false);
    }

    function onJoinGame(gameId: string) {
      navigate(`play/online/${gameId}`);
    }

    socket.on("connect", onConnect);
    socket.on("disconnect", onDisconnect);
    socket.on("join_game", onJoinGame);

    return () => {
      socket.off("connect", onConnect);
      socket.off("disconnect", onDisconnect);
      socket.off("join_game", onJoinGame);
    };
  }, []);

  if (!isConnected) return "connecting...";

  return (
    <div className="home">
      <div className="container home__container">
        <ChessBoard gameStarted={false} />
        <div>
          <h1>
            <FaHandshake />
            Play a Friend
          </h1>
          <LinkModal />
          <MailModal />
        </div>
      </div>
    </div>
  );
};

const LinkModal = () => {
  const [selected, setSelected] = useState<PieceColor | "random">("white");
  return (
    <Modal>
      <ToggleButton className="btn btn--secondary">
        <BiLink size={25} />
        Create Challenge Link
      </ToggleButton>
      <ModalContent className="modal--link">
        <BiLink size={50} className="link-icon" />
        <h2 className="modal__title">Challenge Link</h2>
        <p className="modal__desc">Start a game with anyone</p>
        <fieldset>
          <p>
            <legend>I play as</legend>
          </p>
          <div>
            <label className={clsx(selected === "white" && "selected")}>
              <input
                type="radio"
                name="color"
                onChange={() => setSelected("white")}
              />
              <FaChessKing color="#fff" size={25} />
            </label>
            <label className={clsx(selected === "random" && "selected")}>
              <input
                type="radio"
                name="color"
                onChange={() => setSelected("random")}
              />
              <GiPerspectiveDiceSixFacesRandom color="#fff" size={25} />
            </label>
            <label className={clsx(selected === "black" && "selected")}>
              <input
                type="radio"
                name="color"
                onChange={() => setSelected("black")}
              />
              <FaChessKing color="#262421" size={25} />
            </label>
          </div>
        </fieldset>
        <CopyLink
          getColor={() =>
            selected === "random"
              ? Math.random() < 0.5
                ? "black"
                : "white"
              : selected
          }
        />
      </ModalContent>
    </Modal>
  );
};

const MailModal = () => {
  return (
    <Modal>
      <ToggleButton className="btn btn--secondary">
        <FcInvite size={25} />
        Send Email Invite
      </ToggleButton>
      <ModalContent className="modal__email">
        <FcInvite size={50} className="link-icon" />
        <h2 className="modal__title">Email Invite</h2>
        <p className="modal__desc">Invite a friend to join you.</p>
        <label>
          <input type="email" placeholder="Email address" />
        </label>
        <button className="btn btn--primary">Invite</button>
      </ModalContent>
    </Modal>
  );
};

const CopyLink = ({ getColor }: { getColor: () => PieceColor }) => {
  const [isCopied, setIsCopied] = useState(false);
  const [link, setLink] = useState<string>();

  useEffect(() => {
    function onLinkId(id: string) {
      const link = `${window.location.href}play/online/${id}`;
      setLink(link);
      copy(link);
      setIsCopied(true);
      setTimeout(() => {
        setIsCopied(false);
      }, 3000);
    }
    socket.on("link_id", onLinkId);
    return () => {
      socket.off("link_id", onLinkId);
    };
  }, []);

  async function handleClick() {
    if (isCopied) return;
    socket.emit("link_id", getColor());
  }

  return (
    <button className="btn btn--primary" onClick={handleClick}>
      {isCopied ? (
        <>
          {link}
          <FaCheck size={20} />
        </>
      ) : (
        <>
          <IoCopy size={20} />
          Copy Link
        </>
      )}
    </button>
  );
};

export default Home;
