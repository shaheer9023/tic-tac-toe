

---

# Tic Tac Toe Game



## Project Setup

### 1. Next.js Project Create Karna

Pehle yeh command chalaiye taake ek naya Next.js project ban sake:

```bash
npx create-next-app@latest tic-tac-toe
cd tic-tac-toe
```

### 2. Tailwind CSS Install Karna

Tailwind CSS aur uske dependencies install karne ke liye yeh command chalaiye:

```bash
npm install -D tailwindcss postcss autoprefixer
```

Phir Tailwind CSS configuration files generate karne ke liye:

```bash
npx tailwindcss init -p
```

### 3. Tailwind CSS Ko Configure Karna

`tailwind.config.js` file ko update karke apne content files include karein:

```js
/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {},
  },
  plugins: [],
}
```

Phir `globals.css` file mein Tailwind directives add karein:

```css
@tailwind base;
@tailwind components;
@tailwind utilities;
```

## Components

### 1. Square Component

**File**: `src/app/components/Square.tsx`

Yeh component Tic Tac Toe board ke ek single square ko represent karta hai.

**Key Details**:
- **Props**: 
  - `value`: Square ki value ko represent karta hai, jo 'X', 'O', ya null ho sakti hai.
  - `onClick`: Jab square pe click hota hai toh yeh function call hota hai.
- **Styles**:
  - Conditional styling ke zariye background, text, aur border colors set hotay hain.
  - Hover effects ke saath shadow aur scaling ka use karke 3D appearance diya gaya hai.

**Example Code**:
```tsx
import React from 'react';

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

export default Square;
```

### 2. Board Component

**File**: `src/app/components/Board.tsx`

Yeh component poore game board ko manage karta hai aur squares ko render karta hai.

**Key Details**:
- **State**:
  - `squares`: Ek array jo har square ki state ko track karta hai.
  - `xIsNext`: Ek boolean jo batata hai ke ab kiska turn hai.
- **Functions**:
  - `handleClick(index)`: Board ko update karta hai aur turn switch karta hai.
  - `handleReset()`: Game state ko reset karta hai.
  - `renderSquare(index)`: Individual squares ko render karta hai.
- **Auto-reset**: Game automatically reset ho jata hai jab koi jeet jaye ya draw ho jaye.

**Example Code**:
```tsx
import React, { useState } from 'react';
import Square from './Square';

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

export default Board;
```

### 3. Main Page Component

**File**: `src/app/page.tsx`

Yeh component main page ko render karta hai, jisme game board aur heading shamil hain.

**Key Details**:
- **Layout**: Flexbox ka use karke content ko center mein rakhne ke liye.
- **Heading**: "Tic Tac Toe Game" display karta hai Proza Libre font aur purple color ke saath.
- **Footer**: Heading ke neeche "Made by Shaheer Ahmad" display karta hai.
- **Game Board**: `Board` component ko page ke center mein render karta hai.
- **Styles**: Background gradient jo purple shades ka use karta hai.

**Example Code**:
```tsx
"use client";

import React from 'react';
import Board from './components/Board';

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
```

### 4. Additional Configurations

**File**: `src/pages/_app.tsx`

- **Purpose**: Global CSS import karna taake Tailwind CSS styles sabhi pages pe apply ho sakein.

**Example Code**:
```tsx
import '../styles/globals.css';

function MyApp({ Component, pageProps }: any) {
  return <Component {...pageProps} />;
}

export default MyApp;
```

## How to Run

1. **Development Server Start Karna**

   Yeh command chalaiye taake development server start ho jaye:

   ```bash
   npm run dev
   ```

2. **Browser Mein Dekhna**

   `http://localhost:3000` pe jaake Tic Tac Toe game ko apne browser mein dekhein.

## Summary

- **Setup**: Next.js project banaya aur Tailwind CSS configure kiya.

