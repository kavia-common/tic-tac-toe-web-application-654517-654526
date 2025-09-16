import { render, fireEvent, screen, act } from '@testing-library/react';
import Game from './Game';

jest.useFakeTimers();

describe('Game Component', () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  test('renders game mode selection initially', () => {
    render(<Game />);
    expect(screen.getByText(/Select Game Mode/i)).toBeInTheDocument();
  });

  test('starts new game when mode is selected', () => {
    render(<Game />);
    fireEvent.click(screen.getByText(/Two Players/i));
    expect(screen.getByText(/Tic Tac Toe/i)).toBeInTheDocument();
    expect(screen.getByText(/Next player: X/i)).toBeInTheDocument();
  });

  test('allows players to make moves', () => {
    render(<Game />);
    fireEvent.click(screen.getByText(/Two Players/i));
    const squares = screen.getAllByRole('button').filter(button => button.className.includes('square'));
    fireEvent.click(squares[0]);
    expect(squares[0]).toHaveTextContent('X');
    expect(screen.getByText(/Next player: O/i)).toBeInTheDocument();
  });

  test('declares winner when game is won', () => {
    render(<Game />);
    fireEvent.click(screen.getByText(/Two Players/i));
    const squares = screen.getAllByRole('button').filter(button => button.className.includes('square'));
    
    // X wins with top row
    fireEvent.click(squares[0]); // X -> top left
    fireEvent.click(squares[3]); // O -> middle left
    fireEvent.click(squares[1]); // X -> top middle
    fireEvent.click(squares[4]); // O -> center
    fireEvent.click(squares[2]); // X -> top right
    
    expect(screen.getByText(/Winner: X/i)).toBeInTheDocument();
  });

  test('declares draw when no winner', () => {
    render(<Game />);
    fireEvent.click(screen.getByText(/Two Players/i));
    const squares = screen.getAllByRole('button').filter(button => button.className.includes('square'));
    
    // Fill board without winner
    const moves = [0, 1, 2, 4, 3, 6, 5, 8, 7];
    moves.forEach(index => {
      fireEvent.click(squares[index]);
    });
    
    expect(screen.getByText(/Game Draw!/i)).toBeInTheDocument();
  });

  test('makes AI move in single player mode', () => {
    render(<Game />);
    fireEvent.click(screen.getByText(/vs Computer/i));
    const squares = screen.getAllByRole('button').filter(button => button.className.includes('square'));
    
    fireEvent.click(squares[0]); // Player X moves
    act(() => {
      jest.advanceTimersByTime(500);
    });
    
    // Verify AI made a move
    const filledSquares = squares.filter(square => square.textContent !== '');
    expect(filledSquares).toHaveLength(2);
  });

  test('resets game when New Game button is clicked', () => {
    render(<Game />);
    fireEvent.click(screen.getByText(/Two Players/i));
    const squares = screen.getAllByRole('button').filter(button => button.className.includes('square'));
    
    fireEvent.click(squares[0]);
    fireEvent.click(screen.getByText(/New Game/i));
    
    squares.forEach(square => {
      expect(square).toHaveTextContent('');
    });
    expect(screen.getByText(/Next player: X/i)).toBeInTheDocument();
  });

  test('allows changing game mode', () => {
    render(<Game />);
    fireEvent.click(screen.getByText(/Two Players/i));
    fireEvent.click(screen.getByText(/Change Mode/i));
    expect(screen.getByText(/Select Game Mode/i)).toBeInTheDocument();
  });
});
