import { generateLinkedList } from './index';

describe('generateLinkedList', () => {
  test('should generate linked list from values 1', () => {
    const expectValue = {
      value: 1,
      next: {
        value: null,
        next: null,
      },
    };

    expect(generateLinkedList([1])).toStrictEqual(expectValue);
  });

  test('should generate linked list from values 2', () => {
    const list = generateLinkedList([1, 2]);
    expect(list).toMatchSnapshot();
  });
});
