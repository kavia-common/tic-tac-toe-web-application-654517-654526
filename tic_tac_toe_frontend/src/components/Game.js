import React, { useState, useEffect } from 'react';
import Board from './Board';
import GameMode from './GameMode';
import { calculateWinner, getAIMove } from '../utils/gameLogic';
import '../styles/Game.css';

const Game = () => {
  const [gameMode, setGameMode] = useState(null);
  const [squares, setSquares] = useState(Array(9).fill(null));
  const [xIsNext, setXIsNext] = useState(true);
  const [gameOver, setGameOver] = useState(false);

  const winner = calculateWinner(squares);
  const isBoardFull = squares.every(square => square !== null);

  useEffect(() => {
    if (!gameOver && gameMode === 'single' && !xIsNext) {
      const aiMove = getAIMove([...squares]);
      if (aiMove !== null) {
        setTimeout(() => {
          handleClick(aiMove);
        }, 500);
      }
    }
  }, [xIsNext, gameMode]);

  const handleClick = (i) => {
    if (calculateWinner(squares) || squares[i] || gameOver) {
      return;
    }

    const newSquares = squares.slice();
    newSquares[i] = xIsNext ? 'X' : 'O';
    setSquares(newSquares);
    setXIsNext(!xIsNext);

    if (calculateWinner(newSquares) || newSquares.every(s => s)) {
      setGameOver(true);
    }
  };

  const resetGame = () => {
    setSquares(Array(9).fill(null));
    setXIsNext(true);
    setGameOver(false);
  };

  const handleModeSelect = (mode) => {
    setGameMode(mode);
    resetGame();
  };

  const getStatus = () => {
    if (winner) {
      return `Winner: ${winner}`;
    } else if (isBoardFull) {
      return "Game Draw!";
    } else {
      return `Next player: ${xIsNext ? 'X' : 'O'}`;
    }
  };

  if (!gameMode) {
    return <GameMode onSelectMode={handleModeSelect} />;
  }

  return (
    <div className="game">
      <h1>Tic Tac Toe</h1>
      <div className="game-info">
        <p>{getStatus()}</p>
      </div>
      <Board squares={squares} onClick={handleClick} />
      <div className="game-controls">
        <button onClick={resetGame}>New Game</button>
        <button onClick={() => setGameMode(null)}>Change Mode</button>
      </div>
    </div>
  );
};

export default Game;
