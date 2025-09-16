import { render, fireEvent, screen } from '@testing-library/react';
import Square from './Square';

describe('Square Component', () => {
  test('renders with correct value', () => {
    render(<Square value="X" onClick={() => {}} />);
    expect(screen.getByRole('button')).toHaveTextContent('X');
  });

  test('calls onClick when clicked', () => {
    const mockOnClick = jest.fn();
    render(<Square value={null} onClick={mockOnClick} />);
    fireEvent.click(screen.getByRole('button'));
    expect(mockOnClick).toHaveBeenCalledTimes(1);
  });

  test('has filled class when value is present', () => {
    render(<Square value="O" onClick={() => {}} />);
    expect(screen.getByRole('button')).toHaveClass('filled');
  });

  test('does not have filled class when value is null', () => {
    render(<Square value={null} onClick={() => {}} />);
    expect(screen.getByRole('button')).not.toHaveClass('filled');
  });
});
