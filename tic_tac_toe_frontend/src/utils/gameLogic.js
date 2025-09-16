export const calculateWinner = (squares) => {
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
};

export const getAIMove = (squares) => {
  // Simple AI: Look for first empty square
  const emptySquares = squares
    .map((square, index) => square ? null : index)
    .filter(index => index !== null);
  
  if (emptySquares.length === 0) return null;
  
  // Try to win or block opponent from winning
  const aiMark = 'O';
  const playerMark = 'X';
  
  // Check for winning move
  for (let i = 0; i < squares.length; i++) {
    if (!squares[i]) {
      squares[i] = aiMark;
      if (calculateWinner(squares)) {
        squares[i] = null;
        return i;
      }
      squares[i] = null;
    }
  }
  
  // Check for blocking move
  for (let i = 0; i < squares.length; i++) {
    if (!squares[i]) {
      squares[i] = playerMark;
      if (calculateWinner(squares)) {
        squares[i] = null;
        return i;
      }
      squares[i] = null;
    }
  }
  
  // Take center if available
  if (!squares[4]) return 4;
  
  // Take random available corner
  const corners = [0, 2, 6, 8].filter(i => !squares[i]);
  if (corners.length > 0) {
    return corners[Math.floor(Math.random() * corners.length)];
  }
  
  // Take random available side
  const sides = [1, 3, 5, 7].filter(i => !squares[i]);
  if (sides.length > 0) {
    return sides[Math.floor(Math.random() * sides.length)];
  }
  
  return emptySquares[Math.floor(Math.random() * emptySquares.length)];
};
