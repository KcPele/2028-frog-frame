interface MainStyles {
  [className: string]: React.CSSProperties;
}

const mainStyle: MainStyles = {
  body: {
    alignItems: "center",
    background: "linear-gradient(to right, #432889, #17101F)",
    backgroundSize: "100% 100%",
    display: "flex",
    flexDirection: "column",
    justifyContent: "center",
    textAlign: "center",
    fontFamily: "Clear Sans, sans-serif",
    fontSize: "21px",
  },
  text: {
    order: 2,
    paddingTop: "40px",
    width: "440px",
    fontSize: "32px",
    fontWeight: "bold",
  },
  board: {
    order: 1,
    width: "440px",
    height: "440px",
    padding: "5px",
    backgroundColor: "#57407c",
    borderRadius: "7px",
    outline: "none",
    position: "relative",
  },
  board_cell_tile: {
    userSelect: "none",
    cursor: "default",
  },
  details_box: {
    display: "flex",
    alignItems: "center",
    padding: "10px",
    justifyContent: "space-between",
  },
  resetButton: {
    backgroundColor: "#3d2963",
    color: "rgba(255, 255, 255, 0.5)",
    cursor: "pointer",
    fontSize: "25px",
    padding: "10px 20px",
    borderRadius: "7px",
    transition: "color 0.3s ease, background-color 0.3s ease",
    // hover: {
    //   backgroundColor: "#d3386a",
    //   color: "rgba(255, 255, 255, 1)",
    // },
  },
  score_header: {
    fontSize: "50%",
  },
  score_box: {
    backgroundColor: "#3d2963",
    color: "rgba(255, 255, 255, 0.5)",
    minWidth: "50px",
    width: "70px",
    padding: "5px 15px",
    borderRadius: "7px",
  },
  cell_tile: {
    width: "100px",
    height: "100px",
    margin: "5px",
    display: "flex",
    borderRadius: "7px",
    backgroundColor: "#3d2963",
  },
  tile0: {
    backgroundColor: "#dcb",
  },
  tile2: {
    backgroundColor: "#eee",
    backgroundImage:
      "url('http://res.cloudinary.com/dvx1rye1t/image/upload/v1711146470/2024-game-assets/2.gif')",
  },
  tile4: {
    backgroundColor: "#eec",
    backgroundImage:
      "url('https://res.cloudinary.com/dvx1rye1t/image/upload/v1711146470/2024-game-assets/4.gif')",
  },
  tile8: {
    color: "#ffe",
    backgroundImage:
      "url('https://res.cloudinary.com/dvx1rye1t/image/upload/v1711146468/2024-game-assets/8.gif')",
  },
  tile16: {
    color: "#ffe",
    backgroundImage:
      "url('https://res.cloudinary.com/dvx1rye1t/image/upload/v1711146472/2024-game-assets/16.gif')",
  },
  tile32: {
    color: "#ffe",
    backgroundImage:
      "url('https://res.cloudinary.com/dvx1rye1t/image/upload/v1711146471/2024-game-assets/32.gif')",
  },
  tile64: {
    color: "#ffe",
    backgroundImage:
      "url('https://res.cloudinary.com/dvx1rye1t/image/upload/v1711146470/2024-game-assets/64.gif')",
  },
  tile128: {
    color: "#ffe",
    backgroundImage:
      "url('https://res.cloudinary.com/dvx1rye1t/image/upload/v1711146472/2024-game-assets/128.gif')",
  },
  tile256: {
    color: "#ffe",
    backgroundImage:
      "url('https://res.cloudinary.com/dvx1rye1t/image/upload/v1711146469/2024-game-assets/256.gif')",
  },
  tile512: {
    color: "#ffe",
    backgroundImage:
      "url('https://res.cloudinary.com/dvx1rye1t/image/upload/v1711146469/2024-game-assets/512.gif')",
  },
  tile1024: {
    color: "#fff",
    backgroundImage:
      "url('https://res.cloudinary.com/dvx1rye1t/image/upload/v1711146472/2024-game-assets/1024.gif')",
  },
  tile2048: {
    position: "absolute",
    backgroundSize: "contain",
    left: "0",
    right: "0",
    top: "0",
    bottom: "0",
    padding: "0px",
    color: "#fff",
    backgroundImage: "url(./assets/img/2048.gif)",
  },
  "try-again": {
    zIndex: "10",
    height: "100px",
    width: "100px",
    backgroundImage: "url(./assets/img/try-again.gif)",
  },
  tile: {
    position: "absolute",
  },
  "tile.merged": {
    display: "none",
  },
  "tile.merged.isMoving": {
    display: "inline",
  },
  "tile.new, .overlay": {
    animationDuration: "0.2s",
    animationName: "newTile",
    animationFillMode: "forwards",
    animationDelay: "0.15s",
    transform: "scale(0)",
  },
  // "@keyframes newTile": {
  //   from: {
  //     transform: "scale(0)",
  //   },
  //   to: {
  //     transform: "scale(1)",
  //   },
  // },
  overlay: {
    position: "absolute",
    top: "0px",
    bottom: "0px",
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    justifyContent: "center",
    textAlign: "center",
    left: "0px",
    right: "0px",
    fontSize: "55px",
    fontWeight: "bolder",
    borderRadius: "7px",
    color: "#666",
  },
  tryAgain: {
    backgroundColor: "#876",
    color: "#fff",
    height: "40px",
    width: "200px",
    fontSize: "20px",
    fontWeight: "bold",
    cursor: "pointer",
    border: "none",
    borderRadius: "5px",
    //   border: "2px solid white"
  },
  gameOver: {
    backgroundSize: "contain",
    backgroundImage: "url(./assets/img/game-over.gif)",
    position: "absolute",
    top: "0",
    right: "0",
    bottom: "0",
    left: "0",
    zIndex: "100",
    textAlign: "center",
  },
  "overlay .message": {
    color: "#666",
  },
};

export default mainStyle;
