// src/app/page.tsx
"use client";

import React, { useState } from 'react';

// Square component
const Square: React.FC<{ value: 'X' | 'O' | null; onClick: () => void }> = ({ value, onClick }) => (
  <button
    onClick={onClick}
    className={`w-24 h-24 flex items-center justify-center text-4xl font-bold
                border-4 rounded-lg transition-transform transform 
                ${value === 'X' ? 'bg-yellow-300 text-yellow-800 border-yellow-500' : 
                  value === 'O' ? 'bg-lime-300 text-lime-800 border-lime-500' : 
                  'bg-gray-200 text-gray-800 border-gray-500'} 
                shadow-lg hover:shadow-xl hover:scale-105`}
  >
    {value}
  </button>
);

// Board component
const Board: React.FC = () => {
  const [squares, setSquares] = useState<Array<'X' | 'O' | null>>(Array(9).fill(null));
  const [xIsNext, setXIsNext] = useState(true);

  const handleClick = (index: number) => {
    const newSquares = squares.slice();
    if (calculateWinner(newSquares) || newSquares[index]) return;
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
  const isDraw = squares.every(square => square !== null);
  let status;
  if (winner) {
    status = 'Winner: ' + winner;
  } else if (isDraw) {
    status = 'Draw!';
  } else {
    status = 'Next player: ' + (xIsNext ? 'X' : 'O');
  }

  // Automatically reset game if there's a winner or a draw
  if (winner || isDraw) {
    setTimeout(() => handleReset(), 3000); // Reset after 3 seconds
  }

  return (
    <div className="flex flex-col items-center bg-purple-100 p-6 rounded-lg border-8 border-purple-700 shadow-2xl">
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
        className="px-6 py-3 bg-gradient-to-r from-purple-700 to-purple-900 text-white rounded-lg shadow-lg transform transition-transform duration-200 hover:scale-105"
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

const HomePage: React.FC = () => {
  return (
    <div className="flex flex-col min-h-screen bg-gradient-to-br from-purple-800 to-purple-600 p-6">
      <h1 className="text-4xl font-bold mb-2 text-purple-100 text-center font-proza">Tic Tac Toe Game</h1>
      <div className="text-2xl font-semibold text-center mb-8 text-gray-800">Made by <strong>Shaheer Ahmad</strong></div>
      <div className="flex-grow flex items-center justify-center">
        <Board />
      </div>
    </div>
  );
}

export default HomePage;
