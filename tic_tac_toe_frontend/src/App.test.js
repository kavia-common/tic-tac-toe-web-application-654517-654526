import { render, screen } from '@testing-library/react';
import App from './App';

test('renders game component', () => {
  render(<App />);
  expect(screen.getByText(/Select Game Mode/i)).toBeInTheDocument();
});
