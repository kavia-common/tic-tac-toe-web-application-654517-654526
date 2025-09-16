import { calculateWinner, getAIMove } from './gameLogic';

describe('calculateWinner', () => {
  test('returns null when no winner', () => {
    const squares = [null, null, null, null, null, null, null, null, null];
    expect(calculateWinner(squares)).toBeNull();
  });

  test('detects horizontal win', () => {
    const squares = ['X', 'X', 'X', null, 'O', 'O', null, null, null];
    expect(calculateWinner(squares)).toBe('X');
  });

  test('detects vertical win', () => {
    const squares = ['O', null, 'X', 'O', null, 'X', 'O', 'X', null];
    expect(calculateWinner(squares)).toBe('O');
  });

  test('detects diagonal win', () => {
    const squares = ['X', 'O', 'O', null, 'X', null, null, null, 'X'];
    expect(calculateWinner(squares)).toBe('X');
  });
});

describe('getAIMove', () => {
  test('returns null for full board', () => {
    const squares = ['X', 'O', 'X', 'O', 'X', 'O', 'X', 'O', 'X'];
    expect(getAIMove(squares)).toBeNull();
  });

  test('takes winning move when available', () => {
    const squares = ['O', 'O', null, 'X', 'X', null, null, null, null];
    expect(getAIMove(squares)).toBe(2); // Completes O's winning row
  });

  test('blocks opponent winning move', () => {
    const squares = ['X', 'X', null, 'O', null, null, null, null, null];
    expect(getAIMove(squares)).toBe(2); // Blocks X's winning row
  });

  test('takes center if available', () => {
    const squares = ['X', null, null, null, null, null, null, null, null];
    expect(getAIMove(squares)).toBe(4); // Takes center
  });

  test('takes a corner if center is taken', () => {
    const squares = [null, null, null, null, 'X', null, null, null, null];
    const move = getAIMove(squares);
    expect([0, 2, 6, 8]).toContain(move); // Takes a corner
  });

  test('takes any available move if no strategic moves available', () => {
    const squares = ['X', 'O', 'X', 'O', 'X', 'O', 'X', null, 'O'];
    expect(getAIMove(squares)).toBe(7); // Only available square
  });
});
