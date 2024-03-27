/** @jsxImportSource frog/jsx */

import { Board, Tile } from "@/helper";
import { Button, Frog, TextInput } from "frog";
import { devtools } from "frog/dev";
// import { neynar } from 'frog/hubs'
import { handle } from "frog/next";
import { serveStatic } from "frog/serve-static";
import mainStyle from "@/app/mainStyle";
import { subStyle } from "@/app/style";
import { neynar } from "frog/hubs";
export type State = {
  board: Board;
  newGame: boolean;
  score: number;
  attempts: number;
};
const NEYNAR_API_KEY = process.env.NEXT_PUBLIC_NEYNAR_API_KEY || "";
const app = new Frog<{ State: State }>({
  assetsPath: "/",
  basePath: "/api",
  // Supply a Hub to enable frame verification.
  hub: neynar({ apiKey: NEYNAR_API_KEY }),
  initialState: {
    newGame: false,
    score: 0,
    attempts: 0,
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
          Welcome and Guess a Number
        </h2>
        <div
          style={{
            maxWidth: "500px",
            display: "flex",
          }}
        >
          <p
            style={{
              fontSize: "30px",
              color: "white",
            }}
          >
            How to play, click on the number you think is on the board or type
            the number in the input field and click enter. if the number you
            guess is what is to be shwon on the board, you get a point(score
            increase).
          </p>
        </div>
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

app.frame("/game", (c) => {
  const { buttonValue, deriveState, inputText, status } = c;
  let board = new Board();
  let nonZeroTiles = board.tiles.filter((tile) => tile.value !== 0);
  const state = deriveState((prevState) => {
    function checkGuess(guess: number) {
      if (nonZeroTiles.map((tile) => tile.value).includes(guess)) {
        return (prevState.score += 1);
      }
    }
    if (buttonValue) {
      checkGuess(Number(buttonValue));
      prevState.attempts += 1;
    }
    if (Number(inputText)) {
      checkGuess(Number(inputText));
      prevState.attempts += 1;
    }
  });

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
  const tiles = nonZeroTiles.map((tile, index) => {
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
        <div
          style={{
            display: "flex",

            width: "440px",
            justifyContent: "space-between",
          }}
        >
          <p
            style={{
              fontSize: "40px",
              color: "white",
            }}
          >
            Guess: {state.attempts}
          </p>
          <p
            style={{
              fontSize: "40px",
              color: "white",
            }}
          >
            Score: {state.score}
          </p>
        </div>
        <div
          style={{
            order: 1,
            width: "450px",
            height: "450px",
            display: "flex",
            flexWrap: "wrap",
            backgroundColor: "#57407c",
            borderRadius: "7px",
            paddingTop: "6px",
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
        </div>
      </div>
    ),
    intents: [
      <TextInput placeholder="Enter 32 or 64 or 256 or 512" />,
      <Button value="">Enter</Button>,
      <Button value="4">4</Button>,
      <Button value="8">8</Button>,
      <Button value="16">16</Button>,
      ,
    ],
  });
});

devtools(app, { serveStatic });

export const GET = handle(app);
export const POST = handle(app);
