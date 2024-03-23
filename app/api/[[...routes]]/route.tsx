/** @jsxImportSource frog/jsx */

import { Board, Tile } from "@/helper";
import { Button, Frog, TextInput } from "frog";
import { devtools } from "frog/dev";
// import { neynar } from 'frog/hubs'
import { handle } from "frog/next";
import { serveStatic } from "frog/serve-static";
import mainStyle from "@/app/mainStyle";
import { subStyle } from "@/app/style";
export type State = {
  board: Board;
  newGame: boolean;
};

const app = new Frog<{ State: State }>({
  assetsPath: "/",
  basePath: "/api",
  // Supply a Hub to enable frame verification.
  // hub: neynar({ apiKey: 'NEYNAR_FROG_FM' })
  initialState: {
    newGame: false,
  },
});

// Uncomment to use Edge Runtime
// export const runtime = "edge";

app.frame("/", (c) => {
  return c.res({
    image: (
      <div
        style={{
          alignItems: "center",
          background: "linear-gradient(to right, #432889, #17101F)",
          backgroundSize: "100% 100%",
          display: "flex",
          flexDirection: "column",
          flexWrap: "nowrap",
          height: "100%",
          justifyContent: "center",
          textAlign: "center",
          width: "100%",
        }}
      >
        <h2
          style={{
            fontSize: "40px",
            color: "white",
          }}
        >
          Welcome
        </h2>
        <p
          style={{
            fontSize: "30px",
            color: "white",
          }}
        >
          Start a new game
        </p>
      </div>
    ),
    intents: [<Button action="/game">Play</Button>],
  });
});

const Cell = () => {
  return <span style={mainStyle.cell_tile}></span>;
};

const TilesView = ({ tile }: { tile: Tile }) => {
  let cssArray: React.CSSProperties[] = [];
  const tileClassName = `tile${tile.value}`;
  const tileStyle = mainStyle[tileClassName] as React.CSSProperties;
  cssArray.push(tileStyle);
  cssArray.push(mainStyle.cell_tile);

  if (tile.mergedInto === null) {
    cssArray.push(subStyle[`position_${tile.row}_${tile.column}_not_isMoving`]);
  }
  if (tile.mergedInto !== null) {
    cssArray.push(mainStyle["tile_merged"]);
  }
  // let isNew = tile.isNew() === true;
  // if (isNew) {
  //   cssArray.push(mainStyle["tile_new_overlay"]);
  // }

  if (tile.hasMoved()) {
    cssArray.push(subStyle[`row_from_${tile.fromRow()}_to_${tile.toRow()}`]);
    cssArray.push(
      subStyle[`column_from_${tile.fromColumn()}_to_${tile.toColumn()}`]
    );
    cssArray.push(mainStyle["tile_merged_isMoving"]);
  }

  let mainTileStyle = cssArray.reduce(
    (acc, style) => ({ ...acc, ...style }),
    {}
  );

  return (
    <span
      style={{
        ...mainTileStyle,
        position: "absolute",
        backgroundColor: "green",
      }}
    ></span>
  );
};

// const GameOverlay = ({
//   OnRestart,
//   board,
// }: {
//   OnRestart: () => void;
//   board: Board;
// }) => {
//   if (board.hasWon()) {
//     return (
//       <div
//         style={{
//           position: "absolute",
//           backgroundSize: "cover", // Adjust to 'cover', 'contain', or custom size as needed
//           backgroundRepeat: "no-repeat",
//           display: "flex",
//           width: "450px",
//           height: "450px",
//           left: "0",
//           right: "0",
//           top: "0",
//           bottom: "0",
//           backgroundImage:
//             "url('http://res.cloudinary.com/dvx1rye1t/image/upload/c_scale,h_440,q_21/v1711146475/2024-game-assets/2048.gif')",
//         }}
//       ></div>
//     );
//   } else if (board.hasLost()) {
//     return (
//       <div
//         style={{
//           backgroundImage:
//             "url('https://res.cloudinary.com/dvx1rye1t/image/upload/c_scale,h_440,q_39/v1711146470/2024-game-assets/game-over.gif')",
//           position: "absolute",
//           backgroundSize: "cover", // Adjust to 'cover', 'contain', or custom size as needed
//           backgroundRepeat: "no-repeat",
//           display: "flex",

