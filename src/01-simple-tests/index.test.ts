import { simpleCalculator, Action } from './index';

describe('simpleCalculator tests', () => {
  test('should add two numbers', () => {
    const expectResult = simpleCalculator({ a: 1, b: 1, action: Action.Add });
    expect(expectResult).toBe(2);
  });

  test('should subtract two numbers', () => {
    const expectResult = simpleCalculator({
      a: 5,
      b: 1,
      action: Action.Subtract,
    });
    expect(expectResult).toBe(4);
  });

  test('should multiply two numbers', () => {
    const expectResult = simpleCalculator({
      a: 2,
      b: 2,
      action: Action.Multiply,
    });
    expect(expectResult).toBe(4);
  });

  test('should divide two numbers', () => {
    const expectResult = simpleCalculator({
      a: 4,
      b: 2,
      action: Action.Divide,
    });
    expect(expectResult).toBe(2);
  });

  test('should exponentiate two numbers', () => {
    const expectResult = simpleCalculator({
      a: 2,
      b: 5,
      action: Action.Exponentiate,
    });
    expect(expectResult).toBe(32);
  });

  test('should return null for invalid action', () => {
    const expectResult = simpleCalculator({
      a: 2,
      b: 5,
      action: '**',
    });
    expect(expectResult).toBe(null);
  });

  test('should return null for invalid arguments', () => {
    const expectResult = simpleCalculator({
      a: undefined,
      b: '5',
      action: Action.Add,
    });
    expect(expectResult).toBe(null);
  });
});
