// src/app/page.tsx
"use client";

import React, { useState } from 'react';

// Square component
const Square: React.FC<{ value: 'X' | 'O' | null; onClick: () => void }> = ({ value, onClick }) => (
  <button
    onClick={onClick}
    className={`w-24 h-24 bg-gray-300 text-gray-800 text-4xl font-bold flex items-center justify-center
                border-4 border-blue-500 rounded-lg shadow-md hover:bg-gray-200 transition-colors duration-200
                ${value === 'X' ? 'bg-blue-100' : value === 'O' ? 'bg-green-100' : 'bg-gray-300'} 
                ${value ? 'cursor-not-allowed' : 'cursor-pointer'}`}
  >
    {value}
  </button>
);

// Board component
const Board: React.FC = () => {
  const [squares, setSquares] = useState(Array(9).fill(null));
  const [xIsNext, setXIsNext] = useState(true);

  const handleClick = (index: number) => {
    const newSquares = squares.slice();
    if (calculateWinner(squares) || newSquares[index]) return;
    newSquares[index] = xIsNext ? 'X' : 'O';
    setSquares(newSquares);
    setXIsNext(!xIsNext);
  };

  const handleReset = () => {
    setSquares(Array(9).fill(null));
    setXIsNext(true);
  };

  const renderSquare = (index: number) => (
    <Square
      value={squares[index]}
      onClick={() => handleClick(index)}
    />
  );

  const winner = calculateWinner(squares);
  let status;
  if (winner) {
    status = 'Winner: ' + winner;
  } else {
    status = 'Next player: ' + (xIsNext ? 'X' : 'O');
  }

  return (
    <div className="flex flex-col items-center bg-white p-6 rounded-lg shadow-2xl border-8 border-blue-900">
      <div className="status text-2xl font-bold mb-6 text-gray-800">{status}</div>
      <div className="grid grid-cols-3 gap-2 mb-6">
        {renderSquare(0)}
        {renderSquare(1)}
        {renderSquare(2)}
        {renderSquare(3)}
        {renderSquare(4)}
        {renderSquare(5)}
        {renderSquare(6)}
        {renderSquare(7)}
        {renderSquare(8)}
      </div>
      <button
        onClick={handleReset}
        className="px-6 py-3 bg-gradient-to-r from-green-500 to-blue-500 text-white rounded-lg shadow-lg transform transition-transform duration-200 hover:scale-105 hover:shadow-xl"
      >
        Reset Game
      </button>
    </div>
  );
};

// Winner calculation function
function calculateWinner(squares: Array<'X' | 'O' | null>) {
  const lines = [
    [0, 1, 2],
    [3, 4, 5],
    [6, 7, 8],
    [0, 3, 6],
    [1, 4, 7],
    [2, 5, 8],
    [0, 4, 8],
    [2, 4, 6],
  ];
  for (let i = 0; i < lines.length; i++) {
    const [a, b, c] = lines[i];
    if (squares[a] && squares[a] === squares[b] && squares[a] === squares[c]) {
      return squares[a];
    }
  }
  return null;
}

export default function HomePage() {
  return (
    <div className="flex items-center justify-center h-screen bg-green-400">
      <Board />
    </div>
  );
}
