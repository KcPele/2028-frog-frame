/** @jsxImportSource frog/jsx */

import { Board } from "@/helper";
import { Button, Frog, TextInput } from "frog";
import { devtools } from "frog/dev";
// import { neynar } from 'frog/hubs'
import { handle } from "frog/next";
import { serveStatic } from "frog/serve-static";
const app = new Frog({
  assetsPath: "/",
  basePath: "/api",
  // Supply a Hub to enable frame verification.
  // hub: neynar({ apiKey: 'NEYNAR_FROG_FM' })
});

// Uncomment to use Edge Runtime
// export const runtime = "edge";
const Cell = () => {
  return (
    <span
      style={{
        width: "100px",
        height: "100px",
        margin: "5px",

        fontWeight: "bold",

        borderRadius: "7px",
        backgroundColor: "#3d2963",
      }}
    ></span>
  );
};

app.frame("/", (c) => {
  const board = new Board();
  const cells = board.cells.map((row, rowIndex) => {
    return (
      <div
        key={rowIndex}
        style={{
          width: "440px",
          backgroundColor: "#57407c",
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
        {cells}
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

app.frame("/game", (c) => {
  return c.res({
    image: (
      <div>
        <h2>Start came</h2>
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
