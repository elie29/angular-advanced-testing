import memoize from 'lodash-es/memoize';

export const fibonacci = memoize((num: number): number => {
  if (num <= 2) {
    return 1;
  }
  return fibonacci(num - 1) + fibonacci(num - 2);
});
