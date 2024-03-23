import React from "react";
import Image from "next/image";
import tryagainlogo from "./assets/img/try-again.gif";

const GameOverlay = ({
  OnRestart,
  board,
}: {
  OnRestart: () => void;
  board: any;
}) => {
  // if (board.hasWon()) {
  if (true) {
    return (
      <div
        style={{
          position: "absolute",
          backgroundSize: "contain",
          left: "0",
          right: "0",
          top: "0",
          bottom: "0",
          backgroundImage: "url(./assets/img/2048.gif)",
        }}
      ></div>
    );
  } else if (board.hasLost()) {
    return (
      <div className="gameOver" onClick={OnRestart}>
        <Image
          src={tryagainlogo}
          alt="tryagainlogo"
          className="w-full h-full cursor-pointer"
        />
      </div>
    );
  }
  return null;
};

export default GameOverlay;
