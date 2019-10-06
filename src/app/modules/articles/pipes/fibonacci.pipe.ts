import { Pipe, PipeTransform } from '@angular/core';
import { fibonacci } from 'src/app/utils/fibonacci';

@Pipe({
  name: 'fibonacci'
})
export class FibonacciPipe implements PipeTransform {
  transform(value: number): number {
    return fibonacci(value);
  }
}
