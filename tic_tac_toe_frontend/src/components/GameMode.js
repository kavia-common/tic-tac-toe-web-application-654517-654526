import React from 'react';
import '../styles/GameMode.css';

const GameMode = ({ onSelectMode }) => {
  return (
    <div className="game-mode">
      <h2>Select Game Mode</h2>
      <button onClick={() => onSelectMode('single')}>vs Computer</button>
      <button onClick={() => onSelectMode('two-player')}>Two Players</button>
    </div>
  );
};

export default GameMode;
