import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';
import { distinctUntilChanged, pluck } from 'rxjs/operators';

import { DEFAULT_STATE, State } from './state';

@Injectable({
  providedIn: 'root',
})
export class Store {
  private store = new BehaviorSubject<State>(DEFAULT_STATE);

  // Get the current state: should be used for read-only purpose
  get value(): State {
    return this.store.value;
  }

  // Watch for a value change in the store
  select<T>(name: string): Observable<T> {
    return this.store.pipe(
      pluck(name),
      distinctUntilChanged<T>()
    );
  }

  // Set a value in the store
  set<T>(name: string, value: T): void {
    // Immutable state change: shallow copy of the state not values
    this.store.next({ ...this.value, [name]: value });
  }

  // Get a value from the current state: should be used for read-only purpose
  get<T>(name: string): T {
    return this.value[name];
  }

  // reset the whole store
  reset(): void {
    this.store.next(DEFAULT_STATE);
  }
}
