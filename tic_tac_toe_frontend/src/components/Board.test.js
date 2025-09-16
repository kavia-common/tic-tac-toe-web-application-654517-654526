import { render, fireEvent, screen } from '@testing-library/react';
import Board from './Board';

describe('Board Component', () => {
  const mockSquares = Array(9).fill(null);
  const mockOnClick = jest.fn();

  beforeEach(() => {
    mockOnClick.mockClear();
  });

  test('renders 9 squares', () => {
    render(<Board squares={mockSquares} onClick={mockOnClick} />);
    const squares = screen.getAllByRole('button');
    expect(squares).toHaveLength(9);
  });

  test('renders squares with correct values', () => {
    const squares = ['X', 'O', null, 'X', null, 'O', null, null, 'X'];
    render(<Board squares={squares} onClick={mockOnClick} />);
    const buttons = screen.getAllByRole('button');
    expect(buttons[0]).toHaveTextContent('X');
    expect(buttons[1]).toHaveTextContent('O');
    expect(buttons[2]).toHaveTextContent('');
  });

  test('calls onClick with correct index when square is clicked', () => {
    render(<Board squares={mockSquares} onClick={mockOnClick} />);
    const squares = screen.getAllByRole('button');
    fireEvent.click(squares[4]); // Click middle square
    expect(mockOnClick).toHaveBeenCalledWith(4);
  });
});