//           left: "0",
//           right: "0",
//           top: "0",
//           bottom: "0",
//         }}
//         onClick={OnRestart}
//       >
//         {/* <ima
//           src="https://res.cloudinary.com/dvx1rye1t/image/upload/v1711146468/2024-game-assets/try-again.gif"
//           alt="tryagainlogo"
//         /> */}
//       </div>
//     );
//   }
//   return null;
// };

app.frame("/game", (c) => {
  const { buttonValue, deriveState } = c;
  let board = new Board();
  // const state = deriveState((prevState) => {
  //   if (!prevState.newGame) {
  //     prevState.board = new Board();
  //   }

  //   if (buttonValue) {
  //     prevState.newGame = true;
  //     // if (prevState.board.hasWon()) {
  //     //   return;
  //     // }
  //     let direction: number | null = null;

  //     switch (buttonValue) {
  //       case "left":
  //         direction = 0;
  //         break;
  //       case "up":
  //         direction = 1;
  //         break;
  //       case "right":
  //         direction = 2;
  //         break;
  //       case "down":
  //         direction = 3;
  //         break;
  //     }
  //     if (direction !== null) {
  //       let boardClone: Board = Object.assign(
  //         Object.create(Object.getPrototypeOf(prevState.board)),
  //         prevState.board
  //       );
  //       let newBoard = boardClone.move(direction);
  //       prevState.board = newBoard;
  //     }
  //   }
  // });

  const cells = board.cells.map((row, rowIndex) => {
    return (
      <div
        key={rowIndex}
        style={{
          width: "450px",
          display: "flex",
          flexWrap: "wrap",
        }}
      >
        {row.map((cell, columnIndex) => {
          return <Cell key={rowIndex * board.size + columnIndex} />;
        })}
      </div>
    );
  });
  const tiles = board.tiles
    .filter((tile) => tile.value !== 0)
    .map((tile, index) => {
      return <TilesView key={index} tile={tile} />;
    });

  return c.res({
    image: (
      <div
        style={{
          alignItems: "center",
          background: "linear-gradient(to right, #432889, #17101F)",
          backgroundSize: "100% 100%",
          display: "flex",
          flexDirection: "column",
          flexWrap: "nowrap",
          height: "100%",
          justifyContent: "center",
          textAlign: "center",
          width: "100%",
        }}
      >
        <p
          style={{
            fontSize: "40px",
            color: "white",
          }}
        >
          Score: {board.score}
        </p>
        <div
          style={{
            order: 1,
            width: "450px",
            height: "450px",
            display: "flex",
            flexWrap: "wrap",
            backgroundColor: "#57407c",
            borderRadius: "7px",
            paddingTop: "8px",
            paddingLeft: "5px",
            position: "relative",
          }}
        >
          {cells}
          <div
            style={{
              width: "450px",
              display: "flex",
              left: "0",
              right: "0",
              top: "0",
              bottom: "0",
              position: "absolute",
              flexWrap: "wrap",
            }}
          >
            {tiles}
          </div>
          {/* <div
            style={{
              width: "450px",
              height: "450px",
              display: "flex",
              position: "absolute",
              flexWrap: "wrap",
              left: "0",
              right: "0",
              top: "0",
              bottom: "0",
            }}
          >
            <GameOverlay OnRestart={resetGame} board={board} />
          </div> */}
        </div>
      </div>
    ),
    intents: [
      <Button value="up">Up</Button>,
      <Button value="left">Left</Button>,
      <Button value="right">Right</Button>,
      <Button value="down">down</Button>,
    ],
  });
});

devtools(app, { serveStatic });

export const GET = handle(app);
export const POST = handle(app);
