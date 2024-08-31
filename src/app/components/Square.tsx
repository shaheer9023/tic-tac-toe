"use client";

type SquareProps = {
  value: 'X' | 'O' | null;
  onClick: () => void;
};

const Square: React.FC<SquareProps> = ({ value, onClick }) => (
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

export default Square;
