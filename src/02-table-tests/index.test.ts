import { simpleCalculator, Action } from './index';

const testCases = [
  { a: 1, b: 2, action: Action.Add, expected: 3 },
  { a: 2, b: 2, action: Action.Add, expected: 4 },
  { a: 3, b: 0, action: Action.Add, expected: 3 },
  { a: 5, b: 1, action: Action.Subtract, expected: 4 },
  { a: 0, b: 1, action: Action.Subtract, expected: -1 },
  { a: 5, b: 0, action: Action.Subtract, expected: 5 },
  { a: 2, b: 2, action: Action.Multiply, expected: 4 },
  { a: 1, b: 2, action: Action.Multiply, expected: 2 },
  { a: 0, b: 2, action: Action.Multiply, expected: 0 },
  { a: 4, b: 2, action: Action.Divide, expected: 2 },
  { a: 4, b: 4, action: Action.Divide, expected: 1 },
  { a: 1, b: 4, action: Action.Divide, expected: 0.25 },
  { a: 2, b: 5, action: Action.Exponentiate, expected: 32 },
  { a: 2, b: 1, action: Action.Exponentiate, expected: 2 },
  { a: 5, b: 5, action: Action.Exponentiate, expected: 3125 },
  { a: undefined, b: '5', action: Action.Add, expected: null },
  { a: 2, b: 5, action: '**', expected: null },
  { a: 0, b: 2, action: Action.Divide, expected: 0 },
];

describe('simpleCalculator', () => {
  test.each(testCases)(
    'should return $expected for $input',
    ({ a, b, action, expected }) => {
      expect(simpleCalculator({ a, b, action })).toBe(expected);
    },
  );
});
