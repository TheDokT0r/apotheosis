import { GameState } from "./Game";

export default function checkVictory(board: (string | null)[][]): GameState {
  const winningCombinations = [
    // Horizontal combinations
    [
      { x: 0, y: 0 },
      { x: 0, y: 1 },
      { x: 0, y: 2 },
    ],
    [
      { x: 1, y: 0 },
      { x: 1, y: 1 },
      { x: 1, y: 2 },
    ],
    [
      { x: 2, y: 0 },
      { x: 2, y: 1 },
      { x: 2, y: 2 },
    ],
    // Vertical combinations
    [
      { x: 0, y: 0 },
      { x: 1, y: 0 },
      { x: 2, y: 0 },
    ],
    [
      { x: 0, y: 1 },
      { x: 1, y: 1 },
      { x: 2, y: 1 },
    ],
    [
      { x: 0, y: 2 },
      { x: 1, y: 2 },
      { x: 2, y: 2 },
    ],
    // Diagonal combinations
    [
      { x: 0, y: 0 },
      { x: 1, y: 1 },
      { x: 2, y: 2 },
    ],
    [
      { x: 0, y: 2 },
      { x: 1, y: 1 },
      { x: 2, y: 0 },
    ],
  ];

  for (const combination of winningCombinations) {
    const [a, b, c] = combination;
    if (
      board[a.x][a.y] &&
      board[a.x][a.y] === board[b.x][b.y] &&
      board[a.x][a.y] === board[c.x][c.y]
    ) {
      return board[a.x][a.y] === "X" ? "won" : "lost";
    }
  }

  // Check for draw
  if (board.every((row) => row.every((cell) => cell !== null))) {
    return "draw";
  }

  return "playing";
}
