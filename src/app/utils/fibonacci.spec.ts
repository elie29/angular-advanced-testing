import { fibonacci } from './fibonacci';

describe('Fibonacci unit test', () => {
  const values = [-1, 0, 2, 5, 5, 7];
  const result = [1, 1, 1, 5, 5, 13];

  it('should return exact value', () => {
    values.forEach((value, key) => {
      const res = fibonacci(value);
      expect(res).toBe(result[key]);
    });
  });
});
