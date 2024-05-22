import { CSSProperties, useEffect, useState } from "react";
import { Box, Button, Typography } from "@mui/material";
import "./Game.scss";
import { toast } from "react-toastify";
import checkVictory from "./checkVictory";

export type GameState = "playing" | "won" | "lost" | "draw";

export default function Game() {
  const [board, setBoard] = useState<(string | null)[][]>([]);
  const [gameState, setGameState] = useState<GameState>("playing");

  const createBasicBoard = () => {
    const basicBoard: (string | null)[][] = [];
    for (let i = 0; i < 3; i++) {
      const row: (string | null)[] = [];
      for (let j = 0; j < 3; j++) {
        row.push(null);
      }

      basicBoard.push(row);
    }

    return basicBoard;
  };

  useEffect(() => {
    setBoard(createBasicBoard());
  }, []);

  const getPieceColor = (piece: string | null) => {
    if (!piece) return "primary";
    else if (piece === "X") return "success";

    return "error";
  };

  const getRandomUnusedPosition = (
    arr: (null | string)[][]
  ): { x: number; y: number } | null => {
    const nullPositions: { x: number; y: number }[] = [];

    for (let i = 0; i < arr.length; i++) {
      for (let j = 0; j < arr[0].length; j++) {
        if (arr[i][j] === null) {
          nullPositions.push({ x: i, y: j });
        }
      }
    }

    if (nullPositions.length === 0) return null;

    return nullPositions[Math.floor(Math.random() * nullPositions.length)];
  };

  const onPieceClick = (x: number, y: number) => {
    if (gameState !== "playing") return;

    if (board[x][y]) {
      toast.warn("Can't place piece on occupied plot");
      return;
    }

    const boardCopy = [...board];
    boardCopy[x][y] = "X";

    // Enemy's turn
    const positions = getRandomUnusedPosition(boardCopy);

    if (positions) {
      boardCopy[positions.x][positions.y] = "O";
    }

    setBoard(boardCopy);

    setGameState(checkVictory(boardCopy));
  };

  const getEndingTextAndColor = (): {
    text: string;
    color: CSSProperties["color"];
  } => {
    if (gameState === "draw") {
      return {
        text: "Seems like no one won this round... Seems like there are no winners in war...",
        color: "white",
      };
    } else if (gameState === "won") {
      return {
        text: "Seems like you've won this round, congrats!",
        color: "#12c7a9",
      };
    }

    return {
      text: "Looks like you've lost this round. Maybe next time!",
      color: "red",
    };
  };

  return (
    <div>
      <div id="title">
        <Typography variant="h4" fontFamily="Creepshow" textAlign="center">
          Bored mid game?
        </Typography>

        <Typography
          variant="subtitle1"
          fontFamily="Creepshow"
          textAlign="center"
        >
          We've got you covered
        </Typography>
      </div>

      <div id="game" className="game-board">
        {board.map((row, x) => (
          <div key={x}>
            {row.map((piece, y) => (
              <Button
                onClick={() => onPieceClick(x, y)}
                key={y}
                sx={{ borderRadius: "0", fontSize: "1.5rem" }}
                color={getPieceColor(piece)}
                variant="contained"
              >
                {piece ? piece : "-"}
              </Button>
            ))}
          </div>
        ))}
      </div>

      {gameState !== "playing" && (
        <Box sx={{ display: "grid", placeItems: "center", marginTop: "15vh" }}>
          <Typography
            variant="body1"
            fontSize="5vw"
            textAlign="center"
            fontFamily="Creepshow"
            color={getEndingTextAndColor().color}
          >
            {getEndingTextAndColor().text}
          </Typography>

          <Button
            onClick={() => {
              setBoard(createBasicBoard());
              setGameState("playing");
            }}
            variant="contained"
          >
            Play Again
          </Button>
        </Box>
      )}
    </div>
  );
}