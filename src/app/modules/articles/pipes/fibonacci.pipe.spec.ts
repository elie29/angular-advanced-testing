import { FibonacciPipe } from './fibonacci.pipe';

describe('FibonacciPipe unit test', () => {
  let pipe: FibonacciPipe;

  const values = [-1, 0, 2, 5, 5, 7];
  const result = [1, 1, 1, 5, 5, 13];

  beforeEach(() => {
    pipe = new FibonacciPipe();
  });

  it('should create an instance', () => {
    expect(pipe).toBeTruthy();
  });

  it('should return exact value', () => {
    values.forEach((value, key) => {
      const res = pipe.transform(value);
      expect(res).toBe(result[key]);
    });
  });
});
