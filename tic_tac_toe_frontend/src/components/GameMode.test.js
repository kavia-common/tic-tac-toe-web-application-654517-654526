import { render, fireEvent, screen } from '@testing-library/react';
import GameMode from './GameMode';

describe('GameMode Component', () => {
  test('renders mode selection buttons', () => {
    render(<GameMode onSelectMode={() => {}} />);
    expect(screen.getByText(/vs Computer/i)).toBeInTheDocument();
    expect(screen.getByText(/Two Players/i)).toBeInTheDocument();
  });

  test('calls onSelectMode with "single" when vs Computer is clicked', () => {
    const mockOnSelectMode = jest.fn();
    render(<GameMode onSelectMode={mockOnSelectMode} />);
    fireEvent.click(screen.getByText(/vs Computer/i));
    expect(mockOnSelectMode).toHaveBeenCalledWith('single');
  });

  test('calls onSelectMode with "two-player" when Two Players is clicked', () => {
    const mockOnSelectMode = jest.fn();
    render(<GameMode onSelectMode={mockOnSelectMode} />);
    fireEvent.click(screen.getByText(/Two Players/i));
    expect(mockOnSelectMode).toHaveBeenCalledWith('two-player');
  });
});
