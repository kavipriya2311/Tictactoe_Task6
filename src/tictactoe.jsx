import { useState } from "react";

const WINNING_LINES = [
  [0, 1, 2],
  [3, 4, 5],
  [6, 7, 8],
  [0, 3, 6],
  [1, 4, 7],
  [2, 5, 8],
  [0, 4, 8],
  [2, 4, 6],
];

function calculateWinner(squares) {
  for (const [a, b, c] of WINNING_LINES) {
    if (squares[a] && squares[a] === squares[b] && squares[a] === squares[c]) {
      return squares[a];
    }
  }
  return null;
}

export default function TicTacToe() {
  const [board, setBoard] = useState(Array(9).fill(null));
  const [xIsNext, setXIsNext] = useState(true);

  const winner = calculateWinner(board);
  const isDraw = !winner && board.every((square) => square !== null);

  let status;
  if (winner) status = `Winner: ${winner}`;
  else if (isDraw) status = "It's a draw";
  else status = `Next player: ${xIsNext ? "X" : "O"}`;

  function handleClick(index) {
    if (board[index] || winner) return;

    const nextBoard = [...board];
    nextBoard[index] = xIsNext ? "X" : "O";

    setBoard(nextBoard);
    setXIsNext(!xIsNext);
  }

  function handleRestart() {
    setBoard(Array(9).fill(null));
    setXIsNext(true);
  }

  return (
    <div style={styles.page}>
      <h1 style={styles.title}>Tic-Tac-Toe</h1>
      <p style={styles.status}>{status}</p>

      <div style={styles.board}>
        {board.map((value, index) => (
          <button
            key={index}
            style={{
              ...styles.square,
              color: value === "X" ? "#2563eb" : "#e11d48",
            }}
            onClick={() => handleClick(index)}
          >
            {value}
          </button>
        ))}
      </div>

      <button style={styles.restart} onClick={handleRestart}>
        Restart game
      </button>
    </div>
  );
}

const styles = {
  page: {
    minHeight: "100vh",
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    justifyContent: "center",
    gap: 16,
    fontFamily: "system-ui, sans-serif",
    background: "#01070c",
  },
  title: { margin: 0, color: "#0f172a" },
  status: { margin: 0, fontSize: 20, fontWeight: 600, color: "#334155" },
  board: {
    display: "grid",
    gridTemplateColumns: "repeat(3, 90px)",
    gridTemplateRows: "repeat(3, 90px)",
    gap: 8,
  },
  square: {
    fontSize: 40,
    fontWeight: 700,
    background: "#fff",
    border: "2px solid #cbd5e1",
    borderRadius: 8,
    cursor: "pointer",
  },
  restart: {
    padding: "10px 20px",
    fontSize: 16,
    fontWeight: 600,
    color: "#fff",
    background: "#0f172a",
    border: "none",
    borderRadius: 8,
    cursor: "pointer",
  },
};